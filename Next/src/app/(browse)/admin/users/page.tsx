import { ListUsersAdmin } from "@/components/admin/List/ListUsersAdmin";
import Search from "@/components/shared/search";
import React from "react";

const AdminUsers = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <div className="container mx-auto pt-8">
            <div className="mb-3">
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground mt-2">
                    Manage the registered users in the platform.
                </p>
            </div>

            <div className="max-w-md mb-3">
                <Search placeholder="Search users" />
            </div>

            <div className="grid gap-8">
                <ListUsersAdmin searchParams={searchParams} />
            </div>
        </div>
    );
}

export default AdminUsers;