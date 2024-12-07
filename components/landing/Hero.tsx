"use client";

import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";

const images = ["/images/farm1.jpg", "/images/farm2.jpg", "/images/farm3.jpg"];

const imageTexts = [
  "खेतों को जब पानी की जरूरत होती है तो आसमान बरसता है या तो आँखें।",
  "आओ हम शुरुआत करे, किसानो का आभार करे।",
  "मै किसान हूँ, खेती करना मेरा कर्म है और भूखे हुए को रोटी खिलाना मेरा धर्म है।",
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative h-full w-full">
        {/* Carousel */}
        {images.map((image, index) => (
          <Transition
            key={index + image}
            show={index === currentIndex}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={`Background ${index + 1}`}
                className="h-full w-full object-cover"
                fill
                priority
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
                <h2 className="text-white text-5xl md:text-5xl font-bold text-center px-4  max-w-2xl leading-relaxed lg:leading-loose">
                  {imageTexts[index]}
                </h2>
              </div>
            </div>
          </Transition>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex justify-between items-center z-20 px-4">
          <button
            className="bg-white/20 text-white hover:bg-white/40 p-2 rounded-full"
            onClick={handlePrev}
            aria-label="Previous Slide"
          >
            &#8592;
          </button>
          <button
            className="bg-white/20 text-white hover:bg-white/40 p-2 rounded-full"
            onClick={handleNext}
            aria-label="Next Slide"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="relative z-30 flex h-full items-center justify-center text-center">
        <div className="container px-4">
          <h1 className="animate-fade-up text-4xl font-bold text-white md:text-6xl">
            Empowering Farmers with the Future of Agriculture
          </h1>
          <p className="mt-6 animate-fade-up text-lg text-white/90 md:text-xl [animation-delay:200ms]">
            Discover innovative tools and solutions for smarter, sustainable
            farming
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("products")}
              className="animate-fade-up [animation-delay:400ms]"
            >
              Explore Products
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("about")}
              className="animate-fade-up text-black hover:text-black [animation-delay:600ms]"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
