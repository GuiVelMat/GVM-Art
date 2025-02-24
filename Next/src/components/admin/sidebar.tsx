"use client"

import { Home, PanelBottom, Bell, ShoppingCart, Users, MessageSquareWarning, LogOut, List, PlusCircle, ArrowLeftRightIcon, FolderClosed, LucideMailWarning } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import Image from "next/image"
import { useLogout } from "@/hooks/useAuth"

const menuItems = [
    { icon: Home, label: "Home", href: "/admin" },
    { icon: PanelBottom, label: "Carousel", href: "/admin/carousel" },
    { icon: Bell, label: "Notifications", href: "/admin/notifications" },
    {
        icon: ShoppingCart,
        label: "Products",
        href: "/admin/products",
        subItems: [
            { icon: List, label: "List", href: "/admin/products" },
            { icon: PlusCircle, label: "Create", href: "/admin/products/create" },
        ],
    },
    { icon: Users, label: "Users", href: "/admin/users" },
    {
        icon: MessageSquareWarning,
        label: "Reports",
        href: "/admin/incidents",
        subItems: [
            { icon: LucideMailWarning, label: "New", href: "/admin/incidents" },
            { icon: ArrowLeftRightIcon, label: "Ongoing", href: "/admin/incidents/ongoing" },
            { icon: FolderClosed, label: "Closed", href: "/admin/incidents/closed" },
        ]
    },
    { icon: LogOut, label: "Logout", href: "/admin/logout" },
]

export function AdminSidebar() {
    const pathname = usePathname()

    const isItemActive = (item: (typeof menuItems)[0]) => {
        if (item.href === "/admin") {
            return pathname === "/admin"
        }
        if (item.subItems) {
            return item.subItems.some((subItem) => pathname.startsWith(subItem.href))
        }
        return pathname.startsWith(item.href)
    }

    return (
        <Sidebar>
            <SidebarHeader className="p-2 bg-black border-b-4 border-gold">
                <Link href="/" prefetch={false}>
                    <Image
                        src="/assets/logo/logo.png"
                        alt="BrandName Logo"
                        width={150}
                        height={150}
                        priority
                    />
                </Link>
            </SidebarHeader>
            <SidebarContent className="bg-zinc-800 text-white">
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={isItemActive(item)}>
                                <Link href={item.href} className="flex items-center pl-5 py-5 text-xl">
                                    <item.icon className="mr-2 h-16 w-16" />
                                    {item.label === "Logout" ?
                                        <span onClick={() => useLogout()}>{item.label}</span>
                                        :
                                        <span>{item.label}</span>
                                    }
                                </Link>
                            </SidebarMenuButton>
                            {item.subItems && isItemActive(item) && (
                                <div className="ml-6 mt-1 space-y-1">
                                    {item.subItems.map((subItem) => (
                                        <SidebarMenuButton key={subItem.href} asChild isActive={pathname === subItem.href}>
                                            <Link href={subItem.href} className="flex items-center">
                                                <subItem.icon className="mr-2 h-4 w-4" />
                                                <span>{subItem.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    ))}
                                </div>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarTrigger className="absolute top-4 right-4 md:hidden" />
        </Sidebar>
    )
}

