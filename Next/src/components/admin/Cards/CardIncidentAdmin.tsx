'use client'

import { $Enums, Incidents } from "@prisma/client";
import React from "react";
import { IncidentButton } from "../buttons/IncidentButton";

interface CardIncidentAdminProps {
    incident: Incidents;
    status: $Enums.status;
}

export const CardIncidentAdmin = ({ incident, status }: CardIncidentAdminProps) => {
    return (
        <div className="w-96 max-w-lg rounded-lg border border-zinc-200 shadow-sm p-4 bg-white">
            <div className="flex justify-between items-center mb-3">
                <p className="text-sm mb-2 inline-block px-3 py-2 rounded-full font-medium bg-zinc-700">
                    <span className="text-white font-bold">Id Report: #{incident.id} </span>
                    {/* <span className="text-sm text-zinc-800">{incident.slug}</span> */}
                </p>

                {incident.productId ? (
                    <p className="text-sm mb-2 inline-block px-2 py-1 rounded-full font-medium bg-red-200">
                        <span className="text-zinc-800 font-bold">ProductID:</span> <span className="font-medium">#{incident.productId}</span>
                    </p>
                ) : (
                    <p className="text-sm mb-2 inline-block px-2 py-1 rounded-full font-medium bg-blue-200">
                        <span className="text-zinc-800 font-bold">OrderLineId:</span>{" "}
                        <span className="font-medium">#{incident.orderLineId}</span>
                    </p>
                )}
            </div>

            <p className="text-sm mb-2">
                <span className="text-sm text-zinc-800 font-bold">Reported by:</span>{" "}
                <span className="text-sm font-medium">{incident.userEmail}</span>
            </p>

            <p className="text-sm mb-2">
                <span className="text-zinc-800 font-bold">Report type:</span> <span className="font-medium">{incident.type}</span>
            </p>
            <div className="my-3 p-3 bg-zinc-200 rounded-md">
                <p className="text-sm text-zinc-800 font-bold mb-1">Description:</p>
                <p className="text-sm">{incident.description}</p>
            </div>
            <p
                className="mb-4 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                    backgroundColor:
                        incident.status.toLowerCase() === "pending"
                            ? "#FEF3C7"
                            : incident.status.toLowerCase() === "ongoing"
                                ? "#DBEAFE"
                                : incident.status.toLowerCase() === "inactive"
                                    ? "#D1FAE5"
                                    : "#FEE2E2",
                    color:
                        incident.status.toLowerCase() === "pending"
                            ? "#92400E"
                            : incident.status.toLowerCase() === "ongoing"
                                ? "#1E40AF"
                                : incident.status.toLowerCase() === "inactive"
                                    ? "#065F46"
                                    : "#B91C1C",
                }}
            >
                {incident.status}
            </p>

            {incident.status !== "INACTIVE" &&
                <IncidentButton incident={incident} status={status} />
            }
        </div>
    )
}