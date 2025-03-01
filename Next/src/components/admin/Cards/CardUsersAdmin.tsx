"use client"

import type { ProfileItem } from "@/types/Profile"
import { UserStatusButton } from "../buttons/UserStatusButton"
import React from "react"

interface CardUsersAdminProps {
    user: ProfileItem
}

export const CardUsersAdmin = ({ user }: CardUsersAdminProps) => {
    return (
        <div className="bg-white p-4 shadow rounded">
            <h1 className="text-lg font-semibold">
                {user.username} <span className="text-sm text-zinc-500">({user.user.role})</span>
            </h1>
            <p className="text-sm text-gray-600">{user.user.email}</p>

            <UserStatusButton userId={user.id} currentStatus={user.user.status} />
        </div>
    )
}

