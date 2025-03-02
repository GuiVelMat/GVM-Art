'use client'

import { fetchUsers, selectUsers } from "@/store/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "@/store/store"
import React, { useEffect } from "react";
import { CardUsersAdmin } from "../Cards/CardUsersAdmin";

export const ListUsersAdmin = () => {
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])

    return (
        <section className="">
            <div className="grid grid-cols-4 gap-4">
                {users.map((user) => (
                    <CardUsersAdmin key={user.id} user={user} />
                ))}
            </div>
        </section>
    );
}