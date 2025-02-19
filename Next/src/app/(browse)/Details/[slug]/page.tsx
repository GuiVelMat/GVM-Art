import { getProduct } from "@/actions/getProduct"
import ListDetails from "@/components/shared/Lists/ListDetails"
import React from "react"

interface ProductProps {
    params: { slug: string }
}

const ProductPage = async ({ params }: ProductProps) => {
    try {
        const product = await getProduct({ slug: params.slug })

        if (!product) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
                        <p className="text-xl text-gray-600">The product with the slug "{params.slug}" does not exist.</p>
                    </div>
                </div>
            )
        }

        return (
            <div className="min-h-screen text-white">
                <ListDetails product={product} />
            </div>
        )
    } catch (error) {
        console.error("Error fetching product:", error)

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Error</h1>
                    <p className="text-xl text-gray-600">There was an error loading the product. Please try again later.</p>
                </div>
            </div>
        )
    }
}

export default ProductPage

