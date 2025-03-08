import getCurrentUser from "@/actions/getCurrentUser";
import { getProduct } from "@/actions/getProduct";
import { ApiResponse } from "@/app/api/exceptions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

interface ParamsInterface {
    slug: string
}

const revalidate = (slug: string) => {
    revalidatePath('/')
    revalidatePath(`/Profile/[username]`, 'page')
    revalidatePath(`/Details/${slug}`)
}

export const POST = async (req: NextRequest, { params }: { params: ParamsInterface }) => {
    // return ApiResponse.ok('POST')
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        redirect('/Login');
    }

    const product = await prisma.product.findUnique({
        where: {
            slug: params.slug,
        },
    })
    if (!product) {
        return ApiResponse.notFound('Article not fount');
    }

    // return ApiResponse.ok(product);

    try {
        await prisma.favorites.create({
            data: {
                favoriting: { connect: { id: product.id } },
                favoritedBy: { connect: { id: currentUser.id } },
            },
        });

        await prisma.product.update({
            where: {
                id: product.id,
            },
            data: {
                favoritesCount: {
                    increment: 1,
                }
            },
        });

        revalidate(params.slug);
    } catch (e) {
        console.log(e);
    }

    const newProduct = await getProduct({ slug: params.slug });
    return ApiResponse.ok(newProduct);
}

export const DELETE = async (req: NextRequest, { params }: { params: ParamsInterface }) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        redirect('/Login')
    }

    const product = await prisma.product.findUnique({
        where: {
            slug: params.slug,
        },
    })
    if (!product) {
        return ApiResponse.notFound('Article not exists')
    }

    try {
        await prisma.favorites.delete({
            where: {
                productId_userId: {
                    productId: product.id,
                    userId: currentUser.id,
                },
            },
        });

        await prisma.product.update({
            where: {
                id: product.id,
            },
            data: {
                favoritesCount: {
                    decrement: 1,
                }
            },
        });

        revalidate(params.slug)
    } catch (e) {
        console.log(e)
    }

    const newArticle = await getProduct({ slug: params.slug })
    return ApiResponse.ok(newArticle)
}