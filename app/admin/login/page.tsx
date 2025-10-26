"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    console.log("Component mounted!");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple client-side authentication
    // Note: In production, this should be replaced with proper server-side authentication
    const isAdmin =
      (email === "admin@the-saena.ai" && password === "1234") ||
      (email === "Edmond@the-saena.ai" && password === "ahskflwk1!");

    if (isAdmin) {
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000);

      // Set secure cookie with SameSite
      document.cookie = `admin-session=authenticated; path=/; expires=${expiryDate.toUTCString()}; SameSite=Strict${
        window.location.protocol === "https:" ? "; Secure" : ""
      }`;

      setIsLoading(false);
      router.push("/admin");
      return;
    }

    // Invalid credentials - add delay to prevent brute force
    setTimeout(() => {
      setError("Invalid email or password");
      setIsLoading(false);
    }, 1000);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C6FF3A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row">
      {/* Left side - only visible on desktop */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-600 p-12 flex-col justify-between">
        <div>
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <Image
              src="/icons/goodwill_white.svg"
              alt="GOODWILL(KE) logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-semibold text-white">
              GOODWILL(KE)
            </span>
          </a>
          <h1 className="text-4xl font-bold text-white mt-12">
            Welcome to GOODWILL(KE) Admin
          </h1>
          <p className="text-purple-100 mt-4 max-w-md">
            Manage your website content, pricing, and settings from one central
            dashboard.
          </p>
        </div>
        <div className="mt-auto">
          <div className="w-full h-64 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
            <span className="text-white/50 text-sm">
              Admin Dashboard Preview
            </span>
          </div>
        </div>
      </div>

      {/* Right side - login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        {/* Mobile header - only visible on mobile */}
        <a href="/" className="flex md:hidden items-center gap-3 mb-8 w-full hover:opacity-80 transition-opacity cursor-pointer">
          <Image
            src="/icons/goodwill_white.svg"
            alt="GOODWILL(KE) logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-2xl font-semibold text-white">
            GOODWILL(KE)
          </span>
        </a>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              Sign in to your account
            </h2>
            <p className="text-neutral-400 mt-2">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@the-saena.ai"
                className="bg-[#1a1a1a] border-neutral-800 text-white"
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-neutral-200">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-sm text-[#C6FF3A] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#1a1a1a] border-neutral-800 text-white"
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-400 text-sm">
              Need help? Contact{" "}
              <a
                href="mailto:support@the-saena.ai"
                className="text-[#C6FF3A] hover:underline"
              >
                support@the-saena.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
