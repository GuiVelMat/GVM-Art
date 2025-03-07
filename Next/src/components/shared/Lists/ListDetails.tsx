import type React from "react"
import { AddtoCartButton } from "@/components/Cart/AddtoCartbutton"
import PriceSelector from "@/components/Cart/PriceSelector"
import PriceDisplay from "@/components/Cart/PriceDisplay"
import { ProductItem } from "@/types/Product"
import { ReportButton } from "../buttons/reportButton"

interface ListDetailsProps {
    product: ProductItem // Replace 'any' with a proper Product interface
}

const ListDetails = ({ product }: ListDetailsProps) => {
    const defaultPrice = product.productPrices[0] || null
    const imageSize = product.ImagesProduct[0].size

    return (
        <div
            className={`flex flex-col ${imageSize === "wide" ? "lg:flex-row" : "md:flex-row"} items-start justify-between w-full max-w-7xl mx-auto px-4 py-8`}
        >
            <div
                className={`w-full ${imageSize === "wide" ? "lg:w-2/3" : imageSize === "tall" ? "md:w-1/3" : "md:w-1/2"} mb-8 ${imageSize !== "wide" ? "md:mb-0" : "lg:mb-0"}`}
            >
                <img
                    src={`/assets/products/${product.ImagesProduct[0].src}`}
                    alt={product.name}
                    className={`w-full h-auto object-contain rounded-lg shadow-lg ${imageSize === "tall" ? "max-h-[70vh]" : ""}`}
                />
            </div>
            <div
                className={`w-full ${imageSize === "wide" ? "lg:w-1/3" : imageSize === "tall" ? "md:w-2/3" : "md:w-1/2"} ${imageSize !== "wide" ? "md:pl-8" : "lg:pl-8"}`}
            >
                <div className="flex items-center">
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <ReportButton productId={product.id} orderLineId={null} />
                </div>

                <div className="space-y-4 mb-8">
                    <p className="text-lg">
                        <span className="font-semibold">Collection:</span> {product.collections.name}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Series:</span> {product.series.name}
                    </p>

                    <div className="mb-6">
                        <PriceSelector prices={product.productPrices} defaultPrice={defaultPrice} />
                        {defaultPrice !== null && <PriceDisplay defaultPrice={defaultPrice} />}
                    </div>

                    {defaultPrice !== null && <AddtoCartButton product={product} defaultPrice={defaultPrice} />}
                </div>

            </div>
        </div>
    )
}

export default ListDetails

