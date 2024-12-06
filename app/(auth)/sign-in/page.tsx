"use client";

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
      description: "Login functionality will be available soon!",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-blue-400 flex items-center justify-center">
      <Section className="p-8">
        <div
          className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-10 relative animate-slide-in"
          style={{ minWidth: "380px", maxWidth: "480px" }}
        >
          {/* Close Button */}
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            ✖
          </button>
          {/* Header */}
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">
            Please Login To Continue
          </h2>
          {/* Tabs */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            <button
              className="px-6 py-2 font-semibold text-green-600 border-b-4 border-green-600 focus:outline-none"
              aria-current="page"
            >
              Sign In
            </button>
            <Link
              href="/sign-up"
              className="px-6 py-2 font-semibold text-gray-500 hover:text-green-600 transition"
            >
              Sign Up
            </Link>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Username or email"
                required
                className="pl-12"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                👤
              </span>
            </div>
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                required
                className="pl-12"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-green-600 hover:underline"
              >
                Forgot password
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Sign In
            </Button>
            {/* Social Buttons */}
            <div className="text-center text-gray-500 mt-4">or</div>
            <div className="grid grid-cols-2 gap-4">
              {/* <button
                type="button"
                className="flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Icon"
                  className="w-6 h-6 mr-2"
                />
                Google
              </button> */}
              {/* <button
                type="button"
                className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook Icon"
                  className="w-6 h-6 mr-2"
                />
                Facebook
              </button> */}
            </div>
          </form>
          <p className="text-center text-gray-600  text-sm">
            Why Create an Account?{" "}
            <span className="text-green-600 hover:underline cursor-pointer">
              Learn more
            </span>
          </p>
        </div>
      </Section>
    </main>
  );
};

export default Page;
