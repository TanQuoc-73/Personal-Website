'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaChevronDown } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { AuthDropdown } from '@/components/AuthDropdown';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AboutDropdown } from '@/components/dropdown/AboutDropdown';

/* ====== TopFireHighlight - đỏ tối, nền mỏng ====== */
const TopFireHighlight = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Nền flicker đỏ tối */}
      <div className="absolute -bottom-1 left-0 right-0 h-[5px] flame-flicker rounded-full"></div>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="top-fire-particle absolute bottom-0 w-0.5 h-0.5 bg-red-700 rounded-full"
          style={{
            left: `${3 + i * 8}%`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes flameFlicker {
          0%, 100% {
            background: radial-gradient(circle, rgba(139,0,0,0.85) 0%, rgba(178,34,34,0.7) 50%, rgba(128,0,0,0.4) 80%);
            transform: scaleX(1);
            opacity: 0.9;
          }
          50% {
            background: radial-gradient(circle, rgba(178,34,34,0.85) 0%, rgba(128,0,0,0.7) 50%, rgba(139,0,0,0.5) 80%);
            transform: scaleX(1.05);
            opacity: 1;
          }
        }
        .flame-flicker {
          animation: flameFlicker 1s infinite ease-in-out;
          filter: blur(3px);
        }
        @keyframes topFireRise {
          0% {
            opacity: 1;
            transform: translateY(2px) scale(1);
            background: #8b0000;
            box-shadow: 0 0 4px #8b0000;
          }
          30% {
            background: #b22222;
            transform: translateY(-4px) scale(1.5);
            box-shadow: 0 0 6px #b22222;
          }
          60% {
            background: #800000;
            transform: translateY(-8px) scale(1);
            box-shadow: 0 0 4px #800000;
          }
          100% {
            opacity: 0;
            transform: translateY(-12px) scale(0.3);
            background: #a52a2a;
            box-shadow: 0 0 2px #a52a2a;
          }
        }
        .top-fire-particle {
          animation: topFireRise 1.5s infinite ease-out;
        }
        .top-fire-particle:nth-child(2n) { animation-duration: 1.3s; }
        .top-fire-particle:nth-child(3n) { animation-duration: 1.7s; }
        .top-fire-particle:nth-child(4n) { animation-duration: 1.2s; }
        .top-fire-particle:nth-child(5n) { animation-duration: 1.8s; }
        .top-fire-particle:nth-child(6n) { animation-duration: 1.1s; }
      `}</style>
    </div>
  );
};

/* ====== FireHighlight - đỏ tối, nền mỏng ====== */
const FireHighlight = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;
  return (
    <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[5px] flame-flicker rounded-full"></div>
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="fire-particle absolute bottom-0 w-1 h-1 bg-red-700 rounded-full"
          style={{
            left: `${5 + i * 6}%`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes flameFlicker {
          0%, 100% {
            background: radial-gradient(circle, rgba(139,0,0,0.85) 0%, rgba(178,34,34,0.7) 50%, rgba(128,0,0,0.4) 100%);
            transform: scaleX(1);
            opacity: 0.9;
          }
          50% {
            background: radial-gradient(circle, rgba(178,34,34,0.85) 0%, rgba(128,0,0,0.7) 50%, rgba(139,0,0,0.5) 100%);
            transform: scaleX(1.05);
            opacity: 1;
          }
        }
        .flame-flicker {
          animation: flameFlicker 1s infinite ease-in-out;
          filter: blur(4px);
        }
        @keyframes fireRise {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
            background: #8b0000;
            box-shadow: 0 0 4px #8b0000;
          }
          25% {
            background: #b22222;
            transform: translateY(-8px) scale(1.2);
            box-shadow: 0 0 6px #b22222;
          }
          50% {
            background: #800000;
            transform: translateY(-16px) scale(0.8);
            box-shadow: 0 0 4px #800000;
          }
          75% {
            background: #a52a2a;
            transform: translateY(-24px) scale(0.6);
            opacity: 0.7;
            box-shadow: 0 0 2px #a52a2a;
          }
          100% {
            opacity: 0;
            transform: translateY(-32px) scale(0.2);
            background: #600000;
            box-shadow: 0 0 1px #600000;
          }
        }
        .fire-particle {
          animation: fireRise 2s infinite ease-out;
        }
        .fire-particle:nth-child(2n) { animation-duration: 1.8s; }
        .fire-particle:nth-child(3n) { animation-duration: 2.2s; }
        .fire-particle:nth-child(4n) { animation-duration: 1.6s; }
        .fire-particle:nth-child(5n) { animation-duration: 2.4s; }
        .fire-particle:nth-child(6n) { animation-duration: 1.4s; }
      `}</style>
    </div>
  );
};

