"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Password reset link sent to your email!");

      setTimeout(() => {
        router.push("/otp");
      }, 1000);
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <Image height={200} width={290} alt="logo" src="/logo.svg" />
            <h1 className="text-3xl font-medium text-gray-900">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-600">
              Enter your email to reset your password
            </p>
          </div>

          {/* Forgot Password Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-[10px] border-[#D9D9D9] text-gray-900 placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-11 rounded-lg bg-[#1E1E1E] cursor-pointer text-white"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Next"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative bg-[#0a1520]">
        <Image
          src="/auth.png"
          alt="Authentication"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}