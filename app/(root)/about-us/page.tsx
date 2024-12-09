"use client";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { useLanguage } from "@/constants/context/LanguageProvider";

const Page = () => {
  const { language } = useLanguage();

  const texts = {
    en: {
      heading: "About Us",
      missionTitle: "Our Mission",
      missionContent:
        "At Agro Galaxy, we're dedicated to revolutionizing agriculture through innovative technology. Our mission is to empower farmers with smart solutions that increase productivity while promoting sustainable farming practices.",
      visionTitle: "Our Vision",
      visionContent:
        "We envision a future where farming is more efficient, sustainable, and profitable through the integration of cutting-edge technology and traditional farming wisdom.",
      stats: [
        { value: "10+", label: "Years Experience" },
        { value: "5000+", label: "Farmers Served" },
        { value: "15+", label: "Countries" },
      ],
    },
    hi: {
      heading: "हमारे बारे में",
      missionTitle: "हमारा मिशन",
      missionContent:
        "एग्रो गैलेक्सी में, हम नवीनतम तकनीकों के माध्यम से कृषि में क्रांति लाने के लिए समर्पित हैं। हमारा मिशन किसानों को स्मार्ट समाधानों के साथ सशक्त बनाना है जो उत्पादकता बढ़ाते हैं और टिकाऊ कृषि को बढ़ावा देते हैं।",
      visionTitle: "हमारा विज़न",
      visionContent:
        "हम एक ऐसे भविष्य की कल्पना करते हैं जहां उन्नत तकनीक और पारंपरिक कृषि ज्ञान का समावेश करके खेती अधिक कुशल, टिकाऊ और लाभदायक हो।",
      stats: [
        { value: "10+", label: "वर्षों का अनुभव" },
        { value: "5000+", label: "सेवा किए गए किसान" },
        { value: "15+", label: "देश" },
      ],
    },
  };

  const currentTexts = texts[language] || texts.en;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Section className="py-16">
        <h1 className="text-center text-5xl font-extrabold text-green-800 mb-12 animate-fadeInUp">
          {currentTexts.heading}
        </h1>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <Image
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
              alt="About Agro Galaxy"
              className="rounded-lg object-cover w-full h-[400px] transform transition duration-500 group-hover:scale-105 group-hover:shadow-lg"
              height={400}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-30 transition duration-500"></div>
          </div>
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-semibold text-green-700">
                {currentTexts.missionTitle}
              </h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {currentTexts.missionContent}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-green-700">
                {currentTexts.visionTitle}
              </h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {currentTexts.visionContent}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {currentTexts.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center transition hover:scale-110 duration-300"
                >
                  <div className="bg-green-100 rounded-lg px-4 py-2">
                    <div className="text-4xl font-extrabold text-green-700">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Page;
