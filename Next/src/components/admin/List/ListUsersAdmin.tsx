// 'use client'

import React from "react";
import { CardUsersAdmin } from "../Cards/CardUsersAdmin";
import getUserList from "@/actions/getUserList";

export const ListUsersAdmin = async ({ searchParams }: {
    searchParams?: {
        Name?: string
    }
}) => {
    const params = await searchParams;
    const filters = {
        searchQuery: params?.Name || '',
    }

    const users = await getUserList(filters);

    return (
        <div className="grid grid-cols-4 gap-4">
            {users.map((user) => (
                <CardUsersAdmin key={user.id} user={user} />
            ))}
        </div>
    );
}