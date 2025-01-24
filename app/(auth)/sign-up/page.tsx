'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { signup } from "@/redux/apis/authAPI";
import { setToken } from "@/utils/tokenUtils";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, emailOrPhone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }

    // Regex for email and phone validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailOrPhone || (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone))) {
      toast.error('Please provide a valid email or phone number.');
      return;
    }

    setIsLoading(true);

    try {
      const query = emailRegex.test(emailOrPhone)
        ? { email: emailOrPhone }
        : { phone: emailOrPhone };

      const response = await signup({ name, ...query, password });
      const { token } = response;

      setToken(token);

      toast.success('Signed up successfully! Redirecting to home...');
      router.push("/");

    } catch (error: any) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
                name="name"
                value={formData.name}
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
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
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
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
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
