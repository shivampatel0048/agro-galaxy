import Link from "next/link"
import { BadgeInfo, Home, Package, ShoppingCart, Users } from 'lucide-react'

const navItems = [
    // { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/support", icon: BadgeInfo, label: "Contact Support" },
]

export function Sidebar() {
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <nav className="mt-6">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}
