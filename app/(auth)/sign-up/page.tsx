'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const Page = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              disabled
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
