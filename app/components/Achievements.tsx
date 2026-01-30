export default function Achievements() {
  const achievements = [
    {
      title: "National Championship Qualifiers",
      description: "Consistently qualifying for India's premier pickleball tournaments",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "Regional Tournament Wins",
      description: "Multiple victories across state and regional level competitions",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: "Pro Player Rankings",
      description: "Team members ranked among top pickleball players in India",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "Community Growth",
      description: "Growing network of players and supporters across the country",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="achievements" className="py-24 bg-[#121919] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#237c99] rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c5e8a1] rounded-full blur-3xl opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#c5e8a1] font-semibold text-sm tracking-wider uppercase">
            Our Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8f2f2] mt-2 mb-4">
            Achievements & Milestones
          </h2>
          <div className="w-24 h-1 bg-[#237c99] mx-auto rounded-full"></div>
          <p className="text-[#e8f2f2]/60 mt-6 max-w-2xl mx-auto">
            Every tournament is a stepping stone. Every practice session brings us closer to our dreams.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-[#1a2a2a] to-[#121919] p-8 rounded-2xl border border-[#237c99]/20 hover:border-[#237c99]/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-[#237c99]/20 rounded-2xl flex items-center justify-center text-[#c5e8a1] mb-6 group-hover:bg-[#237c99] group-hover:text-white transition-colors">
                {achievement.icon}
              </div>
              <h3 className="text-xl font-bold text-[#e8f2f2] mb-3">
                {achievement.title}
              </h3>
              <p className="text-[#e8f2f2]/60">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        {/* Goals Section */}
        <div className="mt-20 bg-gradient-to-r from-[#237c99]/20 via-[#237c99]/10 to-[#c5e8a1]/20 rounded-3xl p-8 md:p-12 border border-[#237c99]/30">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#e8f2f2] mb-4">
                Our International Aspiration
              </h3>
              <p className="text-[#e8f2f2]/70 mb-6">
                We&apos;re actively seeking opportunities to compete abroad and learn from the best players worldwide. Our goal is to bring international experience back to India and elevate the sport across the nation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[#e8f2f2]/80">
                  <span className="w-2 h-2 bg-[#c5e8a1] rounded-full"></span>
                  Asia Pacific Championships
                </li>
                <li className="flex items-center gap-3 text-[#e8f2f2]/80">
                  <span className="w-2 h-2 bg-[#c5e8a1] rounded-full"></span>
                  US Open Pickleball Championships
                </li>
                <li className="flex items-center gap-3 text-[#e8f2f2]/80">
                  <span className="w-2 h-2 bg-[#c5e8a1] rounded-full"></span>
                  World Pickleball Championship
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="inline-block bg-[#121919] rounded-2xl p-8">
                <div className="text-6xl md:text-7xl font-bold text-[#c5e8a1] mb-2">2026</div>
                <div className="text-[#e8f2f2]/60 text-lg">International Debut Goal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
