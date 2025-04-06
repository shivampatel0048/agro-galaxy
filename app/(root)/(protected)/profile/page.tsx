"use client"

import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { fetchUserInfo, updateUserById } from "@/redux/features/userSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CirclePlus,
  PencilLine,
  Trash2,
  MapPin,
  User,
  Mail,
  Phone,
  Package,
  AlertTriangle,
  Home
} from "lucide-react"
import { toast } from "sonner"
import { getToken } from "@/utils/tokenUtils"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageProvider"
import LoadingUI from "@/components/loaders/LoadingUI"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

// Translations for English and Hindi (excluding isDefault related texts)
const texts = {
  en: {
    profile: "Profile",
    seeAllOrders: "View Orders",
    personalInfo: "Personal Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    edit: "Edit",
    addEmail: "Add Email",
    addresses: "Delivery Addresses",
    street: "Street Address",
    city: "City",
    state: "State",
    pincode: "Pincode",
    landmark: "Landmark",
    addAddress: "Add New Address",
    editAddress: "Edit Address",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    confirmDelete: "Confirm Delete",
    deleteAddressTitle: "Delete Address",
    deleteAddressDescription: "Are you sure you want to delete this address? This action cannot be undone.",
    noAddresses: "No addresses saved yet",
    noAddressesDescription: "Add your delivery addresses to speed up the checkout process",
    requiredField: "This field is required",
    addressUpdated: "Address updated successfully",
    addressAdded: "New address added successfully",
    addressDeleted: "Address deleted successfully",
    noChanges: "No changes detected in the address",
    nameEmpty: "Name cannot be empty",
    emailEmpty: "Email cannot be empty"
  },
  hi: {
    profile: "प्रोफ़ाइल",
    seeAllOrders: "आदेश देखें",
    personalInfo: "व्यक्तिगत जानकारी",
    name: "नाम",
    email: "ईमेल",
    phone: "फ़ोन",
    edit: "संपादित करें",
    addEmail: "ईमेल जोड़ें",
    addresses: "डिलीवरी पते",
    street: "सड़क का पता",
    city: "शहर",
    state: "राज्य",
    pincode: "पिनकोड",
    landmark: "लैंडमार्क",
    addAddress: "नया पता जोड़ें",
    editAddress: "पता संपादित करें",
    save: "सहेजें",
    cancel: "रद्द करें",
    delete: "हटाएं",
    confirmDelete: "हटाने की पुष्टि करें",
    deleteAddressTitle: "पता हटाएं",
    deleteAddressDescription: "क्या आप वाकई इस पते को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती है।",
    noAddresses: "अभी तक कोई पता सहेजा नहीं गया",
    noAddressesDescription: "चेकआउट प्रक्रिया को गति देने के लिए अपने डिलीवरी पते जोड़ें",
    requiredField: "यह फ़ील्ड आवश्यक है",
    addressUpdated: "पता सफलतापूर्वक अपडेट किया गया",
    addressAdded: "नया पता सफलतापूर्वक जोड़ा गया",
    addressDeleted: "पता सफलतापूर्वक हटा दिया गया",
    noChanges: "पते में कोई बदलाव नहीं हुआ",
    nameEmpty: "नाम खाली नहीं हो सकता",
    emailEmpty: "ईमेल खाली नहीं हो सकता",
  },
}

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const { user, status } = useAppSelector((state) => state.user)
  const [editingName, setEditingName] = useState<boolean>(false)
  const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false)
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null)
  const [deletingAddressIndex, setDeletingAddressIndex] = useState<number | null>(null)
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [addressForm, setAddressForm] = useState<{
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  }>({
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  const [errors, setErrors] = useState({
    street: false,
    city: false,
    state: false,
    pincode: false
  })

  const { language } = useLanguage()
  const t = texts[language]

  useEffect(() => {
    const token = getToken()
    if (status === "idle" && token) {
      dispatch(fetchUserInfo())
    }
  }, [dispatch, status])

  useEffect(() => {
    if (user) {
      setNewName(user.name || "")
    }
  }, [user])

  if (!user) {
    return <LoadingUI />
  }

  const validateAddressForm = () => {
    const newErrors = {
      street: !addressForm.street.trim(),
      city: !addressForm.city.trim(),
      state: !addressForm.state.trim(),
      pincode: !addressForm.pincode.trim()
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }

  const handleUpdateName = () => {
    if (newName.trim() === "") {
      toast.error(t.nameEmpty)
      return
    }
    dispatch(updateUserById({ id: user._id!, userData: { name: newName } }))
    setEditingName(false)
    toast.success("Name updated successfully")
  }

  const handleUpdateEmail = () => {
    if (newEmail.trim() === "") {
      toast.error(t.emailEmpty)
      return
    }
    dispatch(updateUserById({ id: user._id!, userData: { email: newEmail } }))
    setNewEmail("")
    toast.success("Email updated successfully")
  }

  const handleAddAddress = async () => {
    if (!validateAddressForm()) return;

    try {
      const addresses = [...(user.addresses || [])];
      addresses.push(addressForm);

      await dispatch(updateUserById({
        id: user._id!,
        userData: { addresses }
      })).unwrap(); // Add .unwrap() to handle the promise

      setAddressForm({
        street: "",
        city: "",
        state: "",
        pincode: "",
        landmark: ""
      });
      setIsAddingAddress(false);
      setErrors({ street: false, city: false, state: false, pincode: false });
      toast.success(t.addressAdded);
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Failed to add address');
    }
  };

  const handleEditAddress = () => {
    if (editingAddressIndex === null) return
    if (!validateAddressForm()) return

    const addresses = [...(user.addresses || [])]

    addresses[editingAddressIndex] = addressForm

    dispatch(updateUserById({
      id: user._id!,
      userData: { addresses: addresses }
    }))

    setEditingAddressIndex(null)
    toast.success(t.addressUpdated)
  }

  const handleDeleteAddress = () => {
    if (deletingAddressIndex === null) return

    const updatedAddresses = [...(user.addresses || [])]
    updatedAddresses.splice(deletingAddressIndex, 1)

    dispatch(updateUserById({
      id: user._id!,
      userData: { addresses: updatedAddresses }
    }))

    setDeletingAddressIndex(null)
    toast.success(t.addressDeleted)
  }

  const openEditAddressModal = (index: number) => {
    const address = user.addresses![index];
    setAddressForm({
      ...address,
      landmark: address.landmark || ''
    });
    setEditingAddressIndex(index);
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 relative">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">{t.profile}</h1>
        <Link href="/profile/my-orders">
          <Button variant="outline" className="flex items-center gap-2">
            <Package size={16} />
            {t.seeAllOrders}
          </Button>
        </Link>
      </div>

      {/* Personal Information Card */}
      <Card className="mb-8 overflow-hidden border border-gray-100 shadow-sm">
        <CardHeader className="bg-gray-50/50 p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2">
            <User size={18} className="text-gray-500" />
            {t.personalInfo}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* Name Field */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-sm font-medium text-gray-500">{t.name}</Label>
              <div className="col-span-2 flex items-center space-x-2">
                <div className="bg-gray-50 rounded-md px-3 py-2 flex-1 text-gray-800 border border-gray-100">
                  {user.name}
                </div>
                <Dialog open={editingName} onOpenChange={setEditingName}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <PencilLine size={15} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t.edit} {t.name}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={t.name}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setEditingName(false)}>
                        {t.cancel}
                      </Button>
                      <Button onClick={handleUpdateName}>
                        {t.save}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Email Field */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-sm font-medium text-gray-500">{t.email}</Label>
              <div className="col-span-2">
                {user.email ? (
                  <div className="bg-gray-50 rounded-md px-3 py-2 flex items-center gap-2 text-gray-800 border border-gray-100">
                    <Mail size={14} className="text-gray-400" />
                    {user.email}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder={t.email}
                    />
                    <Button onClick={handleUpdateEmail}>
                      {t.addEmail}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-sm font-medium text-gray-500">{t.phone}</Label>
              <div className="col-span-2">
                <div className="bg-gray-50 rounded-md px-3 py-2 flex items-center gap-2 text-gray-800 border border-gray-100">
                  <Phone size={14} className="text-gray-400" />
                  {user.phone || "-"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Addresses Card */}
      <Card className="mb-6 overflow-hidden border border-gray-100 shadow-sm">
        <CardHeader className="bg-gray-50/50 p-4 sm:p-6">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-2 justify-between sm:items-center">
            <CardTitle className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-500" />
              {t.addresses}
            </CardTitle>
            <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setIsAddingAddress(true)}>
                  <CirclePlus size={16} />
                  {t.addAddress}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.addAddress}</DialogTitle>
                  <DialogDescription>
                    Fill in the address details below to add a new delivery address.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">{t.street}</Label>
                    <Input
                      id="street"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      placeholder={t.street}
                      className={errors.street ? "border-red-500" : ""}
                    />
                    {errors.street && <p className="text-xs text-red-500">{t.requiredField}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t.city}</Label>
                      <Input
                        id="city"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        placeholder={t.city}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && <p className="text-xs text-red-500">{t.requiredField}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">{t.state}</Label>
                      <Input
                        id="state"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        placeholder={t.state}
                        className={errors.state ? "border-red-500" : ""}
                      />
                      {errors.state && <p className="text-xs text-red-500">{t.requiredField}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pincode">{t.pincode}</Label>
                      <Input
                        id="pincode"
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        placeholder={t.pincode}
                        className={errors.pincode ? "border-red-500" : ""}
                      />
                      {errors.pincode && <p className="text-xs text-red-500">{t.requiredField}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="landmark">{t.landmark}</Label>
                      <Input
                        id="landmark"
                        value={addressForm.landmark}
                        onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                        placeholder={t.landmark}
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setIsAddingAddress(false);
                      setErrors({ street: false, city: false, state: false, pincode: false });
                      setAddressForm({
                        street: "",
                        city: "",
                        state: "",
                        pincode: "",
                        landmark: ""
                      });
                    }}
                  >
                    {t.cancel}
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleAddAddress}
                    disabled={!addressForm.street || !addressForm.city || !addressForm.state || !addressForm.pincode}
                  >
                    {t.save}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          {(!user.addresses || user.addresses.length === 0) ? (
            <div className="text-center py-8">
              <Home className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-800 mb-1">{t.noAddresses}</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">
                {t.noAddressesDescription}
              </p>
              <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
                <DialogTrigger asChild>
                  <Button>
                    <CirclePlus className="mr-2 h-4 w-4" />
                    {t.addAddress}
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          ) : (
            <div className="grid gap-4">
              {user.addresses?.map((address, index) => (
                <Card key={index} className={cn(
                  "rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all",
                )}>
                  <CardContent className="p-0">
                    <div className="p-4">
                      <p className="font-medium">{address.street}</p>
                      <p className="text-gray-600 text-sm">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      {address.landmark && (
                        <p className="text-gray-500 text-sm mt-1">
                          {t.landmark}: {address.landmark}
                        </p>
                      )}
                    </div>

                    <CardFooter className="border-t border-gray-100 p-3 flex justify-between bg-gray-50/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => openEditAddressModal(index)}
                      >
                        <PencilLine size={14} className="mr-1" />
                        {t.edit}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setDeletingAddressIndex(index)}
                      >
                        <Trash2 size={14} className="mr-1" />
                        {t.delete}
                      </Button>
                    </CardFooter>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Address Dialog */}
      <Dialog
        open={editingAddressIndex !== null}
        onOpenChange={(open) => !open && setEditingAddressIndex(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.editAddress}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-street">{t.street}</Label>
              <Input
                id="edit-street"
                value={addressForm.street}
                onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                placeholder={t.street}
                className={errors.street ? "border-red-500" : ""}
              />
              {errors.street && <p className="text-xs text-red-500">{t.requiredField}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-city">{t.city}</Label>
                <Input
                  id="edit-city"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  placeholder={t.city}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && <p className="text-xs text-red-500">{t.requiredField}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-state">{t.state}</Label>
                <Input
                  id="edit-state"
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  placeholder={t.state}
                  className={errors.state ? "border-red-500" : ""}
                />
                {errors.state && <p className="text-xs text-red-500">{t.requiredField}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-pincode">{t.pincode}</Label>
                <Input
                  id="edit-pincode"
                  value={addressForm.pincode}
                  onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                  placeholder={t.pincode}
                  className={errors.pincode ? "border-red-500" : ""}
                />
                {errors.pincode && <p className="text-xs text-red-500">{t.requiredField}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-landmark">{t.landmark}</Label>
                <Input
                  id="edit-landmark"
                  value={addressForm.landmark}
                  onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                  placeholder={t.landmark}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditingAddressIndex(null)
                setErrors({ street: false, city: false, state: false, pincode: false })
              }}
            >
              {t.cancel}
            </Button>
            <Button onClick={handleEditAddress}>
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Address Confirmation */}
      <AlertDialog
        open={deletingAddressIndex !== null}
        onOpenChange={(open) => !open && setDeletingAddressIndex(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              {t.deleteAddressTitle}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t.deleteAddressDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAddress}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {t.confirmDelete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
