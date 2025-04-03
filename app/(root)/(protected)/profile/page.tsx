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
import { CirclePlus } from "lucide-react"
import { toast } from "sonner"
import { getToken } from "@/utils/tokenUtils"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageProvider";
import LoadingUI from "@/components/loaders/LoadingUI"

// Translations for English and Hindi
const texts = {
  en: {
    profile: "Profile",
    seeAllOrders: "See All Orders",
    personalInfo: "Personal Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    edit: "Edit",
    addEmail: "Add Email",
    addresses: "Addresses",
    street: "Street",
    city: "City",
    state: "State",
    pincode: "Pincode",
    landmark: "Landmark",
    addAddress: "Add Address",
    editAddress: "Edit Address",
    save: "Save",
    delete: "Delete",
    noChanges: "No changes detected in the address.",
    nameEmpty: "Name cannot be empty",
    emailEmpty: "Email cannot be empty",
  },
  hi: {
    profile: "प्रोफ़ाइल",
    seeAllOrders: "सभी आदेश देखें",
    personalInfo: "व्यक्तिगत जानकारी",
    name: "नाम",
    email: "ईमेल",
    phone: "फ़ोन",
    edit: "संपादित करें",
    addEmail: "ईमेल जोड़ें",
    addresses: "पते",
    street: "सड़क",
    city: "शहर",
    state: "राज्य",
    pincode: "पिनकोड",
    landmark: "लैंडमार्क",
    addAddress: "नया पता जोड़ें",
    editAddress: "पता संपादित करें",
    save: "सहेजें",
    delete: "हटाएं",
    noChanges: "पते में कोई बदलाव नहीं हुआ।",
    nameEmpty: "नाम खाली नहीं हो सकता",
    emailEmpty: "ईमेल खाली नहीं हो सकता",
  },
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
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  })

  const { language } = useLanguage()
  const t = texts[language] // Translation object for current language

  useEffect(() => {
    const token = getToken()
    if (status === "idle" && token) {
      dispatch(fetchUserInfo())
    }
  }, [dispatch, status])

  if (!user) {
    return <LoadingUI />
  }

  const handleUpdateName = () => {
    if (newName.trim() === "") {
      toast.info(t.nameEmpty)
      return
    }
    dispatch(updateUserById({ id: user._id!, userData: { name: newName } }))
    setEditingName(false)
  }

  const handleUpdateEmail = () => {
    if (newEmail.trim() === "") {
      toast.error(t.emailEmpty)
      return
    }
    dispatch(updateUserById({ id: user._id!, userData: { email: newEmail } }))
    setNewEmail("")
  }

  const handleAddAddress = () => {
    if (user.addresses) {
      dispatch(updateUserById({ id: user._id!, userData: { addresses: [...user.addresses, newAddress] } }))
    } else {
      dispatch(updateUserById({ id: user._id!, userData: { addresses: [newAddress] } }))
    }
    setNewAddress({ street: "", city: "", state: "", pincode: "", landmark: "" })
    setIsAddingAddress(false)
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-4 relative">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">{t.profile}</h1>
        <Link href="/profile/my-orders">
          <Button>{t.seeAllOrders}</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t.personalInfo}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>{t.name}</Label>
              <div className="flex items-center space-x-2">
                <Input value={user.name} readOnly />
                <Dialog open={editingName} onOpenChange={() => setEditingName(!editingName)}>
                  <DialogTrigger asChild>
                    <Button variant="outline">{t.edit}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t.edit}</DialogTitle>
                    </DialogHeader>
                    <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t.name} />
                    <Button onClick={handleUpdateName}>{t.save}</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div>
              <Label>{t.email}</Label>
              {user.email ? (
                <Input disabled value={user.email} readOnly />
              ) : (
                <div className="flex items-center space-x-2">
                  <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder={t.email} />
                  <Button onClick={handleUpdateEmail}>{t.addEmail}</Button>
                </div>
              )}
            </div>
            <div>
              <Label>{t.phone}</Label>
              <Input disabled value={user.phone ?? ""} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <h3>{t.addresses}</h3>
              <Dialog open={isAddingAddress} onOpenChange={() => setIsAddingAddress(!isAddingAddress)}>
                <DialogTrigger asChild>
                  <button type="button">
                    <CirclePlus strokeWidth={1.5} size={20} />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.addAddress}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      placeholder={t.street}
                    />
                    <Input
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      placeholder={t.city}
                    />
                    <Input
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      placeholder={t.state}
                    />
                    <Input
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      placeholder={t.pincode}
                    />
                    <Input
                      value={newAddress.landmark}
                      onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                      placeholder={t.landmark}
                    />
                    <Button onClick={handleAddAddress}>{t.addAddress}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.addresses?.map((address, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} - {address.pincode}
                </p>
                {address.landmark && <p>{t.landmark}: {address.landmark}</p>}
                <Button variant="destructive">{t.delete}</Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
