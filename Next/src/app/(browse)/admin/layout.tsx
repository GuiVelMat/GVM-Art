import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="flex flex-grow h-screen bg-zinc-300 justify-center pt-10">
                <AdminSidebar />
                {children}
            </div>
        </SidebarProvider>
    )
}

