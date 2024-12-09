"use client";

import { Section } from "@/components/ui/Section";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import Image from "next/image";
import { useLanguage } from "@/constants/context/LanguageProvider"; // Assuming you have a LanguageContext

export const SubscriptionSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [updates, setUpdates] = useState("all");
  const [isFarmer, setIsFarmer] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage(); // Get current language

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title:
        language === "hi"
          ? "सफलतापूर्वक सदस्यता ली!"
          : "Successfully Subscribed!",
      description:
        language === "hi"
          ? "हमारे समुदाय में शामिल होने के लिए धन्यवाद।"
          : "Thank you for joining our community.",
    });
    setEmail("");
    setName("");
    setUpdates("all");
    setIsFarmer(false);
  };

  return (
    <Section className="bg-gradient-to-r from-green-600 to-green-800 py-12 lg:py-16 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative h-[400px] lg:h-[450px] overflow-hidden rounded-lg shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt={language === "hi" ? "अपडेटेड रहें" : "Stay Updated"}
            className="h-full w-full object-cover rounded-lg"
            width={800}
            height={800}
          />
        </div>

        {/* Left-aligned Text and Form Section */}
        <div className="flex flex-col justify-center px-6 mb-36 lg:px-24">
          {/* Left-aligned text */}
          <div className="text-left mb-12">
            <h2 className="text-4xl font-extrabold text-white leading-tight md:text-5xl">
              {language === "hi" ? "अपडेटेड रहें" : "Stay Updated"}
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              {language === "hi"
                ? "विशेष अपडेट और प्रारंभिक लॉन्च ऑफ़र के लिए साइन अप करें!"
                : "Sign up for exclusive updates and early launch offers!"}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 bg-white shadow-lg p-8 rounded-lg border border-gray-300 max-w-md mx-auto"
          >
            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                {language === "hi" ? "आपका नाम" : "Your Name"}
              </label>
              <Input
                id="name"
                type="text"
                placeholder={
                  language === "hi" ? "अपना नाम दर्ज करें" : "Enter your name"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary text-gray-700 shadow-md w-full"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                {language === "hi" ? "आपका ईमेल" : "Your Email"}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={
                  language === "hi" ? "अपना ईमेल दर्ज करें" : "Enter your email"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary text-gray-700 shadow-md w-full"
              />
            </div>

            {/* Updates Selection */}
            <div className="space-y-2">
              <label
                htmlFor="updates"
                className="text-sm font-semibold text-gray-700"
              >
                {language === "hi" ? "अपडेट्स का चयन करें" : "Select Updates"}
              </label>
              <div className="relative">
                <select
                  value={updates}
                  onChange={(e) => setUpdates(e.target.value)}
                  className="p-4 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary bg-white text-gray-800 shadow-sm transition duration-300 ease-in-out hover:border-primary focus:outline-none pr-10"
                >
                  <option value="all">
                    {language === "hi" ? "सभी अपडेट्स" : "All Updates"}
                  </option>
                  <option value="products">
                    {language === "hi" ? "उत्पाद अपडेट्स" : "Product Updates"}
                  </option>
                  <option value="news">
                    {language === "hi"
                      ? "समाचार और ब्लॉग पोस्ट"
                      : "News & Blog Posts"}
                  </option>
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  &#9660;
                </span>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="farmer"
                checked={isFarmer}
                onCheckedChange={(checked) => setIsFarmer(checked as boolean)}
              />
              <label htmlFor="farmer" className="text-sm text-gray-600">
                {language === "hi"
                  ? "मैं सिफारिशों के लिए एक किसान हूँ"
                  : "I am a farmer looking for recommendations"}
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition ease-in-out duration-300"
            >
              {language === "hi" ? "अब सदस्यता लें" : "Subscribe Now"}
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};
