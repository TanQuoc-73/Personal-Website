import React from 'react';
import { Rocket, Code2, Users, LifeBuoy } from 'lucide-react';

const services = [
  {
    name: 'Website Development',
    description: 'Building modern, responsive, and high-performance websites from scratch using the latest technologies.',
    icon: Code2,
    cta: 'Learn More',
  },
  {
    name: 'Hire Me',
    description: 'Available for full-time, part-time, or freelance opportunities. Ready to join your team and build amazing products.',
    icon: Users,
    cta: 'Contact Me',
  },
  {
    name: 'Technical Consulting',
    description: 'Providing expert advice on web architecture, performance optimization, and technology stack selection.',
    icon: Rocket,
    cta: 'Get a Quote',
  },
  {
    name: 'Support & Maintenance',
    description: 'Offering ongoing support and maintenance to keep your web applications secure, updated, and running smoothly.',
    icon: LifeBuoy,
    cta: 'See Plans',
  },
];

export default function ServicePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          My <span className="text-red-600">Services</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          I offer a range of services to help you achieve your goals. Let's build something great together.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {services.map((service) => (
          <div key={service.name} className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <service.icon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.name}</h3>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <a href="#" className="inline-block px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300">
              {service.cta}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
