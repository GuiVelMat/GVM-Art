import { ListIncidentsAdmin } from "@/components/admin/List/ListIncidentsAdmin";
import React from "react";

const AdminIncidentsOngoing = () => {
    return (
        <div>
            <ListIncidentsAdmin selectStatus={"PENDING"} buttonStatus={"INACTIVE"} />
        </div>
    );
}

export default AdminIncidentsOngoing;