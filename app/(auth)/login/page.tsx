"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Load saved credentials on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRemember = localStorage.getItem("rememberMe") === "true";

    if (savedRemember && savedEmail && savedPassword) {
      setFormData({
        email: savedEmail,
        password: savedPassword,
        remember: true,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/admin-login", {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.remember,
      });

      if (response.data.success) {
        const { accessToken } = response.data.data;
        const message = response.data.message || "You have been logged in successfully!";

        const userName = message.includes("Welcome back ")
          ? message.replace("Welcome back ", "")
          : "Admin";

        localStorage.setItem("token", accessToken);
        localStorage.setItem("userName", userName);

        // Handle Remember Me persistence
        if (formData.remember) {
          localStorage.setItem("rememberedEmail", formData.email);
          localStorage.setItem("rememberedPassword", formData.password);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
          localStorage.setItem("rememberMe", "false");
        }

        toast.success(message);
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "Invalid email or password. Please try again."
      );
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
            <Image height={200} width={290} alt="logo" src="/logo.svg" className="mb-5" />
            <h1 className="text-3xl font-medium text-gray-900">Admin Login</h1>
            <p className="text-sm text-gray-600">
              Enter your Credentials to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="h-11 rounded-[10px] border-[#D9D9D9] text-gray-900 placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="h-11 rounded-[10px] text-gray-900 border-[#D9D9D9] placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, remember: checked as boolean })
                  }
                  disabled={isLoading}
                  className="data-[state=checked]:bg-gray-900 border-[#D9D9D9] data-[state=checked]:border-gray-900"
                />

                <Label
                  htmlFor="remember"
                  className="text-sm font-normal text-gray-600 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              <Link
                href="/forgot"
                className="text-sm font-medium text-[#0C2A92] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-lg bg-[#1E1E1E] cursor-pointer text-white"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
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
