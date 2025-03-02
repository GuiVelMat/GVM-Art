"use client"

import type { ProfileItem } from "@/types/Profile"
import { UserStatusButton } from "../buttons/UserStatusButton"
import React from "react"
import Image from "next/image"

interface CardUsersAdminProps {
    user: ProfileItem
}

export const CardUsersAdmin = ({ user }: CardUsersAdminProps) => {
    return (
        <div className="bg-white p-4 shadow rounded">
            <div className="flex gap-4 items-start border-separate border-b border-gray-400 pb-2">
                <Image src={user.avatar ?? "/default-avatar.png"} alt={user.username} width={100} height={100} className="rounded-xl" />
                <div className="flex flex-col">
                    <h1 className="text-sm text-zinc-500">{user.user.role}</h1>
                    <h1 className="text-lg font-semibold">{user.username}</h1>
                    <p className="text-sm text-gray-600">{user.user.email}</p>
                </div>
            </div>

            <UserStatusButton userId={user.id} currentStatus={user.user.status} />
        </div>
    )
}

