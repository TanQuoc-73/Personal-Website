'use client';

import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaChevronDown } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { AuthDropdown } from '@/components/AuthDropdown';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AboutDropdown } from '@/components/dropdown/AboutDropdown';

function HeaderContent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const authRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // State cho hiệu ứng ẩn/hiện và scroll
  const [opacity, setOpacity] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (authRef.current && !authRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lắng nghe sự kiện scroll để ẩn/hiện Header dần dần
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Thay đổi background khi scroll
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setOpacity(prev => Math.max(prev - 0.15, 0.3)); 
      } else {
        setOpacity(prev => Math.min(prev + 0.15, 1)); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out backdrop-blur-md ${
          isScrolled 
            ? 'shadow-2xl border-b border-gray-800/20' 
            : 'shadow-lg border-b border-transparent'
        }`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.95) 50%, rgba(40,40,40,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,30,30,0.9) 50%, rgba(60,60,60,0.9) 100%)',
          opacity: opacity,
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Top Header - Thêm animation và gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 animate-pulse"></div>
          <div className="flex justify-between items-center px-6 md:px-12 lg:px-20 h-10 text-sm relative z-10">
            {/* Left Top */}
            <div className="flex items-center gap-6">
              <Link 
                href="/links" 
                className={`relative group transition-all duration-300 ${
                  isActive('/links') 
                    ? 'text-red-500 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Hello
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link 
                href="/about" 
                className={`relative group transition-all duration-300 ${
                  isActive('/about') 
                    ? 'text-red-500 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
              
              <Link 
                href="/contact" 
                className={`relative group transition-all duration-300 ${
                  isActive('/contact') 
                    ? 'text-red-500 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Right Top */}
            <div className="flex items-center gap-4">
              {user && (
                <span className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm py-1.5 px-4 rounded-full text-sm text-gray-200 border border-gray-700/50 shadow-lg max-w-[150px] truncate">
                  {user.email}
                </span>
              )}
              <Link 
                href="/contact" 
                className={`relative group transition-all duration-300 ${
                  isActive('/contact') 
                    ? 'text-red-400 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-4 relative">
          {/* LOGO với hiệu ứng hover */}
          <Link href="/" className="group relative">
            <div className="absolute inset-0 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"></div>
            <Image
              src="/LogoWeb.png"
              alt="Logo"
              width={200}
              height={100}
              className="w-auto h-12 relative z-10 transition-all duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-2 relative">
            {/* About Dropdown */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 overflow-hidden ${
                  isActive('/about') || aboutDropdownOpen
                    ? 'bg-gradient-to-r from-red-600/90 to-red-700/90 text-white shadow-lg shadow-red-500/20' 
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">About</span>
                <FaChevronDown className={`text-xs transition-transform duration-300 relative z-10 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <AboutDropdown isOpen={aboutDropdownOpen} onClose={() => setAboutDropdownOpen(false)} />
            </div>

            {/* Other Navigation Items */}
            {[
              { href: '/project', label: 'Project' },
              { href: '/service', label: 'Service' },
              { href: '/contact', label: 'Contact' }
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`group relative px-5 py-2.5 rounded-lg transition-all duration-300 overflow-hidden ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-red-600/90 to-red-700/90 text-white shadow-lg shadow-red-500/20'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}

            {/* Account Button */}
            <div className="ml-6 relative" ref={authRef}>
              <Button
                variant="outline"
                className={`group relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 overflow-hidden ${
                  dropdownOpen
                    ? 'bg-gradient-to-r from-red-600/90 to-red-700/90 text-white shadow-lg shadow-red-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10 border-0'
                }`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUser className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10" />
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              {dropdownOpen && <AuthDropdown onClose={() => setDropdownOpen(false)} />}
            </div>
          </nav>
        </div>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      </div>

      {/* Spacer để tránh content bị che */}
      <div className="h-24"></div>
    </>
  );
}

export default function Header() {
  return (
    <AuthProvider>
      <HeaderContent />
    </AuthProvider>
  );
}