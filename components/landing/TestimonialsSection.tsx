'use client'

import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "John Smith",
    role: "Organic Farmer",
    quote: "Increased my yield by 30% using their smart irrigation system!",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
  {
    name: "Sarah Johnson",
    role: "Commercial Farmer",
    quote: "The soil analysis kit has revolutionized our farming practices.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  },
  {
    name: "Mike Williams",
    role: "Agricultural Consultant",
    quote: "Best farming technology I've used in my 20 years of experience.",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
  },
];

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section className="bg-primary text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">What Farmers Say</h2>
        <div className="relative mt-12 h-[300px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentTestimonial === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="mx-auto mb-6 h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <blockquote className="mb-4 text-xl italic">
                {`"${testimonial.quote}"`}
              </blockquote>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm opacity-75">{testimonial.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentTestimonial === index
                  ? "bg-white w-4"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};