function HeaderContent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const authRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  // Redirect admin to dashboard
  useEffect(() => {
    if (profile?.role === 'admin') {
      router.replace('/admin');
    }
  }, [profile?.role, router]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (authRef.current && !authRef.current.contains(e.target as Node)) setDropdownOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolled(y > 20);
          if (y < 100) setIsVisible(true);
          else if (y > lastScrollY) setIsVisible(false);
          else if (lastScrollY - y > 5) setIsVisible(true);
          setLastScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isAdmin = profile?.role === 'admin';

  return (
    <>
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out backdrop-blur-md transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${isScrolled ? 'shadow-2xl border-b border-gray-800/20' : 'shadow-lg border-b border-transparent'}`}
        style={{
          background: isScrolled
            ? 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.95) 50%, rgba(40,40,40,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,30,30,0.9) 50%, rgba(60,60,60,0.9) 100%)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Top Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20 animate-pulse"></div>
          <div className="flex justify-between items-center px-6 md:px-12 lg:px-20 h-10 text-sm relative z-10">
            {/* Left Top */}
            <div className="flex items-center gap-6">
              {['/links', '/about', '/contact'].map((href) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative group transition-all duration-300 ${
                    isActive(href) ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {href.replace('/', '') || 'Home'}
                  <TopFireHighlight isActive={isActive(href)} />
                  {!isActive(href) && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 transition-all duration-300 group-hover:w-full"></span>}
                </Link>
              ))}

              {/* Admin nav if admin */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`relative group transition-all duration-300 ${
                    isActive('/admin') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Admin
                  <TopFireHighlight isActive={isActive('/admin')} />
                </Link>
              )}
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <span className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 py-1.5 px-4 rounded-full text-sm text-gray-200 border border-gray-700/50 shadow-lg truncate max-w-[150px]">
                  {user.user_metadata?.name ?? user.email}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-4 relative">
          <Link href="/" className="group relative">
            <div className="absolute inset-0 bg-red-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"></div>
            <Image src="/LogoWeb.png" alt="Logo" width={200} height={100} className="w-auto h-12 relative z-10 transition-all duration-300 group-hover:scale-105" />
          </Link>

          <nav className="flex items-center gap-2 relative">
            {[
              { href: '/about', label: 'About', dropdown: true },
              { href: '/project', label: 'Project' },
              { href: '/service', label: 'Services' },
              { href: '/contact', label: 'Contact' },
            ].map((item) =>
              item.dropdown ? (
                <div key={item.href} className="relative" ref={aboutRef}>
                  <button
                    onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                    className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 overflow-hidden ${
                      isActive(item.href) || aboutDropdownOpen ? 'text-white shadow-lg' : 'text-gray-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <FaChevronDown className={`text-xs transition-transform duration-300 relative z-10 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                    <FireHighlight isActive={isActive(item.href) || aboutDropdownOpen} />
                  </button>
                  <AboutDropdown isOpen={aboutDropdownOpen} onClose={() => setAboutDropdownOpen(false)} />
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative px-5 py-2.5 rounded-lg transition-all duration-300 overflow-hidden ${
                    isActive(item.href) ? 'text-white shadow-lg' : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <FireHighlight isActive={isActive(item.href)} />
                </Link>
              )
            )}

            {/* Account */}
            <div className="ml-6 relative" ref={authRef}>
              <Button
                variant="ghost"
                className={`group relative w-10 h-10 rounded-lg transition-all duration-300 overflow-hidden ${
                  dropdownOpen ? 'text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUser className="text-sm relative z-10" />
                <FireHighlight isActive={dropdownOpen} />
              </Button>
              {dropdownOpen && <AuthDropdown onClose={() => setDropdownOpen(false)} />}
            </div>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/50 to-transparent"></div>
      </div>
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
