'use client';

import React from 'react';
import { motion } from 'framer-motion';
// Đổi tên LifeBuoy -> LifeBuoyIcon để tránh nhầm lẫn
import { Rocket, Code2, Users, LifeBuoy as LifeBuoyIcon } from 'lucide-react';

const FALLBACK_ICON = Rocket;

const services = [
  {
    name: 'Website Development',
    description:
      'Building modern, responsive, and high-performance websites from scratch using the latest technologies.',
    icon: Code2,
    cta: 'Learn More',
  },
  {
    name: 'Hire Me',
    description:
      'Available for full-time, part-time, or freelance opportunities. Ready to join your team and build amazing products.',
    icon: Users,
    cta: 'Contact Me',
  },
  {
    name: 'Technical Consulting',
    description:
      'Providing expert advice on web architecture, performance optimization, and technology stack selection.',
    icon: Rocket,
    cta: 'Get a Quote',
  },
  {
    name: 'Support & Maintenance',
    description:
      'Offering ongoing support and maintenance to keep your web applications secure, updated, and running smoothly.',
    icon: LifeBuoyIcon,
    cta: 'See Plans',
  },
];

export default function ServicePage() {
  // Debug: log để phát hiện phần tử nào undefined
  if (process.env.NODE_ENV !== 'production') {
    console.log({
      hasMotion: typeof motion?.div === 'function',
      Rocket: typeof Rocket,
      Code2: typeof Code2,
      Users: typeof Users,
      LifeBuoyIcon: typeof LifeBuoyIcon,
    });
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          My <span className="text-red-500">Services</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          I offer a range of services to help you achieve your goals. Let&apos;s build something great together.
        </p>
      </div>

      {/* List */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {services.map((service, index) => {
          // Bảo vệ: nếu icon undefined thì dùng FALLBACK_ICON
          const Icon = (service.icon as React.ComponentType<{ className?: string }>) || FALLBACK_ICON;

          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-8 rounded-xl border border-white/20 shadow-lg hover:shadow-red-500/40
                         backdrop-blur-md bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-500/20 mb-6">
                <Icon className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{service.name}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <a
                href="#"
                className="inline-block px-6 py-3 rounded-full bg-red-500/80 text-white font-semibold
                           hover:bg-red-500 transition-colors duration-300"
              >
                {service.cta}
              </a>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
