import Image from "next/image";
import React from "react";
import SkillList from "@/components/SkillList";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between py-20 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-900/5 rounded-full blur-3xl"></div>
        </div>

        {/* Left - Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 relative z-10">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-600/10 to-red-700/10 text-red-600 rounded-full text-sm font-medium border border-red-600/20">
              Welcome to my world
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-black to-gray-800 mb-6 leading-tight">
            Creative
            <span className="block text-red-600">Developer</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Crafting beautiful and functional web experiences with passion for innovation and attention to detail.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              href="/portfolio"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-gray-300/70 via-gray-500/70 to-gray-800/70 text-white font-semibold shadow-lg hover:brightness-110 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              View Projects
            </Link>
            
            <Link
              href="#contact"
              className="px-8 py-3 rounded-full bg-gray-200/70 text-gray-800 font-semibold shadow-lg hover:bg-gray-300 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Right - Image */}
        <div className="lg:w-1/2 flex justify-center relative z-10">
          <div className="relative group">
            {/* Decorative ring */}
            <div className="absolute inset-0 w-[320px] h-[320px] md:w-[470px] md:h-[470px] lg:w-[520px] lg:h-[520px] rounded-full border-2 border-red-600/20 group-hover:border-red-600/40 transition-all duration-500 animate-pulse"></div>
            
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
              <Image
                src="/heroimg.png"
                alt="Developer Illustration"
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-2xl transform group-hover:scale-105 transition-all duration-700 ease-out"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600/10 via-transparent to-gray-900/10 group-hover:from-red-600/20 group-hover:to-gray-900/20 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-gray-900/10 to-black/10 text-gray-800 rounded-full text-sm font-medium border border-gray-300/50 mb-4">
            What I Do Best
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-black mb-6">
            My Skills
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </div>

        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white rounded-3xl shadow-xl border border-gray-200/50"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-gray-900/5 rounded-3xl"></div>
          
          <div className="relative p-8 md:p-12">
            <SkillList />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-600/10 to-red-700/10 text-red-600 rounded-full text-sm font-medium border border-red-600/20 mb-4">
            Portfolio Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-black mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A selection of my best work showcasing creativity and technical expertise
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <ProjectList/>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-16">
        <div className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-red-700/5 to-red-600/10 rounded-3xl"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-900/10 rounded-full blur-3xl"></div>
          
          <div className="relative text-center py-20 px-8">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-red-600/10 text-red-600 rounded-full text-sm font-medium border border-red-600/20 mb-6">
                Let's Connect
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">Get in Touch</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:your.email@example.com"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  Send Email
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a
                href="#portfolio"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-800 font-semibold shadow-lg border-2 border-gray-200/50 hover:border-red-500/30 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 4l-3.446 2.032a1 1 0 01-.908 0L8 8v6h8V8z" clipRule="evenodd"></path>
                  </svg>
                  View Portfolio
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}