import { ListProductsAdmin } from "@/components/admin/List/ListProductsAdmin";
import React from "react";

const AdminProducts = () => {
    return (
        <div className="container mx-auto pt-8">
            <div className="mb-3">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground mt-2">
                    Edit your products or check them in the store.
                </p>
            </div>

            <ListProductsAdmin />
        </div>
    );
}

export default AdminProducts;