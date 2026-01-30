export default function About() {
  return (
    <section id="about" className="py-24 bg-[#e8f2f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#237c99] font-semibold text-sm tracking-wider uppercase">
            Our Story
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#121919] mt-2 mb-4">
            About The Dink Syndicate
          </h2>
          <div className="w-24 h-1 bg-[#237c99] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-[#121919] mb-6">
              From Local Courts to National Champions
            </h3>
            <p className="text-[#121919]/70 mb-6 leading-relaxed">
              Founded in 2025, The Dink Syndicate emerged from a shared passion
              for pickleball and an unwavering commitment to excellence. What
              started as a group of friends practicing together has evolved into
              one of India&apos;s most dedicated pro pickleball communities.
            </p>
            <p className="text-[#121919]/70 mb-8 leading-relaxed">
              We actively compete in national level tournaments across India,
              constantly pushing our limits and refining our skills. Our goal?
              To represent India on the international stage and bring glory to
              our nation in this rapidly growing sport.
            </p>

            {/* Values */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#237c99] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#121919]">Excellence</h4>
                  <p className="text-sm text-[#121919]/60">
                    Daily practice and continuous improvement
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#c5e8a1] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#121919]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#121919]">Unity</h4>
                  <p className="text-sm text-[#121919]/60">
                    Stronger together as a syndicate
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#237c99] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#121919]">Global Vision</h4>
                  <p className="text-sm text-[#121919]/60">
                    Eyes on international tournaments
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#c5e8a1] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#121919]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#121919]">Passion</h4>
                  <p className="text-sm text-[#121919]/60">
                    Love for the game drives us forward
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-[#121919] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#237c99] rounded-full blur-3xl opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c5e8a1] rounded-full blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-[#c5e8a1] text-xl font-bold mb-6">
                  Our Mission
                </h3>
                <p className="text-[#e8f2f2] text-lg leading-relaxed mb-8">
                  &quot;To elevate Indian pickleball to the world stage by fostering
                  talent, building community, and competing with relentless
                  passion at every level.&quot;
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#c5e8a1] rounded-full"></div>
                    <span className="text-[#e8f2f2]/80">Train daily with purpose</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#c5e8a1] rounded-full"></div>
                    <span className="text-[#e8f2f2]/80">Compete at national level</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#c5e8a1] rounded-full"></div>
                    <span className="text-[#e8f2f2]/80">Seek international exposure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#c5e8a1] rounded-full"></div>
                    <span className="text-[#e8f2f2]/80">Inspire the next generation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
