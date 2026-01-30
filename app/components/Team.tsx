export default function Team() {
  const teamMembers = [
    {
      name: "VVS Basanth Pedapati",
      role: "Singles & Doubles Specialist",
      specialty: "Sharp Angles & Strategic Play",
    },
    {
      name: "Kushaal Varma",
      role: "Doubles Powerhouse",
      specialty: "Explosive Power Play",
    },
    {
      name: "Likhitha Landa",
      role: "Aggressive Attacker",
      specialty: "Power Game & Relentless Offense",
    },
    {
      name: "Jayanth Babu",
      role: "Net Dominator",
      specialty: "Precision Net Game & Devastating Smashes",
    },
    {
      name: "Sai Teja",
      role: "Singles Specialist",
      specialty: "Agility & Supreme Court Coverage",
    },
  ];

  return (
    <section id="team" className="py-24 bg-gradient-to-b from-[#e8f2f2] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#237c99] font-semibold text-sm tracking-wider uppercase">
            Meet The Squad
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#121919] mt-2 mb-4">
            Our Pro Players
          </h2>
          <div className="w-24 h-1 bg-[#237c99] mx-auto rounded-full"></div>
          <p className="text-[#121919]/60 mt-6 max-w-2xl mx-auto">
            A dedicated team of passionate players, each bringing unique skills and unwavering commitment to the court.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#237c99]/10"
            >
              {/* Placeholder Image Area */}
              <div className="h-48 bg-gradient-to-br from-[#237c99] to-[#1a5d73] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#121919]/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#121919] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#237c99] font-medium text-sm mb-3">
                  {member.role}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#c5e8a1]/30 text-[#121919] text-xs font-medium rounded-full">
                    {member.specialty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-[#121919] rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#e8f2f2] mb-4">
              Think You Have What It Takes?
            </h3>
            <p className="text-[#e8f2f2]/70 mb-6 max-w-xl mx-auto">
              We&apos;re always looking for dedicated players who share our passion and drive. If you&apos;re serious about competitive pickleball, let&apos;s talk.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#c5e8a1] text-[#121919] px-8 py-4 rounded-full font-semibold hover:bg-[#b5d891] transition-all hover:scale-105"
            >
              Join The Syndicate
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
