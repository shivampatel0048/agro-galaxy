"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid2X2, List, SortAsc, SortDesc, Eye, EyeOff } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import type { RootState } from "@/redux/store"
import { getAllUsersInfo } from "@/redux/features/userSlice"
import LoadingUI from "@/components/loaders/LoadingUI"
import Pagination from "@/components/admin/Pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { updatePasswordByUserId } from "@/redux/apis/authAPI"

interface User {
    _id: string
    name: string
    email: string | undefined
    phone: string | undefined
    role: "admin" | "user" | "vendor" // Fixed type
    createdAt: string
}

const RoleBadge = ({ role }: { role: User['role'] }) => {
    const badges = {
        admin: "bg-purple-100 text-purple-700",
        vendor: "bg-blue-100 text-blue-700",
        user: "bg-gray-100 text-gray-700"
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[role]}`}>
            {role}
        </span>
    )
}

const UsersPage = () => {
    const dispatch = useAppDispatch()
    const { users, status } = useAppSelector((state: RootState) => state.user)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(7)
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [view, setView] = useState<"grid" | "table">("table")
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

    useEffect(() => {
        if (!users || users.length === 0) {
            dispatch(getAllUsersInfo())
        }
    }, [dispatch, users])

    const filteredUsers =
        users?.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                //@ts-ignore
                user.role.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                user.phone?.toLowerCase().includes(searchTerm.trim().toLowerCase()),
        ) || []

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const handlePasswordUpdate = async () => {
        if (!selectedUserId) return

        try {
            await updatePasswordByUserId(selectedUserId, newPassword)
            toast.success("Password updated successfully")
            setIsPasswordModalOpen(false)
            setNewPassword("")
        } catch (error) {
            toast.error("Failed to update password")
        }
    }

    const sortedUsers = [...currentUsers].sort((a, b) => {
        if (sortOrder === "newest") {
            return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        }
        return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
    })

    if (status === "loading") return <LoadingUI />

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Users</h1>
                <div className="flex items-center gap-4">
                    <Select value={sortOrder} onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">
                                <div className="flex items-center gap-2">
                                    <SortDesc className="h-4 w-4" />
                                    Newest
                                </div>
                            </SelectItem>
                            <SelectItem value="oldest">
                                <div className="flex items-center gap-2">
                                    <SortAsc className="h-4 w-4" />
                                    Oldest
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex items-center border rounded-lg">
                        <Button
                            variant={view === "grid" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setView("grid")}
                        >
                            <Grid2X2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={view === "table" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setView("table")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <Input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
            />

            {view === "table" ? (
                <div className="rounded-lg overflow-hidden border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100/50 dark:bg-gray-800/50">
                                <TableHead className="font-semibold">Name</TableHead>
                                <TableHead className="font-semibold">Email</TableHead>
                                <TableHead className="font-semibold">Phone</TableHead>
                                <TableHead className="font-semibold">Role</TableHead>
                                <TableHead className="font-semibold text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedUsers.length > 0 && sortedUsers.map((user) => (
                                <TableRow key={user._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email ?? "Not found"}</TableCell>
                                    <TableCell>{user.phone ?? "Not found"}</TableCell>
                                    <TableCell><RoleBadge role={user.role as "admin" | "user" | "vendor"} /></TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedUserId(user._id!)
                                                setIsPasswordModalOpen(true)
                                            }}
                                        >
                                            Update Password
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {sortedUsers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <p className="text-lg font-medium">No users found</p>
                                            <p className="text-sm">Try adjusting your search criteria</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedUsers.map((user) => (
                        <div key={user._id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-medium">{user.name}</h3>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <RoleBadge role={user.role as "admin" | "user" | "vendor"} />
                            </div>
                            <p className="text-sm text-gray-600">{user.phone ?? "No phone"}</p>
                            <div className="mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => {
                                        setSelectedUserId(user._id!)
                                        setIsPasswordModalOpen(true)
                                    }}
                                >
                                    Update Password
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {sortedUsers.length > 0 && <div className="mt-4 flex justify-center">
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>}
            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Password</DialogTitle>
                    </DialogHeader>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <Button onClick={handlePasswordUpdate}>Update Password</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UsersPage