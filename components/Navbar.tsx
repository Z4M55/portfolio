"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#playground", label: "Playground" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-jet/96 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto px-8 md:px-12 h-20 flex items-center justify-between">
          <Link
            href="/"
            className={`font-serif text-2xl tracking-tight transition-colors duration-300 ${
              scrolled ? "text-ivory" : "text-jet"
            }`}
          >
            SS
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`font-sans text-[11px] tracking-widest uppercase transition-colors duration-300 ${
                    scrolled
                      ? "text-white/40 hover:text-ivory"
                      : "text-jet/40 hover:text-jet"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className={`hidden md:inline-flex font-sans text-[11px] tracking-widest uppercase px-5 py-3 border transition-all duration-300 ${
              scrolled
                ? "text-ivory border-white/20 hover:bg-ivory hover:text-jet"
                : "text-jet border-jet/20 hover:bg-jet hover:text-ivory"
            }`}
          >
            Let&apos;s work together
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-[5px] p-2"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-px transition-all duration-300 ${
                  scrolled ? "bg-ivory" : "bg-jet"
                } ${
                  menuOpen
                    ? i === 0
                      ? "w-6 rotate-45 translate-y-[7px]"
                      : i === 1
                      ? "w-6 opacity-0"
                      : "w-6 -rotate-45 -translate-y-[7px]"
                    : "w-6"
                }`}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 inset-x-0 z-40 bg-jet/97 backdrop-blur-md border-b border-white/10 md:hidden"
          >
            <div className="px-8 py-8 flex flex-col gap-6">
              {[...links, { href: "#contact", label: "Contact" }].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-xs tracking-widest uppercase text-white/50 hover:text-ivory transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
