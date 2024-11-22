'use client'

import { useState, useEffect } from "react";
import { Section } from "../ui/Section";
import { Button } from "../ui/button";
import Image from "next/image";

const stats = [
  { label: "Years of Excellence", value: 10 },
  { label: "Farmers Served", value: 5000 },
  { label: "Products Delivered", value: 15000 },
];

export const AboutSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <Section id="about" className="bg-white">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`About us ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                currentImage === index ? "opacity-100" : "opacity-0"
              }`}
              height={800}
              width={800}
            />
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
            Our Story
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We&apos;re passionate about revolutionizing agriculture through innovative
            solutions. Our mission is to empower farmers with the tools they need
            to succeed in modern farming.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {stat.value}+
                </div>
                <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          <Button className="mt-8 self-start">Read Our Full Story</Button>
        </div>
      </div>
    </Section>
  );
};