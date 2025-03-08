import { ListIncidentsAdmin } from "@/components/admin/List/ListIncidentsAdmin";
import React from "react";

const AdminIncidents = () => {
    return (
        <div className="container mx-auto pt-8">
            <div className="mb-3">
                <h1 className="text-3xl font-bold tracking-tight">New reports</h1>
                <p className="text-muted-foreground mt-2">
                    List of all new reports.
                    <span className="font-bold text-red-500"> Remember that reports are managed via email to contact directly with the user.</span>
                </p>
            </div>

            <ListIncidentsAdmin selectStatus={"ACTIVE"} buttonStatus={"ACTIVE"} />
        </div>
    );
}

export default AdminIncidents;