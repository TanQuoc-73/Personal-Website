import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaPaintBrush, FaServer } from 'react-icons/fa';

const skills = [
  {
    name: 'Frontend Development',
    icon: <FaCode className="text-4xl text-red-400 mb-4" />,
    description: 'Building responsive and intuitive user interfaces with modern frameworks like React & Next.js.',
  },
  {
    name: 'Backend Development',
    icon: <FaServer className="text-4xl text-red-400 mb-4" />,
    description: 'Creating powerful and scalable server-side applications and APIs.',
  },
  {
    name: 'UI/UX Design',
    icon: <FaPaintBrush className="text-4xl text-red-400 mb-4" />,
    description: 'Designing user-centered and visually appealing interfaces.',
  },
];

export default function AboutPage() {
  return (
    <div className="text-gray-200 flex mt-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* Hero */}
        <section className="text-center">
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-red-500/40 shadow-lg inline-block">
            <Image
              className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-red-500 shadow-lg"
              src="/images/avatar.jpg"
              alt="Duong Quoc Tan"
              width={160}
              height={160}
            />
            <h1 className="text-5xl font-extrabold text-red-400">Hello, I&apos;m Duong Quoc Tan</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              A passionate software developer who loves building beautiful and useful web applications.
            </p>
          </div>
        </section>

        {/* My Story */}
        <section className="bg-black/40 backdrop-blur-md p-10 rounded-xl border border-red-500/30 shadow-lg">
          <h2 className="text-3xl font-bold text-red-400 mb-6 text-center">My Journey</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            This is where you can share your story. Where did you start? What inspired you to pursue programming?
            Share some important milestones in your career or projects you&apos;re proud of.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            My goal is to continuously learn and apply new technologies to create valuable products
            that solve real-world problems.
          </p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-3xl font-bold text-center text-red-400 mb-12">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-red-500/30 shadow-lg text-center hover:border-red-500 transition-all duration-300"
              >
                {skill.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{skill.name}</h3>
                <p className="text-gray-400">{skill.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-black/50 backdrop-blur-md p-12 rounded-xl border border-red-500/30 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-red-400">Let&apos;s Connect!</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
            I&apos;m always open to discussing collaboration opportunities, new projects, or simply sharing knowledge. Don&apos;t hesitate to reach out!
          </p>
          <div className="flex justify-center items-center space-x-6 mb-8">
            <Link href="#" className="hover:text-red-400 transition-colors"><FaGithub size={30} /></Link>
            <Link href="#" className="hover:text-red-400 transition-colors"><FaLinkedin size={30} /></Link>
            <Link href="#" className="hover:text-red-400 transition-colors"><FaTwitter size={30} /></Link>
          </div>
          <Link
            href="/contact"
            className="bg-red-500 text-white font-bold py-3 px-8 rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            Contact Me
          </Link>
        </section>
      </main>
    </div>
  );
}
