import { useLogout } from "@/hooks/useAuth";
import { Bell, LogOut, PlusSquare } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";


interface HeaderDataProps {
    activeRoute: string; // Recibimos activeRoute como prop
    session: Session | null;
    notifications: any[];
    isDropdownOpen: boolean;
    toggleDropdown: () => void;
    markAsRead: (notificationId: number) => void;
}

export const HeaderData = ({ activeRoute, session, notifications, isDropdownOpen, toggleDropdown, markAsRead }: HeaderDataProps) => {
    const unreadCount = notifications.filter((notif) => !notif.isRead).length;
    return (
        <div className="bg-black text-light-gold font-semibold shadow-md">
            <nav className="mx-auto flex items-center justify-between px-20 pl-10 py-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" prefetch={false}>
                        <Image
                            src="/assets/logo/logo.png"
                            alt="BrandName Logo"
                            width={100}
                            height={100}
                            priority
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-4 group-hover:opacity-100">
                    <Link
                        href="/"
                        prefetch={false}
                        className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/" ? "text-black bg-white" : ""}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/Shop"
                        prefetch={false}
                        className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/Shop" ? "text-black bg-white" : ""}`}
                    >
                        Shop
                    </Link>

                    <Link
                        href="/Commissions"
                        prefetch={false}
                        className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/Commissions" ? "text-black bg-white" : ""}`}
                    >
                        Comissions
                    </Link>

                    {/* <Link
                        href="/Portfolio"
                        prefetch={false}
                        className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/Portfolio" ? "text-black bg-white" : ""}`}
                    >
                        Portfolio
                    </Link> */}

                    <Link
                        href="/Premium"
                        prefetch={false}
                        className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/Premium" ? "text-black bg-white" : ""}`}
                    >
                        Premium
                    </Link>

                    {session && (
                        <button onClick={toggleDropdown}>
                            <div className="relative">
                                <Bell />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1">
                                        {unreadCount}
                                    </span>
                                )}
                            </div>
                        </button>
                    )}

                    {/* Notifications Dropdown */}
                    {isDropdownOpen && notifications.length > 0 && (
                        <div className="absolute top-16 right-0 w-64 bg-white text-black rounded-lg shadow-lg z-10">
                            <ul className="max-h-60 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <li key={notification.id} className="p-3 border-b">
                                        <p className="text-sm">{notification.message}</p>
                                        {!notification.isRead && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-xs text-blue-500"
                                            >
                                                Mark as read
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {session && (
                        <Link
                            href="/Upload"
                            prefetch={false}
                            className={`text-2xl px-4 py-1 rounded-lg hover:text-black hover:bg-gray-300 transition-colors duration-200 ${activeRoute === "/Upload" ? "text-black bg-white" : ""}`}
                        >
                            <PlusSquare />
                        </Link>
                    )}

                    {!session ? (
                        <Link
                            href="/Login"
                            prefetch={false}
                            className={`text-2xl font-bold text-black bg-gold px-4 py-2 rounded-lg hover:bg-dark-gold hover:text-white transition-colors duration-200 ${activeRoute === "/Auth" ? "bg-dark-gold text-white" : ""
                                }`}
                        >
                            Sign in
                        </Link>
                    ) :
                        <Link
                            href={`/Profile/${session.user.username}`}
                            prefetch={false}
                            className={`text-2xl font-bold text-black bg-gold px-4 py-2 rounded-lg hover:bg-dark-gold hover:text-white transition-colors duration-200 ${activeRoute === "/Profile" ? "bg-dark-gold text-white" : ""
                                }`}
                        >
                            {session.user.username}
                        </Link>
                    }



                    {session && (
                        <button onClick={useLogout}>
                            <LogOut className="ml-5" />
                        </button>
                    )}
                </div>
            </nav>
        </div>
    );
};
