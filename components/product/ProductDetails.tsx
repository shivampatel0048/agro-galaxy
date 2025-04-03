"use client"

import { useLanguage } from "@/context/LanguageProvider"
import { fetchProductById } from "@/redux/features/ProductSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { addReview, removeReview } from "@/redux/features/reviewSlice"
import { addToCart, fetchCart } from "@/redux/features/cartSlice"
import { timeAgo } from "@/lib/utils"
import { getUserId } from "@/utils/userUtils"
import { getToken } from "@/utils/tokenUtils"
import { useRouter } from "next/navigation"
import LoadingUI from "../loaders/LoadingUI"

const ProductDetails: React.FC<{ id: string }> = ({ id }) => {
    const dispatch = useAppDispatch();
    const mainUserId = getUserId() ?? null;
    const router = useRouter();
    const token = getToken();
    const { currentProduct: product } = useAppSelector((state) => state.products)
    const { language } = useLanguage()
    const [userRating, setUserRating] = useState(0)
    const [userReview, setUserReview] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id))
        }
    }, [id, dispatch])

    if (!product) {
        return <LoadingUI />
    }

    const discountedPrice = product.price - (product.price * product.discountPercentage) / 100

    const handleRatingClick = (rating: number) => {
        setUserRating(rating)
    }

    const handleReviewSubmit = async () => {
        if (userRating === 0) {
            toast.info('Please select a rating before submitting your review.')
            return
        }

        setIsSubmitting(true)
        try {
            const res = await dispatch(
                addReview({
                    productId: id,
                    rating: userRating,
                    review: userReview,
                }),
            ).unwrap()
            if (res) {
                toast.success('Your review has been submitted successfully.')
                setUserRating(0)
                setUserReview("")
                dispatch(fetchProductById(id))
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAddToCart = () => {
        if (!token) {
            toast.info('Please sign in to add item to cart')
            router.push('/sign-in')
        }

        const cartItemData = {
            productId: id,
            quantity: 1,
        };

        dispatch(addToCart(cartItemData))
            .unwrap()
            .then(() => {
                dispatch(fetchCart());
            })
            .catch((error) => {
                console.error("Failed to add item to cart:", error);
            });
    };

    const handleBuyNow = (productName: string) => {
        console.log(`Purchased: ${productName}`);
    };

    const handleRemoveReview = async (reviewId: string) => {

        try {
            await dispatch(removeReview(reviewId))
        } catch (error) {
            console.error('Error removing review:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-5xl mx-auto">
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl font-bold mb-2">{product.title[language]}</CardTitle>
                            <CardDescription>{product.description[language]}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-lg">
                            {product.category[language]}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Image
                                src={product.thumbnail || "/placeholder.svg"}
                                alt={product.title[language]}
                                width={400}
                                height={400}
                                className="rounded-lg object-cover w-full max-h-[21rem] h-auto"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex-1">
                                <div className="flex flex-col items-start space-x-2">
                                    <span className="text-3xl font-bold">₹{discountedPrice.toFixed(2)}</span>
                                    {product.discountPercentage > 0 && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xl text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
                                            <Badge variant="destructive">{product.discountPercentage}% OFF</Badge>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <StarIcon className="text-yellow-400" />
                                    <span>{product?.averageRating?.toFixed(1)}</span>
                                    <span className="text-gray-500">({product?.reviews?.length} reviews)</span>
                                </div>
                                <div>
                                    <span className="font-semibold">Brand:</span> {product.brand}
                                </div>
                                <div>
                                    <span className="font-semibold">Description:</span> {product.description[language]}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between items-center">
                                <button
                                    className="flex flex-1 items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                                    onClick={handleAddToCart}
                                >
                                    🛒 {language === "en" ? "Add Cart" : "कार्ट में जोड़ें"}
                                </button>

                                <button
                                    className="flex flex-1 items-center justify-center w-full mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
                                    onClick={() => handleBuyNow}
                                >
                                    🛍 {language === "en" ? "Buy" : "खरीदें"}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <Separator className="my-6" /> */}
                    {/* Uncomment and implement when moreDetails is available */}
                    {product?.moreDetails &&
                        <>
                            <div className="mt-6">
                                <span className="font-semibold">More Details:</span>
                                <div dangerouslySetInnerHTML={{ __html: product.moreDetails[language] }} />
                            </div>
                            <Separator className="my-6" />
                        </>
                    }
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                        {product?.reviews && product?.reviews?.length > 0 ? (
                            <div className="space-y-4">
                                {product?.reviews?.slice()?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())?.map((review: any) => (
                                    <div key={review._id} className="relative">
                                        <Card className="group">
                                            <CardContent className="p-4">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarIcon
                                                                key={i}
                                                                className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="font-semibold">{review.rating}/5</span>
                                                </div>
                                                <p>{review.review}</p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    By {review.userId.name} on {timeAgo(review.createdAt)}
                                                </p>
                                            </CardContent>
                                            {mainUserId && review?.userId?.id && (mainUserId === review?.userId?.id) && <Button onClick={() => handleRemoveReview(review._id)} type="button" variant='ghost' size='icon' className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 hover:bg-red-50 duration-300">
                                                <Trash2 strokeWidth={1.5} />
                                            </Button>}
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>

                    {token && <Separator className="my-6" />}
                    {token && <div>
                        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        className={`cursor-pointer ${star <= userRating ? "text-yellow-400" : "text-gray-300"}`}
                                        onClick={() => handleRatingClick(star)}
                                    />
                                ))}
                            </div>
                            <Textarea
                                placeholder="Write your review here..."
                                value={userReview}
                                rows={5}
                                onChange={(e) => setUserReview(e.target.value)}
                            />
                            <Button onClick={handleReviewSubmit} disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </Button>
                        </div>
                    </div>}
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductDetails