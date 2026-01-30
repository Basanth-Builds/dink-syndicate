import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#121919] via-[#1a2a2a] to-[#121919]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#237c99] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c5e8a1] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-[#237c99]/20 rounded-full mb-6">
              <span className="text-[#c5e8a1] font-medium text-sm tracking-wider uppercase">
                Since 2025 • India
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e8f2f2] leading-tight mb-6">
              Welcome to{" "}
              <span className="text-[#c5e8a1]">The Dink Syndicate</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#e8f2f2]/80 mb-8 max-w-xl mx-auto lg:mx-0">
              An elite community of pro pickleball players competing at national
              level tournaments across India. We&apos;re on a mission to take our
              game to the global stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#about"
                className="bg-[#237c99] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1a5d73] transition-all hover:scale-105 shadow-lg shadow-[#237c99]/30"
              >
                Discover Our Journey
              </a>
              <a
                href="#contact"
                className="border-2 border-[#c5e8a1] text-[#c5e8a1] px-8 py-4 rounded-full font-semibold hover:bg-[#c5e8a1] hover:text-[#121919] transition-all"
              >
                Partner With Us
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#237c99]/30">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#c5e8a1]">
                  15+
                </div>
                <div className="text-[#e8f2f2]/60 text-sm mt-1">
                  Tournaments
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#c5e8a1]">
                  5
                </div>
                <div className="text-[#e8f2f2]/60 text-sm mt-1">Pro Players</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#c5e8a1]">
                  1
                </div>
                <div className="text-[#e8f2f2]/60 text-sm mt-1">
                  Dream Goal
                </div>
              </div>
            </div>
          </div>

          {/* Logo/Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-[#237c99] rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <Image
                src="/dinkSyndicateLogo.jpg"
                alt="The Dink Syndicate Logo"
                width={450}
                height={450}
                className="relative z-10 rounded-3xl shadow-2xl animate-float"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[#c5e8a1]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
