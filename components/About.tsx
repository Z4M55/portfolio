"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const areas = [
  {
    title: "Design",
    skills: ["Interaction Design", "UX / UI", "Prototyping", "Visual Systems"],
  },
  {
    title: "Research",
    skills: ["User Research", "Interviews", "Usability Testing", "Information Architecture"],
  },
  {
    title: "Exploration",
    skills: ["AI", "Creative Technology", "Interactive Storytelling", "Experimental Interfaces"],
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" className="bg-ivory text-jet py-28 md:py-36">
      <div ref={ref} className="max-w-8xl mx-auto px-8 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-sans text-[10px] tracking-widest uppercase text-jet/35 mb-10"
        >
          About
        </motion.p>

        {/* Headline + bio */}
        <div className="grid md:grid-cols-12 gap-10 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="md:col-span-6"
          >
            <h2 className="font-serif text-[clamp(2.4rem,5vw,5rem)] leading-[1.05]">
              Designer by practice.
              <br />
              <em>Curious by nature.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-6 flex items-center"
          >
            <p className="font-sans text-base md:text-lg text-jet/55 leading-relaxed max-w-lg">
              I&apos;m Samuel, an Interactive Design student interested in how design,
              technology and human behavior can meet to create meaningful experiences.
              I enjoy turning complex ideas into clear interactions — whether through
              digital products, storytelling, research or experimental interfaces.
            </p>
          </motion.div>
        </div>

        {/* Skill areas */}
        <div className="grid md:grid-cols-3 border-t border-jet/10">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
              className={`py-10 px-0 md:px-10 ${
                i < areas.length - 1 ? "md:border-r border-jet/10" : ""
              } ${i > 0 ? "border-t md:border-t-0 border-jet/10" : ""}`}
            >
              <p className="font-sans text-[10px] tracking-widest uppercase text-jet/30 mb-7">
                {area.title}
              </p>
              <ul className="space-y-4">
                {area.skills.map((skill) => (
                  <li key={skill} className="font-serif text-xl md:text-2xl text-jet">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
