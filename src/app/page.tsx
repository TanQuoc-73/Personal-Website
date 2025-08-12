import Image from "next/image";

import React from "react";
import SkillList from "@/components/SkillList";
import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen mx-20  ">
      {/* Hero Section */}
      <section className="flex items-center justify-between w-full h-screen">
        {/* Left */}
        <div className="flex items-center justify-center w-[60%] h-screen p-10 text-black">
            <div className="">
              <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
              <p className="text-lg mb-6">
                I am a passionate developer with a focus on creating beautiful and functional web applications.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-300/70 via-gray-500/70 to-gray-800/70 text-white font-semibold shadow-lg hover:brightness-110 transition duration-300"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full bg-gray-200/70 text-gray-800 font-semibold shadow-lg hover:bg-gray-300 transition duration-300"
                >
                  Contact Me
                </a>
              </div>
            </div>
        </div>
        {/* Right */}
        <div className="flex items-center justify-center w-[40%] h-screen p-10 text-black">
            {/* LOGO */}
            <div className="">
              <Image
                src="/heroimg.png"
                alt="Logo"
                width={600}
                height={600}
                className=""
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
