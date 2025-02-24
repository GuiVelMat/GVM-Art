"use client"

import { useState, useEffect } from "react"
import { HeaderData } from "./HeaderData"
import { usePathname } from "next/navigation" // Importamos useRouter
import { useSession } from "next-auth/react"
import { fetchWrapper } from "@/utils/fetch"
import React from "react"

export const Header = () => {
    const [showHeader, setShowHeader] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [notifications, setNotifications] = useState<any[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // Usamos useRouter para obtener la ruta activa
    const pathname = usePathname()

    const { data: session } = useSession()

    const fetchNotifications = async () => {
        if (session) {
            try {
                const response = await fetchWrapper("/api/notifications", "GET", session.user.email)
                setNotifications(response)
            } catch (error) {
                console.error("Error al obtener las notificaciones", error)
            }
        }
    }

    useEffect(() => {
        if (session) {
            fetchNotifications()
        }
    }, [session])

    const handleScroll = () => {
        const currentScrollY = window.scrollY
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setShowHeader(false)
        } else {
            setShowHeader(true)
        }
        setLastScrollY(currentScrollY)
    }
    const markAsRead = async (notificationId: number) => {
        try {
            console.log(notificationId)
            const response = await fetchWrapper(`/api/notifications/${notificationId}`, "PUT")
            if (response.success) {
                setNotifications((prevNotifications) =>
                    // prevNotifications.map((notif) =>
                    //     notif.id === notificationId ? { ...notif, isRead: true } : notif
                    // )
                    prevNotifications.filter((notif) => notif.id !== notificationId),
                )
            }
        } catch (error) {
            console.error("Error al marcar la notificación como leída", error)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [lastScrollY])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <>
            {!pathname.toLowerCase().startsWith("/admin") ? (
                <div
                    className={`sticky top-0 z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
                >
                    {/* Le pasamos la ruta activa al componente HeaderData */}
                    <HeaderData
                        activeRoute={pathname}
                        session={session}
                        notifications={notifications}
                        isDropdownOpen={isDropdownOpen}
                        toggleDropdown={toggleDropdown}
                        markAsRead={markAsRead}
                    />
                </div>
            ) : null}
        </>
    )
}

