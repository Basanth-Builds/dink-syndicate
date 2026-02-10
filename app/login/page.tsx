"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) {
            setError("Login service is temporarily unavailable. Please try again later.");
            return;
        }
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { name },
                    },
                });
                if (error) throw error;
                setSuccess(
                    "Account created! Check your email for a confirmation link."
                );
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push("/profile");
                router.refresh();
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#121919] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#237c99]/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#c5e8a1]/10 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#237c99]/5 blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo & Back */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <Image
                            src="/dinkSyndicateLogo.jpg"
                            alt="The Dink Syndicate"
                            width={80}
                            height={80}
                            className="rounded-full mx-auto mb-4 ring-2 ring-[#237c99]/50 shadow-lg shadow-[#237c99]/20"
                        />
                    </Link>
                    <h1 className="text-3xl font-bold text-[#e8f2f2] mb-2">
                        {isSignUp ? "Join The Syndicate" : "Welcome Back"}
                    </h1>
                    <p className="text-[#e8f2f2]/60 text-sm">
                        {isSignUp
                            ? "Create your player account"
                            : "Sign in to your player profile"}
                    </p>
                </div>

                {/* Card */}
                <div className="bg-[#1a2424] border border-[#237c99]/20 rounded-2xl p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isSignUp && (
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-[#c5e8a1] mb-2"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/30 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/30 focus:outline-none focus:ring-2 focus:ring-[#237c99]/50 focus:border-[#237c99] transition-all"
                                />
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#c5e8a1] mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/30 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/30 focus:outline-none focus:ring-2 focus:ring-[#237c99]/50 focus:border-[#237c99] transition-all"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#c5e8a1] mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                placeholder="Minimum 6 characters"
                                className="w-full px-4 py-3 bg-[#121919] border border-[#237c99]/30 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/30 focus:outline-none focus:ring-2 focus:ring-[#237c99]/50 focus:border-[#237c99] transition-all"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-[#c5e8a1]/10 border border-[#c5e8a1]/30 rounded-xl p-3 text-[#c5e8a1] text-sm">
                                {success}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-[#237c99] to-[#1a5d73] text-white font-semibold rounded-xl hover:from-[#1a5d73] hover:to-[#237c99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#237c99]/20 hover:shadow-[#237c99]/40 cursor-pointer"
                        >
                            {loading
                                ? "Please wait..."
                                : isSignUp
                                    ? "Create Account"
                                    : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#237c99]/20" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-[#1a2424] text-[#e8f2f2]/40">
                                    or
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError(null);
                                setSuccess(null);
                            }}
                            className="text-[#237c99] hover:text-[#c5e8a1] transition-colors text-sm font-medium cursor-pointer"
                        >
                            {isSignUp
                                ? "Already have an account? Sign In"
                                : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-[#e8f2f2]/40 hover:text-[#c5e8a1] transition-colors text-sm inline-flex items-center gap-2"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
