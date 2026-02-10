"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!supabase) return;

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121919]/95 backdrop-blur-sm border-b border-[#237c99]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/dinkSyndicateLogo.jpg"
              alt="The Dink Syndicate Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <span className="text-[#c5e8a1] font-bold text-xl hidden sm:block">
              THE DINK SYNDICATE
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
            >
              About Us
            </a>
            <a
              href="#achievements"
              className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
            >
              Achievements
            </a>
            <a
              href="#team"
              className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
            >
              Contact Us
            </a>
            {user ? (
              <Link
                href="/profile"
                className="bg-gradient-to-r from-[#237c99] to-[#1a5d73] text-white px-6 py-2 rounded-full hover:from-[#1a5d73] hover:to-[#237c99] transition-all font-medium shadow-lg shadow-[#237c99]/20 flex items-center gap-2"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                My Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-[#c5e8a1] to-[#a8d47e] text-[#121919] px-6 py-2 rounded-full hover:from-[#a8d47e] hover:to-[#c5e8a1] transition-all font-semibold shadow-lg shadow-[#c5e8a1]/20 flex items-center gap-2"
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Player Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#e8f2f2] p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </a>
              <a
                href="#achievements"
                className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Achievements
              </a>
              <a
                href="#team"
                className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Team
              </a>
              <a
                href="#contact"
                className="text-[#e8f2f2] hover:text-[#c5e8a1] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </a>
              {user ? (
                <Link
                  href="/profile"
                  className="bg-gradient-to-r from-[#237c99] to-[#1a5d73] text-white px-6 py-2 rounded-full hover:from-[#1a5d73] hover:to-[#237c99] transition-all font-medium text-center"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-[#c5e8a1] to-[#a8d47e] text-[#121919] px-6 py-2 rounded-full hover:from-[#a8d47e] hover:to-[#c5e8a1] transition-all font-semibold text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Player Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
