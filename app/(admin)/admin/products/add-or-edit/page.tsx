"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import dynamic from "next/dynamic"
import Image from "next/image"
import { CirclePlus, ImageIcon } from "lucide-react"
import type { Product } from "@/types"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addNewProduct, fetchProductById, fetchProducts, updateExistingProduct } from "@/redux/features/ProductSlice"
import Imagekit from "@/components/admin/Imagekit"
import { useRouter, useSearchParams } from "next/navigation"

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
})

export default function ProductsPage() {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const searchParams = useSearchParams()
    const id = searchParams.get("id") ?? null
    const hiddenFileInput = useRef<HTMLDivElement | null>(null)
    const [preview, setPreview] = useState<string>('')
    const [product, setProduct] = useState<Product>({
        _id: "",
        title: { en: "", hi: "" },
        description: { en: "", hi: "" },
        moreDetails: { en: "", hi: "" },
        price: 0,
        discountPercentage: 0,
        stock: 0,
        brand: "",
        category: { en: "", hi: "" },
        thumbnail: "",
    })

    const { currentProduct } = useAppSelector((state) => state.products)

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id))
        } else {
            setProduct({
                _id: "",
                title: { en: "", hi: "" },
                description: { en: "", hi: "" },
                moreDetails: { en: "", hi: "" },
                price: 0,
                discountPercentage: 0,
                stock: 0,
                brand: "",
                category: { en: "", hi: "" },
                thumbnail: "",
            })
        }
    }, [id])

    useEffect(() => {
        if (currentProduct && id) {
            const { __v, ...productWithoutId } = currentProduct
            const productToSave = { ...productWithoutId }
            setProduct(productToSave)
            setPreview(productToSave.thumbnail)
        }
    }, [currentProduct, id])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        const keys = name.split(".")

        setProduct((prev) => {
            if (keys.length === 2) {
                const [parentKey, childKey] = keys
                if (
                    parentKey in prev &&
                    typeof prev[parentKey as keyof Product] === "object" &&
                    prev[parentKey as keyof Product] !== null
                ) {
                    return {
                        ...prev,
                        [parentKey]: {
                            ...(prev[parentKey as keyof Product] as Record<string, any>),
                            [childKey]: value,
                        },
                    }
                }
            }

            return { ...prev, [name]: value }
        })
    }
    const handleJoditChange = (field: "en" | "hi") => (content: string) => {
        setProduct((prev) => ({
            ...prev,
            moreDetails: { ...prev.moreDetails, [field]: content },
        }))
    }
    const triggerFileInput = () => {
        if (hiddenFileInput.current) {
            const inputElement = hiddenFileInput.current.querySelector("input[type='file']") as HTMLInputElement
            if (inputElement) {
                inputElement.click()
            }
        }
    }

    const handleUploadSuccess = (res: any) => {
        const imgUrl: string = res.url
        setPreview(imgUrl)
        setProduct((prev) => ({ ...prev, thumbnail: imgUrl }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (product.thumbnail === '') {
            return toast.error("Please upload the image first.")
        }

        try {
            const { _id, ...productData } = product
            // Include all product data including the thumbnail
            const productToSave = {
                ...productData,
                thumbnail: preview || product.thumbnail // Use preview if available, fallback to existing thumbnail
            }

            if (product._id === '') {
                await dispatch(addNewProduct(productToSave))
                await dispatch(fetchProducts());

                toast.success("Product Saved", {
                    description: "The product has been successfully saved.",
                })
            } else {
                if (!_id) return;
                await dispatch(updateExistingProduct({
                    id: _id,
                    productData: productToSave // Send complete product data including thumbnail
                }));
                await dispatch(fetchProducts());

                toast.success("Product Updated", {
                    description: "The product has been successfully updated.",
                })
            }
            router.back();
        } catch (error) {
            toast.error("Error", {
                description: "Failed to save the product. Please try again.",
            })
            console.error("Error saving product:", error)
        }
    }

    console.log({ currentProduct, product })

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Product Management</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="title.en">Title (English)</Label>
                        <Input id="title.en" name="title.en" value={product.title.en} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="title.hi">Title (Hindi)</Label>
                        <Input id="title.hi" name="title.hi" value={product.title.hi} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="description.en">Description (English)</Label>
                        <Textarea
                            id="description.en"
                            name="description.en"
                            value={product.description.en}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="description.hi">Description (Hindi)</Label>
                        <Textarea
                            id="description.hi"
                            name="description.hi"
                            value={product.description.hi}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <Label htmlFor="moreDetails.en">More Details (English)</Label>
                        <JoditEditor value={product?.moreDetails?.en ?? ''} onChange={handleJoditChange("en")} tabIndex={-1} />
                    </div>
                    <div>
                        <Label htmlFor="moreDetails.hi">More Details (Hindi)</Label>
                        <JoditEditor value={product?.moreDetails?.hi ?? ''} onChange={handleJoditChange("hi")} tabIndex={-1} />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" min={1} name="price" type="number" value={product.price} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <Label htmlFor="discountPercentage">Discount Percentage</Label>
                        <Input
                            id="discountPercentage"
                            name="discountPercentage"
                            type="number"
                            min={1}
                            value={product.discountPercentage}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="stock">Stock</Label>
                        <Input id="stock" min={1} name="stock" type="number" value={product.stock} onChange={handleInputChange} required />
                    </div>
                </div>
                <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" name="brand" value={product.brand} onChange={handleInputChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="category.en">Category (English)</Label>
                        <Input
                            id="category.en"
                            name="category.en"
                            value={product.category.en}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="category.hi">Category (Hindi)</Label>
                        <Input
                            id="category.hi"
                            name="category.hi"
                            value={product.category.hi}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="border rounded-3xl sm:p-4 text-center w-full md:w-[40%] flex flex-col">
                    {preview ? (
                        <>
                            <div className="relative inline-block">
                                <Image
                                    src={preview ?? product?.thumbnail}
                                    alt="Preview"
                                    className="mx-auto max-w-[16rem] sm:max-w-[19rem] max-h-[16rem] sm:max-h-[19rem] object-contain"
                                    width={500}
                                    height={500}
                                />
                                <button
                                    type="button"
                                    className="absolute -top-1 -right-1 bg-white rounded-full hover:rotate-180 transition hover:scale-110 transform focus:outline-none rotate-45"
                                    onClick={() => {
                                        setPreview('')
                                        setProduct((prev) => ({ ...prev, thumbnail: "" }))
                                    }}
                                >
                                    <CirclePlus className="text-blueCustom size-4 sm:size-5" />
                                </button>
                            </div>
                            <Label
                                onClick={triggerFileInput}
                                className="mt-4 inline-block cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                            >
                                Change image
                            </Label>
                        </>
                    ) : (
                        <>
                            <div
                                onClick={triggerFileInput}
                                className="cursor-pointer w-full aspect-square max-w-[300px] mx-auto flex items-center justify-center border-2 border-dashed rounded-lg"
                            >
                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <Label
                                onClick={triggerFileInput}
                                className="mt-4 inline-block cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                            >
                                Choose file
                            </Label>
                        </>
                    )}
                    {/* ImageKit Component */}
                    <div style={{ display: 'none' }} ref={hiddenFileInput}>
                        <Imagekit id="attachment" onSuccess={handleUploadSuccess} />
                    </div>
                </div>
                <Button type="submit">Save Product</Button>
            </form>
        </div>
    )
}