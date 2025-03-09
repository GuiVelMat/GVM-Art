import { ListProductsAdmin } from "@/components/admin/List/ListProductsAdmin";
import Search from "@/components/shared/search";
import React from "react";

const AdminProducts = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <div className="container mx-auto pt-8">
            <div className="mb-3">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground mt-2">
                    Edit your products or check them in the store.
                </p>
            </div>

            <div className="max-w-md mb-3">
                <Search placeholder="Search products" />
            </div>

            <ListProductsAdmin searchParams={searchParams} />
        </div>
    );
}

export default AdminProducts;