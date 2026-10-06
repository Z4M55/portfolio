"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const items = [
  {
    title: "AI Experiments",
    desc: "Exploring generative interfaces and prompt-driven interactions.",
    tag: "AI",
    col: "md:col-span-7",
  },
  {
    title: "Visual Explorations",
    desc: "Typographic systems, grids and editorial compositions.",
    tag: "Visual",
    col: "md:col-span-5",
  },
  {
    title: "Micro Interactions",
    desc: "Small moments of feedback that shape how digital objects feel.",
    tag: "Motion",
    col: "md:col-span-5",
  },
  {
    title: "Prototype Concepts",
    desc: "Rapid prototypes testing interaction patterns and novel flows.",
    tag: "Proto",
    col: "md:col-span-7",
  },
  {
    title: "Generative Graphics",
    desc: "Code-driven visuals and algorithmic compositions.",
    tag: "Code",
    col: "md:col-span-4",
  },
  {
    title: "Interface Experiments",
    desc: "Speculative UI explorations outside conventional screens.",
    tag: "UI",
    col: "md:col-span-8",
  },
];

export default function Playground() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="playground" className="bg-ivory text-jet py-28 md:py-36">
      <div ref={ref} className="max-w-8xl mx-auto px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          className="mb-16"
        >
          <p className="font-sans text-[10px] tracking-widest uppercase text-jet/30 mb-5">
            Playground
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,5rem)] leading-[1.05]">
            Experiments, unfinished
            <br />
            <em>ideas</em> and things I build to learn.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.06 * i }}
              className={`${item.col} group bg-jet/[0.04] border border-jet/[0.08] p-8 hover:bg-jet hover:border-jet transition-all duration-500 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-sans text-[10px] tracking-widest uppercase text-jet/30 group-hover:text-white/35 transition-colors duration-300">
                  {item.tag}
                </span>
                <span className="font-sans text-sm text-jet/20 group-hover:text-white/20 transition-colors duration-300 group-hover:translate-x-1 inline-block transition-transform">
                  →
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-jet group-hover:text-ivory mb-3 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-jet/45 group-hover:text-white/45 leading-relaxed transition-colors duration-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
