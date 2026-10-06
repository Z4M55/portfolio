"use client";

import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 36 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: d },
  }),
};

const metrics = [
  { value: "04+", label: "Selected Projects" },
  { value: "Interaction", label: "Design Focus" },
  { value: "Medellín", label: "Colombia" },
];

export default function Hero() {
  return (
    <section className="min-h-screen bg-ivory text-jet flex flex-col overflow-hidden">
      {/* Main grid */}
      <div className="flex-1 max-w-8xl mx-auto w-full px-8 md:px-12 pt-32 md:pt-44 pb-12 grid md:grid-cols-12 gap-8 items-center">
        {/* Left — copy */}
        <div className="md:col-span-7 lg:col-span-6">
          <motion.p
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="font-sans text-[11px] tracking-widest uppercase text-jet/40 mb-8"
          >
            Interactive Designer · Medellín, Colombia
          </motion.p>

          <motion.h1
            custom={0.1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="font-serif text-[clamp(3.2rem,7.5vw,8rem)] leading-[1.02] tracking-[-0.02em] text-jet mb-8"
          >
            Designing
            <br />
            <em>experiences</em>
            <br />
            between people,
            <br />
            stories and
            <br />
            technology.
          </motion.h1>

          <motion.p
            custom={0.25}
            variants={fade}
            initial="hidden"
            animate="show"
            className="font-sans text-base md:text-lg text-jet/55 max-w-sm leading-relaxed mb-12"
          >
            Interactive Design student focused on creating digital experiences
            through research, storytelling, interaction and emerging technologies.
          </motion.p>

          <motion.div
            custom={0.35}
            variants={fade}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="font-sans text-[11px] tracking-widest uppercase bg-jet text-ivory px-8 py-4 hover:bg-jet/80 transition-colors duration-300"
            >
              View selected work
            </a>
            <a
              href="#about"
              className="font-sans text-[11px] tracking-widest uppercase text-jet border border-jet/20 px-8 py-4 hover:bg-jet hover:text-ivory transition-all duration-300"
            >
              About me
            </a>
          </motion.div>
        </div>

        {/* Right — portrait */}
        <motion.div
          className="hidden md:flex md:col-span-5 lg:col-span-6 justify-center items-start pt-4 relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Portrait placeholder — elegant typographic treatment */}
          <div className="relative w-full max-w-[420px] aspect-[3/4] bg-jet/[0.04] overflow-hidden">
            {/* Large initials as background element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-serif select-none leading-none text-jet/[0.07]"
                style={{ fontSize: "clamp(10rem,22vw,20rem)" }}
              >
                SS
              </span>
            </div>
            {/* Subtle grid lines */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(#080808 1px, transparent 1px), linear-gradient(90deg, #080808 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent" />
          </div>

          {/* Currently card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="absolute top-6 -right-2 lg:right-4 bg-jet text-ivory p-5 w-44"
          >
            <p className="font-sans text-[10px] tracking-widest uppercase text-white/35 mb-2">
              Currently
            </p>
            <p className="font-sans text-xs text-white/75 leading-relaxed">
              Exploring interaction,
              AI and digital
              experiences.
            </p>
            <p className="font-sans text-sm text-white/25 mt-3">→</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Metrics strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="max-w-8xl mx-auto w-full px-8 md:px-12 py-8 border-t border-jet/10 grid grid-cols-3"
      >
        {metrics.map((m, i) => (
          <div
            key={m.value}
            className={`flex flex-col gap-1 ${
              i > 0 ? "pl-6 md:pl-10 border-l border-jet/10" : ""
            }`}
          >
            <span className="font-serif text-xl md:text-3xl text-jet leading-none">
              {m.value}
            </span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-jet/35">
              {m.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="max-w-8xl mx-auto w-full px-8 md:px-12 pb-6 flex items-center gap-3"
      >
        <div className="w-6 h-px bg-jet/20" />
        <span className="font-sans text-[10px] tracking-widest uppercase text-jet/25">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
