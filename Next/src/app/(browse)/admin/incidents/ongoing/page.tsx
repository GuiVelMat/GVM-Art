import { ListIncidentsAdmin } from "@/components/admin/List/ListIncidentsAdmin";
import React from "react";

const AdminIncidentsOngoing = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-5">
                <h1 className="text-3xl font-bold tracking-tight">Ongoing reports</h1>
                <p className="text-muted-foreground mt-2">
                    List of all ongoing reports.
                    <span className="font-bold text-red-500"> Remember that reports are managed via email to contact directly with the user.</span>
                </p>
            </div>

            <ListIncidentsAdmin selectStatus={"PENDING"} buttonStatus={"INACTIVE"} />
        </div>
    );
}

export default AdminIncidentsOngoing;