"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface User {
    _id: string
    name: string
    email: string
    phone?: string
    role: "user" | "vendor" | "admin"
}

export default function UserDetailsPage() {
    const { id } = useParams()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // Fetch user details here
        // For now, we'll use mock data
        setUser({
            _id: id as string,
            name: "John Doe",
            email: "john@example.com",
            phone: "1234567890",
            role: "user",
        })
    }, [id])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser((prev) => (prev ? { ...prev, [name]: value } : null))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Updating user:", user)
        toast("User Updated", {
            description: "The user details have been successfully updated.",
        })
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={user.name} onChange={handleInputChange} required />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" value={user.phone ?? ""} onChange={handleInputChange} />
                </div>
                <div>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" name="role" value={user.role} onChange={handleInputChange} required />
                </div>
                <Button type="submit">Update User</Button>
            </form>
        </div>
    )
}