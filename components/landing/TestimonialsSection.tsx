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
    <Section className="bg-green-900 text-white py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-accent mb-8">What Farmers Say</h2>
        <div className="relative mt-12">
          <div className="flex space-x-6 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`w-full max-w-xs rounded-lg bg-white p-6 shadow-lg transition-transform duration-1000 ${
                  currentTestimonial === index ? "transform scale-105" : "transform scale-95"
                }`}
              >
                <div className="mx-auto mb-6 h-20 w-20 overflow-hidden rounded-full border-4 border-green-900">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <blockquote className="mb-4 text-xl italic text-gray-800">
                  {`"${testimonial.quote}"`}
                </blockquote>
                <p className="font-semibold text-2xl text-green-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentTestimonial === index ? "bg-green-900 w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
