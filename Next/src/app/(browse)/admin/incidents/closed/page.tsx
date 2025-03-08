import { ListIncidentsAdmin } from "@/components/admin/List/ListIncidentsAdmin";
import React from "react";

const AdminIncidentsClosed = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-5">
                <h1 className="text-3xl font-bold tracking-tight">Closed reports</h1>
                <p className="text-muted-foreground mt-2">
                    List of all closed reports.
                </p>
            </div>

            <ListIncidentsAdmin selectStatus={"INACTIVE"} buttonStatus={"INACTIVE"} />
        </div>
    );
}

export default AdminIncidentsClosed;