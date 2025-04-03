"use client";

import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageProvider";

const testimonials = [
  {
    name: { en: "John Smith", hi: "जॉन स्मिथ" },
    role: { en: "Organic Farmer", hi: "जैविक किसान" },
    quote: {
      en: "Increased my yield by 30% using their smart irrigation system!",
      hi: "उनकी स्मार्ट सिंचाई प्रणाली का उपयोग करके मेरी उपज 30% बढ़ी!",
    },
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
  {
    name: { en: "Sarah Johnson", hi: "सारा जॉनसन" },
    role: { en: "Commercial Farmer", hi: "व्यावसायिक किसान" },
    quote: {
      en: "The soil analysis kit has revolutionized our farming practices.",
      hi: "मिट्टी विश्लेषण किट ने हमारी कृषि पद्धतियों में क्रांति ला दी है।",
    },
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  },
  {
    name: { en: "Mike Williams", hi: "माइक विलियम्स" },
    role: { en: "Agricultural Consultant", hi: "कृषि सलाहकार" },
    quote: {
      en: "Best farming technology I've used in my 20 years of experience.",
      hi: "20 वर्षों के अनुभव में मैंने जो सबसे अच्छा कृषि तकनीक उपयोग किया है।",
    },
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
  },
  {
    name: { en: "Emily Davis", hi: "एमीली डेविस" },
    role: { en: "Sustainability Expert", hi: "सततता विशेषज्ञ" },
    quote: {
      en: "The environmental impact of these tools is remarkable!",
      hi: "इन उपकरणों का पर्यावरणीय प्रभाव शानदार है!",
    },
    image: "https://images.unsplash.com/photo-1515150195090-2f3858c9d618",
  },
];

export const TestimonialsSection = () => {
  const { language } = useLanguage();

  return (
    <Section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          {language === "hi"
            ? "किसानों और विशेषज्ञों का कहना है"
            : "What Farmers & Experts Say"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 p-8 rounded-lg shadow-xl transform hover:scale-105 transition duration-500"
            >
              <div className="relative mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-green-600">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name[language]}
                  className="object-cover"
                  width={96}
                  height={96}
                />
              </div>
              <blockquote className="text-lg md:text-xl italic mb-4">
                {`"${testimonial.quote[language]}"`}
              </blockquote>
              <p className="text-xl font-bold">{testimonial.name[language]}</p>
              <p className="text-sm text-gray-600">
                {testimonial.role[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
