"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import type { RootState } from "@/redux/store"
import { getAllUsersInfo } from "@/redux/features/userSlice"
import LoadingUI from "@/components/loaders/LoadingUI"
import Pagination from "@/components/admin/Pagination"

interface User {
    _id: string
    name: string
    email: string | undefined
    phone: string | undefined
    role: any
}

const UsersPage = () => {
    const dispatch = useAppDispatch()
    const { users, status } = useAppSelector((state: RootState) => state.user)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(7)

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

    if (status === "loading") return <LoadingUI />

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Users</h1>
            <Input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
            />
            <div className="rounded-[0.75rem] overflow-hidden border">
                <Table>
                    <TableHeader>
                        <TableRow className="h-14 bg-gray-200 text-black/80">
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Role</TableHead>
                            {/* <TableHead>Actions</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentUsers.length > 0 && currentUsers?.map((user) => (
                            <TableRow key={user._id} className="h-12 hover:!bg-white/60 !transition-all !duration-300">
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email ?? "Not found"}</TableCell>
                                <TableCell>{user.phone ?? "Not found"}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                {/* <TableCell>
                                <Button asChild>
                                    <Link href={`/admin/users/${user._id}`}>Edit</Link>
                                </Button>
                            </TableCell> */}
                            </TableRow>
                        ))}

                        {currentUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No users found
                                </TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </div>
            {currentUsers.length > 0 && <div className="mt-4 flex justify-center">
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>}
        </div>
    )
}

export default UsersPage