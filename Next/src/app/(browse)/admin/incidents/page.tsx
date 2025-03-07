import { ListIncidentsAdmin } from "@/components/admin/List/ListIncidentsAdmin";
import React from "react";

const AdminIncidents = () => {
    return (
        <div>
            <ListIncidentsAdmin selectStatus={"ACTIVE"} buttonStatus={"PENDING"} />
        </div>
    );
}

export default AdminIncidents;