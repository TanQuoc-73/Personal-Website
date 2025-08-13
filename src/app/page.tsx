import Image from "next/image";

import React from "react";
import SkillList from "@/components/SkillList";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between py-20 min-h-screen">
        {/* Left - Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            I am a passionate developer with a focus on creating beautiful and functional web applications.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <Link
              href="/portfolio"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-gray-300/70 via-gray-500/70 to-gray-800/70 text-white font-semibold shadow-lg hover:brightness-110 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              View Projects
            </Link>
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-gray-200/70 text-gray-800 font-semibold shadow-lg hover:bg-gray-300 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right - Image */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
            <Image
              src="/heroimg.png"
              alt="Developer Illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-full shadow-2xl transform hover:rotate-3 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      

      {/* Skills Section */}
      <section className="flex flex-col items-center justify-center max-w-5xl w-full mt-20 px-4">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-black mb-5 text-center tracking-tight">
            My Skills
          </h2>
          <div className="rounded-xl border border-black p-6 shadow-lg">
            <SkillList />
          </div>
        </div>
      </section>


      {/* Featured Projects Section */}
      <section className="max-w-5xl w-full mt-20 px-4">
        <h2 className="text-3xl font-bold text-black mb-8 text-center tracking-tight">
          Featured Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <ProjectList/>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-5xl w-full mt-20 mb-16 px-4 text-cente h-100">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Get in Touch</h2>
        <p className="text-gray-900 mb-6 max-w-xl mx-auto">
          Interested in working together or have any questions? Feel free to reach out via email or social media.
        </p>
        <a
          href="mailto:your.email@example.com"
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-white font-semibold shadow-lg hover:brightness-110 transition duration-300"
        >
          Contact Me
        </a>
      </section>
    </main>
  );
}
