"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/redux/apis/authAPI";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Retrieve email from query params

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!email) {
        toast.error("Invalid request. Email is missing.");
        return;
      }

      const response = await resetPassword(email, otp, password); // Call API function
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-200 via-blue-300 to-green-400 flex items-center justify-center">
      <Section className="p-8">
        <div
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 relative animate-slide-in"
          style={{ minWidth: "380px", maxWidth: "480px" }}
        >
          {/* Header */}
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter the OTP sent to your email along with your new password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* OTP Field */}
            <div className="relative">
              <Input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="pl-12"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔢
              </span>
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-12"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-12"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                ✅
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <a
              href="/sign-in"
              className="text-green-600 hover:underline transition"
            >
              Back to Login
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default ResetPasswordPage;