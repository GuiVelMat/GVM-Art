import { ListUsersAdmin } from "@/components/admin/List/ListUsersAdmin";
import React from "react";

const AdminUsers = async () => {
    return (
        <div className="container mx-auto pt-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground mt-2">
                    List of all registered users in the platform.
                </p>
            </div>

            <div className="grid gap-8">
                <ListUsersAdmin />
            </div>
        </div>
    );
}

export default AdminUsers;