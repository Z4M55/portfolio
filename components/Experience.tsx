"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    period: "2022 — Present",
    role: "Interactive Design",
    org: "EAFIT University",
    desc: "Undergraduate program in Interaction Design — exploring UX, digital products, creative technology and human-centered design methodologies.",
  },
  {
    period: "2023 — 2024",
    role: "Research / Marketing / Design",
    org: "Marketing Laboratory · EAFIT",
    desc: "Applied research, campaign design and strategic communication projects within the university's marketing lab.",
  },
  {
    period: "2022 — 2023",
    role: "Sales Advisor",
    org: "Decathlon",
    desc: "Customer experience, product communication and sales in a high-volume retail environment.",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="experience" className="bg-jet text-ivory py-28 md:py-36">
      <div ref={ref} className="max-w-8xl mx-auto px-8 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-sans text-[10px] tracking-widest uppercase text-white/25 mb-10"
        >
          Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="font-serif text-[clamp(2rem,4.5vw,4.5rem)] text-ivory mb-20 leading-tight"
        >
          Where I&apos;ve been.
        </motion.h2>

        <div>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08 * i }}
              className="border-t border-white/10 py-10 grid md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-3">
                <span className="font-sans text-xs text-white/25 tracking-wide">
                  {exp.period}
                </span>
              </div>
              <div className="md:col-span-4">
                <p className="font-serif text-xl md:text-2xl text-ivory mb-1.5">
                  {exp.role}
                </p>
                <p className="font-sans text-sm text-white/35">{exp.org}</p>
              </div>
              <div className="md:col-span-5">
                <p className="font-sans text-sm text-white/45 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
