"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/tokenUtils"; // Utility to store the token
import { login } from "@/redux/apis/authAPI";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { setUserId } from "@/utils/userUtils";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State to store form data
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { emailOrPhone, password } = formData;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^[0-9]{10}$/;

    let query: Record<string, string> = {};

    if (emailRegex.test(emailOrPhone)) {
      query = { email: emailOrPhone };
    } else if (phoneRegex.test(emailOrPhone)) {
      query = { phone: emailOrPhone };
    } else {
      toast.error('Please provide a valid email or phone number.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(query, password);

      const { token, user } = response;

      setToken(token);
      //@ts-ignore
      setUserId(user?.id);

      toast.success('Logged in successfully!');

      router.push("/");
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.error ||
        "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
                name="emailOrPhone"
                placeholder="phone or email"
                required
                value={formData.emailOrPhone}
                onChange={handleChange}
                className="pl-12"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                👤
              </span>
            </div>
            <div className="relative">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-12"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </span>
            </div>
            <div className="flex items-center justify-end text-sm text-gray-500">
              <Link href="/forgot" className="text-green-600 hover:underline">
                Forgot password
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            {/* Social Buttons */}
            <div className="text-center text-gray-500 mt-4">or</div>
            <div className="grid grid-cols-2 gap-4"></div>
          </form>
          <p className="text-center text-gray-600 text-sm">
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
