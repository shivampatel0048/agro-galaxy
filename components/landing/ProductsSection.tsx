import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

const products = [
    {
        name: "Smart Irrigation System",
        description: "Automated water management for optimal crop growth",
        image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    },
    {
        name: "Soil Analysis Kit",
        description: "Professional-grade soil testing equipment",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
        name: "Drone Mapping Solution",
        description: "Advanced aerial crop monitoring system",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
        name: "Smart Irrigation System",
        description: "Automated water management for optimal crop growth",
        image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    },
    {
        name: "Soil Analysis Kit",
        description: "Professional-grade soil testing equipment",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
        name: "Drone Mapping Solution",
        description: "Advanced aerial crop monitoring system",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
];

export const ProductsSection = () => {
    return (
        <Section id="products" className="bg-background">
            <h2 className="text-center text-3xl font-bold text-text-primary md:text-4xl">
                Featured Products
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
                Discover our range of innovative agricultural solutions designed to enhance
                your farming operations
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product, idx) => (
                    <Link
                        key={product.name + idx}
                        href={'/product-details/dhgfh'}
                    >
                        <div
                            key={product.name}
                            className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:-translate-y-1"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    height={400}
                                    width={400}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <Badge className="absolute right-2 top-2 bg-accent text-black">
                                    Coming Soon
                                </Badge>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-text-primary">
                                    {product.name}
                                </h3>
                                <p className="mt-2 text-gray-600">{product.description}</p>
                                <button
                                    disabled
                                    className="mt-4 w-full rounded-md bg-gray-200 px-4 py-2 text-gray-500"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Section>
    );
};