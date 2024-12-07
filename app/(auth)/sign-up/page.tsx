'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const { toast } = useToast();

  // State to hold form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract values from form data
    const { password, confirmPassword } = formData;

    // Validate password and confirm password
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match. Please try again.",
        variant: "destructive", // You can use 'destructive' for error messages
      });
      return;
    }

    // If passwords match, log form data (You can replace this with API call)
    console.log("Form Data:", formData);

    // For now, show the "Coming Soon" toast
    toast({
      title: "Coming Soon",
      description: "Sign up functionality will be available soon!",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-blue-400 flex items-center justify-center">
      <Section className="py-12 px-6">
        <div
          className="max-w-lg w-full bg-white shadow-xl rounded-lg p-8 space-y-6 relative animate-fade-in"
          style={{ minWidth: "400px" }}
        >
          {/* Header */}
          <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center animate-slide-down">
            Create Your Account
          </h1>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 animate-scale-up"
          >
            {/* Full Name */}
            <div className="relative">
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="pl-12 py-3"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                👤
              </span>
            </div>
            {/* Email */}
            <div className="relative">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="pl-12 py-3"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                ✉️
              </span>
            </div>
            {/* Password */}
            <div className="relative">
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="pl-12 py-3"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </span>
            </div>
            {/* Confirm Password */}
            <div className="relative">
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="pl-12 py-3"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </span>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              Sign Up (Coming Soon)
            </Button>
          </form>
          {/* Footer */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-800 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Section>
    </main>
  );
};

export default Page;
