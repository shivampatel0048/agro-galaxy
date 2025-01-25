"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { fetchUserInfo, selectUser, updateUserById } from "@/redux/features/userSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus, Pencil } from "lucide-react"
import { toast } from "sonner"
import { getToken } from "@/utils/tokenUtils"
import Link from "next/link"

interface Address {
    street: string
    city: string
    state: string
    pincode: string
    landmark?: string
}

export default function ProfilePage() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { user, status } = useAppSelector((state) => state.user)
    const [editingName, setEditingName] = useState<boolean>(false)
    const [editingAddress, setEditingAddress] = useState<boolean>(false)
    const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false)
    const [newName, setNewName] = useState(user?.name ?? "")
    const [newEmail, setNewEmail] = useState("")
    const [newAddress, setNewAddress] = useState<Address>({
        street: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
    })

    useEffect(() => {
        const token = getToken()

        if (status === 'idle' && token) {
            dispatch(fetchUserInfo())
        }
    }, [dispatch, status])

    if (!user) {
        return <div>Loading...</div>
    }

    const handleUpdateName = () => {
        if (newName.trim() === "") {
            toast.info('Name cannot be empty')
            return
        }
        dispatch(updateUserById({ id: user._id!, userData: { name: newName } }))
        setEditingName(false)
    }

    const handleUpdateEmail = () => {
        if (newEmail.trim() === "") {
            toast.error("Email cannot be empty")
            return
        }
        dispatch(updateUserById({ id: user._id!, userData: { email: newEmail } }))
        setNewEmail("")
    }

    const handleUpdateAddress = (index: number) => {
        const updatedAddresses = [...user.addresses!];
        const currentAddress = user.addresses![index];

        if (
            currentAddress.street === newAddress.street &&
            currentAddress.city === newAddress.city &&
            currentAddress.state === newAddress.state &&
            currentAddress.pincode === newAddress.pincode &&
            currentAddress.landmark === newAddress.landmark
        ) {
            toast.info("No changes detected in the address.");
            setNewAddress({ street: "", city: "", state: "", pincode: "", landmark: "" });
            setEditingAddress(!editingAddress);
            return;
        }

        updatedAddresses[index] = newAddress;
        dispatch(updateUserById({ id: user._id!, userData: { addresses: updatedAddresses } }));
        setEditingAddress(!editingAddress);
        setNewAddress({ street: "", city: "", state: "", pincode: "", landmark: "" });
    };

    const handleDeleteAddress = (index: number) => {
        const updatedAddresses = user.addresses!.filter((_, i) => i !== index)
        dispatch(updateUserById({ id: user._id!, userData: { addresses: updatedAddresses } }))
    }

    const handleAddAddress = () => {
        if (user.addresses) {
            dispatch(updateUserById({ id: user._id!, userData: { addresses: [...user.addresses, newAddress] } }))
        } else {
            dispatch(updateUserById({ id: user._id!, userData: { addresses: [newAddress] } }))
        }
        setNewAddress({ street: "", city: "", state: "", pincode: "", landmark: "" })
        setIsAddingAddress(!isAddingAddress)
    }

    return (
        <div className="max-w-4xl w-full mx-auto p-4 relative">
            <div className="flex justify-between items-center my-6">
                <h1 className="text-3xl font-bold">Profile</h1>

                <Link href='/profile/my-orders'>
                    <Button type="button">See All Orders</Button>
                </Link>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <div className="flex items-center space-x-2">
                                <Input value={user.name} readOnly />
                                <Dialog open={editingName} onOpenChange={() => setEditingName(!editingName)}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Name</DialogTitle>
                                        </DialogHeader>
                                        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter new name" />
                                        <Button onClick={handleUpdateName}>Save</Button>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <div>
                            <Label>Email</Label>
                            {user.email ? (
                                <Input disabled value={user.email} readOnly />
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Enter email" />
                                    <Button onClick={handleUpdateEmail}>Add Email</Button>
                                </div>
                            )}
                        </div>
                        <div>
                            <Label>Phone</Label>
                            <Input disabled value={user.phone ?? ""} readOnly />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between items-center">
                            <h3>Addresses</h3>

                            <Dialog open={isAddingAddress} onOpenChange={() => setIsAddingAddress(!isAddingAddress)}>
                                <DialogTrigger asChild>
                                    <button type="button">
                                        <CirclePlus strokeWidth={1.5} size={20} />
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Address</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <Input
                                            value={newAddress.street}
                                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                            placeholder="Street"
                                        />
                                        <Input
                                            value={newAddress.city}
                                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            placeholder="City"
                                        />
                                        <Input
                                            value={newAddress.state}
                                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                            placeholder="State"
                                        />
                                        <Input
                                            value={newAddress.pincode}
                                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                            placeholder="Pincode"
                                        />
                                        <Input
                                            value={newAddress.landmark}
                                            onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                                            placeholder="Landmark"
                                        />
                                        <Button type="button" onClick={() => handleAddAddress()}>Add Address</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {user.addresses?.map((address, index) => (
                            <Card key={index}>
                                <CardContent className="p-4">
                                    <p>{address.street}</p>
                                    <p>
                                        {address.city}, {address.state} - {address.pincode}
                                    </p>
                                    {address.landmark && <p>Landmark: {address.landmark}</p>}
                                    <div className="mt-2 space-x-2">
                                        <Dialog open={editingAddress} onOpenChange={() => setEditingAddress(!editingAddress)}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" onClick={() => setNewAddress(address)}>
                                                    Edit
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Address</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <Input
                                                        value={newAddress.street}
                                                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                                        placeholder="Street"
                                                    />
                                                    <Input
                                                        value={newAddress.city}
                                                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                        placeholder="City"
                                                    />
                                                    <Input
                                                        value={newAddress.state}
                                                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                        placeholder="State"
                                                    />
                                                    <Input
                                                        value={newAddress.pincode}
                                                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                                        placeholder="Pincode"
                                                    />
                                                    <Input
                                                        value={newAddress.landmark}
                                                        onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                                                        placeholder="Landmark"
                                                    />
                                                    <Button onClick={() => handleUpdateAddress(index)}>Save</Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="destructive" onClick={() => handleDeleteAddress(index)}>
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}