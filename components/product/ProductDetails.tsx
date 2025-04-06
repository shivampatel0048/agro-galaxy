"use client"

import { useLanguage } from "@/context/LanguageProvider"
import { fetchProductById } from "@/redux/features/ProductSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
import Image from "next/image"
import { StarIcon, ShoppingCart, ShoppingBag, Trash2, Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { addReview, removeReview } from "@/redux/features/reviewSlice"
import { addToCart, fetchCart } from "@/redux/features/cartSlice"
import { getUserId } from "@/utils/userUtils"
import { getToken } from "@/utils/tokenUtils"
import { useRouter } from "next/navigation"
import LoadingUI from "../loaders/LoadingUI"
import { cn, timeAgo } from "@/lib/utils"
import { Textarea } from "../ui/textarea"

const ProductDetails = ({ id }: { id: string }) => {
    const dispatch = useAppDispatch();
    const mainUserId = getUserId() ?? null;
    const router = useRouter();
    const token = getToken();
    const { currentProduct: product } = useAppSelector((state) => state.products)
    const { language } = useLanguage()
    const [userRating, setUserRating] = useState(0)
    const [userReview, setUserReview] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isWishListed, setIsWishListed] = useState(false)
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isBuyingNow, setIsBuyingNow] = useState(false);

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

    const handleAddToCart = async () => {
        if (!token) {
            toast.info('Please sign in to add item to cart')
            router.push('/sign-in')
            return;
        }

        setIsAddingToCart(true);
        const cartItemData = {
            productId: id,
            quantity: 1,
        };

        try {
            await dispatch(addToCart(cartItemData)).unwrap();
            await dispatch(fetchCart());
        } catch (error) {
            console.error("Failed to add item to cart:", error);
            toast.error("Failed to add item to cart");
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        if (!token) {
            toast.info('Please sign in to proceed with purchase')
            router.push('/sign-in')
            return;
        }

        setIsBuyingNow(true);
        try {
            await handleAddToCart();
            router.push('/checkout');
        } catch (error) {
            console.error("Failed to process buy now:", error);
            toast.error("Failed to process purchase");
        } finally {
            setIsBuyingNow(false);
        }
    };

    const handleRemoveReview = async (reviewId: string) => {
        try {
            await dispatch(removeReview(reviewId));
            toast.success('Review removed successfully');
        } catch (error) {
            console.error('Error removing review:', error);
            toast.error('Failed to remove review');
        }
    };

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
                <span>{language === "en" ? "Home" : "होम"}</span>
                <span className="mx-2">&gt;</span>
                <span>{product.category[language]}</span>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">{product.title[language]}</span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Product Image Section */}
                    <div className="relative h-[20rem] md:h-[500px] bg-gray-50 flex items-center justify-center border-r border-gray-100 rounded-lg">
                        <Image
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.title[language]}
                            width={500}
                            height={500}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>

                    {/* Product Details Section */}
                    <div className="p-3 sm:p-5 md:p-6 lg:p-8 flex flex-col">
                        <div className="mb-2">
                            <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 mb-4">
                                {product.category[language]}
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title[language]}</h1>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.round(product?.averageRating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product?.averageRating?.toFixed(1)} ({product?.reviews?.length || 0} {language === "en" ? "reviews" : "समीक्षाएँ"})
                                </span>
                                <span className="text-sm text-gray-500">|</span>
                                <span className="text-sm text-gray-600">{product.brand}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">{product.description[language]}</p>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl font-bold text-gray-900">₹{discountedPrice.toFixed(0)}</span>
                                {product.discountPercentage > 0 && (
                                    <>
                                        <span className="text-lg text-gray-500 line-through">₹{product.price.toFixed(0)}</span>
                                        <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-100 text-green-800">
                                            {product.discountPercentage}% {language === "en" ? "OFF" : "छूट"}
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="text-gray-500 text-sm">
                                {language === "en" ? "Inclusive of all taxes" : "सभी करों सहित"}
                            </p>
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                size="lg"
                                type="button"
                                className="rounded-full font-medium"
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                            >
                                {isAddingToCart ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                )}
                                {language === "en" ? "Add to Cart" : "कार्ट में जोड़ें"}
                            </Button>
                            <Button
                                variant="default"
                                size="lg"
                                type="button"
                                className="rounded-full font-medium bg-purple-600 hover:bg-purple-700"
                                onClick={handleBuyNow}
                                disabled={isBuyingNow}
                            >
                                {isBuyingNow ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                )}
                                {language === "en" ? "Buy Now" : "अभी खरीदें"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Product Information Tabs */}
                <div className="border-t border-gray-100">
                    <Tabs defaultValue="details" className="p-3 sm:p-5 md:p-6 lg:p-8">
                        <TabsList className="mb-6 bg-gray-100">
                            <TabsTrigger value="details">{language === "en" ? "Product Details" : "उत्पाद विवरण"}</TabsTrigger>
                            <TabsTrigger value="reviews">{language === "en" ? "Reviews" : "समीक्षाएँ"}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="focus-visible:outline-none">
                            {product?.moreDetails && (
                                <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
                                    <div dangerouslySetInnerHTML={{ __html: product.moreDetails[language] }} />
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="reviews" className="space-y-6 focus-visible:outline-none">
                            {/* Reviews Container */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium">
                                    {language === "en" ? "Customer Reviews" : "ग्राहक समीक्षाएँ"}
                                </h3>

                                {product?.reviews && product?.reviews?.length > 0 ? (
                                    <div className="space-y-4">
                                        {product?.reviews
                                            ?.slice()
                                            ?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                            ?.map((review: any) => (
                                                <div key={review._id} className="relative p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 group">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <StarIcon
                                                                    key={i}
                                                                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="font-medium text-sm">{review.rating}/5</span>
                                                    </div>
                                                    <p className="text-gray-700 mb-2">{review.review}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {language === "en" ? "By" : "द्वारा"} <span className="font-medium">{review.userId.name}</span> • {timeAgo(review.createdAt)}
                                                    </p>

                                                    {mainUserId && review?.userId?.id && (mainUserId === review?.userId?.id) && (
                                                        <Button
                                                            onClick={() => handleRemoveReview(review._id)}
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">
                                        {language === "en" ? "No reviews yet. Be the first to review this product." : "अभी तक कोई समीक्षा नहीं। इस उत्पाद की समीक्षा करने वाले पहले व्यक्ति बनें।"}
                                    </p>
                                )}
                            </div>

                            {/* Review Form */}
                            {token && (
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h3 className="text-lg font-medium mb-4">
                                        {language === "en" ? "Write a Review" : "समीक्षा लिखें"}
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="mb-2 text-sm">
                                                {language === "en" ? "Your Rating" : "आपकी रेटिंग"}
                                            </p>
                                            <div className="flex items-center space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => handleRatingClick(star)}
                                                        className="p-1 transition-all duration-200"
                                                    >
                                                        <StarIcon
                                                            className={`h-6 w-6 cursor-pointer transition-colors ${star <= userRating
                                                                ? "text-yellow-400 fill-yellow-400"
                                                                : "text-gray-300 hover:text-gray-400"
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="mb-2 text-sm">
                                                {language === "en" ? "Your Review" : "आपकी समीक्षा"}
                                            </p>
                                            <Textarea
                                                placeholder={language === "en" ? "Share your experience with this product..." : "इस उत्पाद के साथ अपने अनुभव को साझा करें..."}
                                                value={userReview}
                                                rows={4}
                                                className="resize-none"
                                                onChange={(e) => setUserReview(e.target.value)}
                                            />
                                        </div>

                                        <Button
                                            onClick={handleReviewSubmit}
                                            disabled={isSubmitting}
                                            className="rounded-full bg-purple-600 hover:bg-purple-700"
                                        >
                                            {isSubmitting
                                                ? (language === "en" ? "Submitting..." : "प्रस्तुत कर रहे हैं...")
                                                : (language === "en" ? "Submit Review" : "समीक्षा दर्ज करें")}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;