"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { toast } from "sonner";

const Page = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending a password reset link
    setTimeout(() => {
      toast.success(`Password reset link has been sent to ${email}.`);
      setIsSubmitting(false);
      setEmail("");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-300 to-purple-400 flex items-center justify-center">
      <Section className="p-8">
        <div
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 relative animate-slide-in"
          style={{ minWidth: "380px", maxWidth: "480px" }}
        >
          {/* Header */}
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your email to receive a password reset link.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                📧
              </span>
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <a
              href="/sign-in"
              className="text-purple-600 hover:underline transition"
            >
              Back to Login
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Page;
