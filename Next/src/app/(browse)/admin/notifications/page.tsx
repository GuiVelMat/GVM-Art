import { CreateNotificationForm } from "@/components/admin/forms/notificationsForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Notifications Panel | Admin",
    description: "Send mass notifications to platform users",
};

const AdminNotifications = () => {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-3">
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground mt-2">
                    Send mass notifications to all platform users.
                </p>
            </div>

            <CreateNotificationForm />
        </div>
    );
};

export default AdminNotifications;
