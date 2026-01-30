"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              className="bg-[#237c99] text-white px-6 py-2 rounded-full hover:bg-[#1a5d73] transition-colors font-medium"
            >
              Contact Us
            </a>
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
                className="bg-[#237c99] text-white px-6 py-2 rounded-full hover:bg-[#1a5d73] transition-colors font-medium text-center"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
