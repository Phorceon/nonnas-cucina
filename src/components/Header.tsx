'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { isSignedIn, user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#1a1510]/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c25e3e] to-[#a04a2e] flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-2xl font-serif">N</span>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold text-[#f5f0eb] tracking-wide">
              Nonna&apos;s Cucina
            </span>
            <span className="text-xs text-[#d4a574] tracking-widest uppercase">
              Authentic Italian
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="relative text-[#f5f0eb] hover:text-[#d4a574] transition-colors duration-300 font-medium tracking-wide group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c25e3e] to-[#d4a574] group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isSignedIn ? (
            <SignInButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                Sign In
              </motion.button>
            </SignInButton>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-[#f5f0eb] text-sm">
                {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </span>
              <SignOutButton>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#1a1510] rounded-md text-sm font-medium transition-all"
                >
                  Sign Out
                </motion.button>
              </SignOutButton>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#f5f0eb]"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : {}}
              className="block w-full h-0.5 bg-current"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : {}}
              className="block w-full h-0.5 bg-current"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : {}}
              className="block w-full h-0.5 bg-current"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1a1510]/98 backdrop-blur-md border-t border-[#3d2914]/30"
          >
            <nav className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[#f5f0eb] hover:text-[#d4a574] transition-colors py-2 font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-[#3d2914]/30">
                {!isSignedIn ? (
                  <SignInButton>
                    <button className="w-full py-3 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium">
                      Sign In
                    </button>
                  </SignInButton>
                ) : (
                  <SignOutButton>
                    <button className="w-full py-3 border border-[#d4a574] text-[#d4a574] rounded-md font-medium">
                      Sign Out
                    </button>
                  </SignOutButton>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
