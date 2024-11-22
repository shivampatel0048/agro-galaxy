'use client'

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
      title: "Successfully subscribed!",
      description: "Thank you for joining our community.",
    });
    setEmail("");
    setName("");
    setUpdates("all");
    setIsFarmer(false);
  };

  return (
    <Section className="bg-background">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="Subscribe"
            className="h-full w-full object-cover"
            width={800}
            height={800}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
            Stay Updated
          </h2>
          <p className="mt-4 text-gray-600">
            Sign up for exclusive updates and early launch offers!
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Select
                value={updates}
                onValueChange={setUpdates}
              >
                <option value="all">All Updates</option>
                <option value="products">Product Updates</option>
                <option value="news">News & Blog Posts</option>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="farmer"
                checked={isFarmer}
                onCheckedChange={(checked) => setIsFarmer(checked as boolean)}
              />
              <label
                htmlFor="farmer"
                className="text-sm leading-none text-gray-600"
              >
                I am a farmer looking for recommendations
              </label>
            </div>
            <Button type="submit" className="w-full">
              Subscribe Now
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};