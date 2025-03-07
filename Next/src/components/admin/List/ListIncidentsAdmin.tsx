import { getAllIncidents } from "@/actions/getIncident"
import { $Enums } from "@prisma/client";
import React from "react";
import { CardIncidentAdmin } from "../Cards/CardIncidentAdmin";

interface IProps {
    selectStatus: $Enums.status;
    buttonStatus: $Enums.status;
}

export const ListIncidentsAdmin = async ({ selectStatus, buttonStatus }: IProps) => {
    const incidents = await getAllIncidents(selectStatus);

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-3 gap-4">
                {incidents.map((incident) => (
                    <CardIncidentAdmin incident={incident} status={buttonStatus} key={incident.id} />
                ))}
            </div>
        </div>
    )
}