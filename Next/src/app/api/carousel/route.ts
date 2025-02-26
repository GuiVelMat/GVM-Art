import getCarousel from "@/actions/getCarousel"
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../exceptions";
import path from "path";
import { writeFile } from "fs/promises"

export const GET = async () => {
    const carousel = await getCarousel();
    console.log(carousel);

    return NextResponse.json(carousel);
}

export const POST = async (request: NextRequest) => {
    try {
        const formData = await request.formData()

        // Extraer los datos del FormData
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const href = formData.get("href") as string
        const status = formData.get("status") as string
        const slide_number = Number.parseInt(formData.get("slide_number") as string)
        const slug = formData.get("slug") as string

        // Obtener el archivo
        const file = formData.get("image") as File | null
        let imagePath = null

        if (file) {
            // Crear un nombre único para el archivo
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            // Asegurarse de que el nombre del archivo sea seguro y único
            const extension = file.name.split(".").pop()
            const baseName = file.name.split(".")[0].replace(/[^a-zA-Z0-9]/g, "")
            const filename = `${baseName}.${extension}`

            // Definir la ruta donde se guardará el archivo
            const publicPath = path.join(process.cwd(), "public", "assets", "carousel")
            const filePath = path.join(publicPath, filename)

            // Guardar el archivo
            await writeFile(filePath, buffer)

            // Guardar la ruta relativa para la base de datos
            imagePath = filename
        }

        // Crear el carousel con todos los datos
        const carousel = await prisma.carousel.create({
            data: {
                title,
                slug,
                image: imagePath,
                href,
                description,
                status,
                slide_number,
            },
        })

        return NextResponse.json(carousel)
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: "Failed to create carousel slide" }, { status: 500 })
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        const body = await req.json()

        // Actualizar todas las slides en una transacción
        const carousel = await prisma.$transaction(
            body.map((slide: { id: number; slide_number: number }) =>
                prisma.carousel.update({
                    where: { id: slide.id },
                    data: { slide_number: slide.slide_number },
                }),
            ),
        )

        console.log(carousel);

        revalidatePath("/")

        return ApiResponse.ok('Slides order updated')
    } catch (error) {
        console.error("Error updating slides order:", error)
        return ApiResponse.badRequest('Failed to update slides order')
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json()

        const carousel = await prisma.carousel.delete({
            where: { id: body.id },
        })

        revalidatePath("/")

        return ApiResponse.ok(carousel)
    } catch (error) {
        console.error("Error deleting slide:", error)
        return ApiResponse.badRequest("Failed to delete slide")
    }
}