"use client";

import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { useLanguage } from "@/constants/context/LanguageProvider";

const products = [
  {
    name: { en: "Smart Irrigation System", hi: "स्मार्ट सिंचाई प्रणाली" },
    description: {
      en: "Automated water management for optimal crop growth",
      hi: "बेहतर फसल वृद्धि के लिए स्वचालित पानी प्रबंधन",
    },
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    price: "$35.99",
    shipping: { en: "Shipped in 3-4 days", hi: "3-4 दिनों में भेजा गया" },
  },
  {
    name: { en: "Soil Analysis Kit", hi: "मिट्टी विश्लेषण किट" },
    description: {
      en: "Professional-grade soil testing equipment",
      hi: "पेशेवर-स्तर की मिट्टी परीक्षण उपकरण",
    },
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    price: "$45.99",
    shipping: { en: "Shipped in 5-7 days", hi: "5-7 दिनों में भेजा गया" },
  },
  {
    name: { en: "Drone Mapping Solution", hi: "ड्रोन मैपिंग समाधान" },
    description: {
      en: "Advanced aerial crop monitoring system",
      hi: "उन्नत हवाई फसल निगरानी प्रणाली",
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    price: "$99.99",
    shipping: { en: "Shipped in 7-10 days", hi: "7-10 दिनों में भेजा गया" },
  },
  {
    name: { en: "Weather Monitoring Device", hi: "मौसम निगरानी उपकरण" },
    description: {
      en: "Track weather patterns in real-time",
      hi: "वास्तविक समय में मौसम के पैटर्न को ट्रैक करें",
    },
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    price: "$55.99",
    shipping: { en: "Shipped in 2-3 days", hi: "2-3 दिनों में भेजा गया" },
  },
];

export const ProductsSection = () => {
  const { language } = useLanguage();

  return (
    <Section id="products" className="bg-background py-16">
      <h2 className="text-center text-4xl font-bold text-text-primary md:text-5xl">
        {language === "hi" ? "प्रमुख उत्पाद" : "Featured Products"}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
        {language === "hi"
          ? "आधुनिक कृषि के लिए हमारे अभिनव समाधानों को खोजें।"
          : "Discover our range of innovative agricultural solutions designed to enhance your farming operations."}
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, idx) => (
          <div
            key={product.name.en + idx}
            className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg"
          >
            {/* Product Image */}
            <div className="relative h-48 w-full overflow-hidden sm:h-56 md:h-64 lg:h-72">
              <Image
                src={product.image}
                alt={product.name[language]}
                height={400}
                width={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name[language]}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {product.shipping[language]}
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {product.price}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-between items-center">
                <button className="flex items-center justify-center w-full sm:w-1/2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                  {language === "hi" ? "🛒 कार्ट में जोड़ें" : "🛒 Add Cart"}
                </button>
                <button className="flex items-center justify-center w-full sm:w-1/2 mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition">
                  {language === "hi" ? "🛍 खरीदें" : "🛍 Buy"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
