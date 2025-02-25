import UploadForm from "@/components/forms/UploadForm";
import InitializeParamsProduct from "@/components/shared/creatorFetcher";
import React from "react";

const AdminProductsCreate = () => {
    return (
        <main className="flex-col items-center my-10 text-white">
            <InitializeParamsProduct />
            <UploadForm />
        </main>
    )
}

export default AdminProductsCreate;