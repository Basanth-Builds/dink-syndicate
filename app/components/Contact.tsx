"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-[#121919] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#237c99] rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#c5e8a1] rounded-full blur-3xl opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#c5e8a1] font-semibold text-sm tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8f2f2] mt-2 mb-4">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-[#237c99] mx-auto rounded-full"></div>
          <p className="text-[#e8f2f2]/60 mt-6 max-w-2xl mx-auto">
            Whether you&apos;re a potential sponsor, fellow player, or just want to connect - we&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-[#e8f2f2] mb-8">
              Let&apos;s Connect
            </h3>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#237c99]/20 rounded-xl flex items-center justify-center flex-shrink-0">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#e8f2f2]">Location</h4>
                  <p className="text-[#e8f2f2]/60">India</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#237c99]/20 rounded-xl flex items-center justify-center flex-shrink-0">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#e8f2f2]">Email</h4>
                  <p className="text-[#e8f2f2]/60">contact@dinksyndicate.com</p>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#237c99]/20 rounded-xl flex items-center justify-center flex-shrink-0">
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
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#e8f2f2]">Social</h4>
                  <p className="text-[#e8f2f2]/60">@TheDinkSyndicate</p>
                </div>
              </div>
            </div>

            {/* Partnership Types */}
            <div className="mt-12 p-6 bg-[#1a2a2a] rounded-2xl border border-[#237c99]/20">
              <h4 className="text-lg font-bold text-[#c5e8a1] mb-4">
                We&apos;re Looking For
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[#e8f2f2]/80">
                  <svg className="w-5 h-5 text-[#237c99]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sponsors & Brand Partners
                </li>
                <li className="flex items-center gap-3 text-[#e8f2f2]/80">
                  <svg className="w-5 h-5 text-[#237c99]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  International Tournament Opportunities
                </li>
                <li className="flex items-center gap-3 text-[#e8f2f2]/80">
                  <svg className="w-5 h-5 text-[#237c99]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Training Collaborations
                </li>
                <li className="flex items-center gap-3 text-[#e8f2f2]/80">
                  <svg className="w-5 h-5 text-[#237c99]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Equipment & Gear Partners
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[#e8f2f2] font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a2a2a] border border-[#237c99]/30 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/40 focus:outline-none focus:border-[#237c99] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#e8f2f2] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a2a2a] border border-[#237c99]/30 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/40 focus:outline-none focus:border-[#237c99] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[#e8f2f2] font-medium mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1a2a2a] border border-[#237c99]/30 rounded-xl text-[#e8f2f2] focus:outline-none focus:border-[#237c99] transition-colors"
                >
                  <option value="">Select a topic</option>
                  <option value="sponsorship">Sponsorship Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="join">Join The Team</option>
                  <option value="tournament">Tournament Invitation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[#e8f2f2] font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#1a2a2a] border border-[#237c99]/30 rounded-xl text-[#e8f2f2] placeholder-[#e8f2f2]/40 focus:outline-none focus:border-[#237c99] transition-colors resize-none"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#237c99] text-white py-4 rounded-xl font-semibold hover:bg-[#1a5d73] transition-all hover:scale-[1.02] shadow-lg shadow-[#237c99]/30"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
