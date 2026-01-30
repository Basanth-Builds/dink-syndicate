import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0d1414] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Image
              src="/dinkSyndicateLogo.jpg"
              alt="The Dink Syndicate Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h3 className="text-[#c5e8a1] font-bold text-lg">
                THE DINK SYNDICATE
              </h3>
              <p className="text-[#e8f2f2]/40 text-sm">Since 2025</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#home"
              className="text-[#e8f2f2]/60 hover:text-[#c5e8a1] transition-colors text-sm"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-[#e8f2f2]/60 hover:text-[#c5e8a1] transition-colors text-sm"
            >
              About
            </a>
            <a
              href="#achievements"
              className="text-[#e8f2f2]/60 hover:text-[#c5e8a1] transition-colors text-sm"
            >
              Achievements
            </a>
            <a
              href="#team"
              className="text-[#e8f2f2]/60 hover:text-[#c5e8a1] transition-colors text-sm"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-[#e8f2f2]/60 hover:text-[#c5e8a1] transition-colors text-sm"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-[#237c99]/20 rounded-full flex items-center justify-center text-[#e8f2f2]/60 hover:bg-[#237c99] hover:text-white transition-all"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#237c99]/20 rounded-full flex items-center justify-center text-[#e8f2f2]/60 hover:bg-[#237c99] hover:text-white transition-all"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#237c99]/20 rounded-full flex items-center justify-center text-[#e8f2f2]/60 hover:bg-[#237c99] hover:text-white transition-all"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#237c99]/20 text-center">
          <p className="text-[#e8f2f2]/40 text-sm">
            © 2025 The Dink Syndicate. All rights reserved. | Made with 🏓 in India
          </p>
        </div>
      </div>
    </footer>
  );
}
