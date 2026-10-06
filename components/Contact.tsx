"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" className="bg-jet text-ivory py-36 md:py-52">
      <div ref={ref} className="max-w-8xl mx-auto px-8 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-sans text-[10px] tracking-widest uppercase text-white/20 mb-14"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-[clamp(3rem,8vw,9rem)] leading-[0.97] text-ivory mb-20"
        >
          LET&apos;S CREATE
          <br />
          <em>SOMETHING</em>
          <br />
          WORTH
          <br />
          EXPERIENCING.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-t border-white/10 pt-12 grid md:grid-cols-2 gap-10"
        >
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-white/25 mb-4">
              Email
            </p>
            <a
              href="mailto:ssernag5@eafit.edu.co"
              className="group font-serif text-xl md:text-2xl text-ivory/65 hover:text-ivory transition-colors duration-200 flex items-center gap-3"
            >
              ssernag5@eafit.edu.co
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-sans text-[10px] tracking-widest uppercase text-white/25">
              Elsewhere
            </p>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/tunombre" },
              { label: "Behance", href: "https://behance.net/tunombre" },
              { label: "Dribbble", href: "https://dribbble.com/tunombre" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group font-sans text-xs tracking-widest uppercase text-white/35 hover:text-ivory flex items-center gap-2 transition-colors duration-200 w-fit"
              >
                {link.label}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
