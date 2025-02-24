"use client"

import { Home, PanelBottom, Bell, ShoppingCart, Users, MessageSquareWarning, LogOut, List, PlusCircle } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import Image from "next/image"

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
    { icon: MessageSquareWarning, label: "Reports", href: "/admin/incidents" },
    { icon: LogOut, label: "Logout", href: "/admin/logout" },
]

export function AdminSidebar() {
    const pathname = usePathname()

    const isActive = (href: string) => pathname.startsWith(href)
    const isExactActive = (href: string) => pathname === href

    return (
        <Sidebar>
            <SidebarHeader className="p-4 bg-black">
                {/* <h2 className="text-3xl font-bold">Admin Panel</h2> */}
                <Image
                    src="/assets/logo/logo.png"
                    alt="BrandName Logo"
                    width={150}
                    height={150}
                    priority
                />
            </SidebarHeader>
            <SidebarContent className="bg-zinc-800 text-white">
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={isActive(item.href)}>
                                <Link href={item.href} className="flex items-center pl-5 py-5 text-xl">
                                    <item.icon className="mr-2 h-16 w-16" />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                            {item.subItems && isActive(item.href) && (
                                <div className="ml-6 mt-2 space-y-2">
                                    {item.subItems.map((subItem) => (
                                        <SidebarMenuButton key={subItem.href} asChild isActive={isExactActive(subItem.href)}>
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

