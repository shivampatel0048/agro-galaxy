import { Sidebar } from "@/components/admin/Sidebar"
import AdminChecker from "./AdminChecker";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminChecker>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
        </AdminChecker>
    )
}
