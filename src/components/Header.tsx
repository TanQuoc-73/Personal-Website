'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { AuthDropdown } from '@/components/AuthDropdown';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AboutDropdown } from '@/components/dropdown/AboutDropdown';

function HeaderContent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const authRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Thêm state cho hiệu ứng ẩn/hiện
  const [opacity, setOpacity] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user } = useAuth();

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

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setOpacity(prev => Math.max(prev - 0.1, 0)); 
      }
      else {
        setOpacity(prev => Math.min(prev + 0.1, 1)); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className="fixed top-0 w-full shadow-md border-b z-50 transition-opacity duration-300"
        style={{
          backgroundImage: "linear-gradient(to right, white, black)",
          opacity: opacity
        }}
      >
        {/* Top Header */}
        <div className="flex justify-between items-center px-20 h-8 text-[13px]">
          {/* Left Top */}
          <div className="flex items-center gap-3">
            <Link href="/links">Hello</Link>
            <span>Link</span>
            <div className="bg-black h-[13px] w-[1px]" />
            <span>Link</span>
          </div>

          {/* Right Top */}
          <div>
            {user && <span className="ml-2 bg-gray-200/60 py-[1px] px-2 rounded-2xl smax-w-[120px] truncate">{user.email}</span>}
            <span className="ml-2 text-white">Contact</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center px-20 h-16 relative">
          {/* LOGO */}
          <Link href="/">
            <Image
              src="/LogoWeb.png"
              alt="Logo"
              width={200}
              height={100}
              className="h-20 w-auto mb-6"
            />
          </Link>

          {/* Nav Button*/}
          <div className="flex items-center gap-4 relative">
            {/* About */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="text-gray-300 hover:text-white px-3 py-1 rounded cursor-pointer focus:outline-none"
              >
                About
              </button>
              {aboutDropdownOpen && <AboutDropdown onClose={() => setAboutDropdownOpen(false)} />}
            </div>

            <Link href="/project" className="text-gray-300 hover:text-white">Project</Link>
            <Link href="/service" className="text-gray-300 hover:text-white">Service</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>

            {/* Account */}
            <div className="ml-10 relative" ref={authRef}>
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUser />
              </Button>
              {dropdownOpen && <AuthDropdown onClose={() => setDropdownOpen(false)} />}
            </div>
          </div>
        </div>
      </div>
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
