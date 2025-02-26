import getCarousel from "@/actions/getCarousel"
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../exceptions";

export const GET = async () => {
    const carousel = await getCarousel();
    console.log(carousel);

    return NextResponse.json(carousel);
}

export async function PUT(req: NextRequest) {
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