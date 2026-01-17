"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function OTPVerifyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (!isNaN(Number(pastedData[i]))) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Email verified successfully!");
      
      setTimeout(() => {
        router.push("/reset");
      }, 1000);
    } catch (error) {
      toast.error("Invalid OTP code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("OTP code has been resent to your email!");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <Image height={200} width={290} alt="logo" src="/logo.svg" className="mb-5" />
            <h1 className="text-3xl font-medium text-gray-900">
              OTP Verify
            </h1>
            <p className="text-sm text-gray-600">
              Please check your email. We sent there 6 digit code
            </p>
          </div>

          {/* OTP Form */}
          <div className="space-y-6">
            {/* OTP Input Fields */}
            <div className="flex gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="flex-1 h-16 text-center text-lg font-semibold rounded-[10px] border-[#D9D9D9] text-gray-900"
                  disabled={isLoading}
                />
              ))}
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-11 rounded-lg bg-[#1E1E1E] cursor-pointer text-white"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>

            {/* Resend Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't receive any code? </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-[#0C2A92] hover:underline font-medium disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend"}
              </button>
            </div>
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