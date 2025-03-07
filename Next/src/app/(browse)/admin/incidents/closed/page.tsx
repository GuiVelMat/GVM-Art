import { ListIncidentsAdmin } from "@/components/admin/List/ListIncidentsAdmin";
import React from "react";

const AdminIncidentsClosed = () => {
    return (
        <div>
            <ListIncidentsAdmin selectStatus={"INACTIVE"} />
        </div>
    );
}

export default AdminIncidentsClosed;