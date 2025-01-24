"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/constants/context/LanguageProvider";
import { toast } from "sonner";

const Page = () => {
  const { language } = useLanguage();

  const texts = {
    en: {
      heading: "Contact Us",
      description:
        "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      addressTitle: "Address",
      addressContent: [
        "123 Farm Road, Agricultural District",
        "Harvest Valley, CA 95123",
      ],
      emailTitle: "Email",
      emailContent: "contact@agrogalaxy.com",
      phoneTitle: "Phone",
      phoneContent: "(123) 456-7890",
      form: {
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        subjectPlaceholder: "Subject",
        messagePlaceholder: "Your Message",
        submitButton: "Send Message",
      },
      toastMessage: "Message sent!",
      toastDescription: "We'll get back to you as soon as possible.",
    },
    hi: {
      heading: "हमसे संपर्क करें",
      description:
        "क्या आपके पास प्रश्न हैं? हम आपकी बात सुनने के लिए उत्सुक हैं। हमें संदेश भेजें और हम जल्द ही उत्तर देंगे।",
      addressTitle: "पता",
      addressContent: ["123 फ़ार्म रोड, कृषि जिला", "हार्वेस्ट वैली, CA 95123"],
      emailTitle: "ईमेल",
      emailContent: "contact@agrogalaxy.com",
      phoneTitle: "फोन",
      phoneContent: "(123) 456-7890",
      form: {
        namePlaceholder: "आपका नाम",
        emailPlaceholder: "आपका ईमेल",
        subjectPlaceholder: "विषय",
        messagePlaceholder: "आपका संदेश",
        submitButton: "संदेश भेजें",
      },
      toastMessage: "संदेश भेजा गया!",
      toastDescription: "हम जल्द से जल्द आपसे संपर्क करेंगे।",
    },
  };

  const currentTexts = texts[language] || texts.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(currentTexts.toastMessage, {
      description: currentTexts.toastDescription,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <Section className="py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Details Section */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-indigo-800 animate-fade-in mb-6">
              {currentTexts.heading}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentTexts.description}
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <span className="text-indigo-700 text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-800">
                    {currentTexts.addressTitle}
                  </h3>
                  {currentTexts.addressContent.map((line, idx) => (
                    <p key={idx} className="text-gray-700">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <span className="text-indigo-700 text-xl">📧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-800">
                    {currentTexts.emailTitle}
                  </h3>
                  <p className="text-gray-700">{currentTexts.emailContent}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <span className="text-indigo-700 text-xl">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-800">
                    {currentTexts.phoneTitle}
                  </h3>
                  <p className="text-gray-700">{currentTexts.phoneContent}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white shadow-lg rounded-lg p-8 animate-slide-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder={currentTexts.form.namePlaceholder}
                required
                className="rounded-lg border-gray-300 focus:ring-indigo-500"
              />
              <Input
                type="email"
                placeholder={currentTexts.form.emailPlaceholder}
                required
                className="rounded-lg border-gray-300 focus:ring-indigo-500"
              />
              <Input
                placeholder={currentTexts.form.subjectPlaceholder}
                required
                className="rounded-lg border-gray-300 focus:ring-indigo-500"
              />
              <Textarea
                placeholder={currentTexts.form.messagePlaceholder}
                className="min-h-[150px] rounded-lg border-gray-300 focus:ring-indigo-500"
                required
              />
              <Button
                type="submit"
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-lg transition-all"
              >
                {currentTexts.form.submitButton}
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Page;
