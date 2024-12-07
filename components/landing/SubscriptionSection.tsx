'use client';

import { Section } from "@/components/ui/Section";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import Image from "next/image";

export const SubscriptionSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [updates, setUpdates] = useState("all");
  const [isFarmer, setIsFarmer] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Successfully Subscribed!",
      description: "Thank you for joining our community.",
    });
    setEmail("");
    setName("");
    setUpdates("all");
    setIsFarmer(false);
  };

  return (
    <Section className="bg-background py-12 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Image Section */}
        <div className="relative h-[400px] lg:h-[450px] overflow-hidden rounded-lg shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="Stay Updated"
            className="h-full w-full object-cover"
            width={800}
            height={800}
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center px-4 lg:px-8">
          <h2 className="text-4xl font-extrabold text-text-primary leading-tight md:text-5xl">
            Stay Updated
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Sign up for exclusive updates and early launch offers!
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 bg-white shadow-md p-6 rounded-lg border border-gray-200"
          >
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-3 rounded-md border-gray-300 focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Your Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 rounded-md border-gray-300 focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Updates Selection */}
            <div className="space-y-2">
              <label htmlFor="updates" className="text-sm font-semibold text-gray-700">
                Select Updates
              </label>
              <Select
                // id="updates"
                value={updates}
                onValueChange={setUpdates}
                // className="p-3 rounded-md border-gray-300 focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Updates</option>
                <option value="products">Product Updates</option>
                <option value="news">News & Blog Posts</option>
              </Select>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="farmer"
                checked={isFarmer}
                onCheckedChange={(checked) => setIsFarmer(checked as boolean)}
              />
              <label htmlFor="farmer" className="text-sm text-gray-600">
                I am a farmer looking for recommendations
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition"
            >
              Subscribe Now
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};
