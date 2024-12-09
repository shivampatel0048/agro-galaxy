"use client";

import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/constants/context/LanguageProvider";
import Image from "next/image";

const products = [
  {
    name: { en: "Smart Irrigation System", hi: "स्मार्ट सिंचाई प्रणाली" },
    description: {
      en: "Automated water management for optimal crop growth",
      hi: "बेहतर फसल वृद्धि के लिए स्वचालित जल प्रबंधन",
    },
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    price: { en: "$35.99", hi: "₹2,999" },
    shipping: { en: "Shipped in 3-4 days", hi: "3-4 दिनों में भेजा जाएगा" },
  },
  {
    name: { en: "Soil Analysis Kit", hi: "मिट्टी विश्लेषण किट" },
    description: {
      en: "Professional-grade soil testing equipment",
      hi: "पेशेवर-ग्रेड मिट्टी परीक्षण उपकरण",
    },
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    price: { en: "$45.99", hi: "₹3,699" },
    shipping: { en: "Shipped in 5-7 days", hi: "5-7 दिनों में भेजा जाएगा" },
  },
  // Add other products similarly
];

const Page = () => {
  const { language } = useLanguage();

  return (
    <Section id="products" className="bg-background py-16">
      <h2 className="text-center text-4xl font-bold text-text-primary md:text-5xl">
        {language === "en" ? "Featured Products" : "विशेष उत्पाद"}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
        {language === "en"
          ? "Discover our range of innovative agricultural solutions designed to enhance your farming operations."
          : "हमारे अभिनव कृषि समाधान देखें जो आपकी खेती को बेहतर बनाते हैं।"}
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg"
          >
            <div className="relative h-48 w-full overflow-hidden sm:h-56 md:h-64 lg:h-72">
              <Image
                src={product.image}
                alt={product.name[language]}
                height={400}
                width={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name[language]}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {product.shipping[language]}
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {product.price[language]}
              </p>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-between items-center">
                <button className="flex items-center justify-center w-full sm:w-1/2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                  🛒 {language === "en" ? "Add Cart" : "कार्ट में जोड़ें"}
                </button>
                <button className="flex items-center justify-center w-full sm:w-1/2 mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition">
                  🛍 {language === "en" ? "Buy" : "खरीदें"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Page;
