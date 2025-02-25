import { getProduct } from "@/actions/getProduct";
import UploadForm from "@/components/forms/UploadForm";
import InitializeParamsProduct from "@/components/shared/creatorFetcher";
import { Category, ProductPrice } from "@prisma/client";
import React from "react";

interface ProductProps {
    params: { slug: string }
}

const AdminProductsEdit = async ({ params }: ProductProps) => {
    const paramsProduct = await params;
    const productData = await getProduct({ slug: paramsProduct.slug });

    const formattedProductData = {
        id: productData?.id,
        name: productData?.name || '',
        categories: productData?.categories.map((cat: Category) => cat.id) || [],
        size: productData?.ImagesProduct[0]?.size || null,
        series: productData?.seriesId || 0,
        collection: productData?.collectionId || 0,
        types: productData?.productPrices.map((price: ProductPrice) => ({
            id: price.typeId,
            price: price.price,
        })) || [],
        // file: null, // No file initially when editing
        email: 'aasd@gmail.com',
    }

    return (
        <main className="flex-col items-center my-10 text-white">
            <InitializeParamsProduct />
            <UploadForm productData={formattedProductData} isEditing={true} />
            {/* <h1>{formattedProductData.types[0].price}</h1> */}
        </main>
    )
}

export default AdminProductsEdit;