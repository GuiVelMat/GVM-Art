"use client"

import { updateUserStatus } from "@/store/slices/usersSlice"
import { useAppDispatch } from "@/store/store"
import { $Enums } from "@prisma/client"
import React from "react"

interface UserStatusButtonProps {
    userId: number
    currentStatus: $Enums.status
}

export const UserStatusButton = ({ userId, currentStatus }: UserStatusButtonProps) => {
    const dispatch = useAppDispatch()
    const statuses = [$Enums.status.ACTIVE, $Enums.status.INACTIVE, $Enums.status.PENDING]

    const handleStatusChange = (newStatus: $Enums.status) => {
        // if (newStatus !== currentStatus) {
        dispatch(updateUserStatus({ userId, status: newStatus }))
        // }
        location.reload();
    }

    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${status === currentStatus ? "bg-primary text-white font-medium" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        disabled={status === currentStatus}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
    )
}

