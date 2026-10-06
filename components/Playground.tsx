"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Transmedia() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="transmedia" className="bg-jet text-ivory py-28 md:py-40">
      <div ref={ref} className="max-w-8xl mx-auto px-8 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-[10px] tracking-widest uppercase text-white/20 mb-14"
        >
          Expansión / Transmedia
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif text-[clamp(2rem,4vw,4.5rem)] leading-[1.05]">
              Proyectos que
              <br />
              cruzan los tres
              <br />
              <em>frentes.</em>
            </h2>

            <p className="font-sans text-sm text-white/45 leading-relaxed mt-8 max-w-md">
              Aquí convergen imagen y movimiento, experiencia e identidad. Proyectos integrales donde la narrativa, la interfaz y el sistema visual son una sola cosa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-4"
          >
            {/* En proceso card */}
            <div className="bg-white/[0.04] border border-white/[0.08] p-8 rounded-sm">
              <p className="font-sans text-[10px] tracking-widest uppercase text-white/25 mb-4">En proceso</p>
              <p className="font-serif text-xl text-ivory leading-snug">
                Explorando interacción, transmedia y experiencias digitales.
              </p>
              <span className="inline-block mt-6 font-sans text-[9px] tracking-widest uppercase text-white/20">
                → En construcción
              </span>
            </div>

            {/* Placeholder transmedia project */}
            <div className="relative">
              <div
                className="bg-white/[0.03] border border-white/[0.06] p-8 rounded-sm"
              >
                <p className="font-sans text-[9px] tracking-widest uppercase text-white/20 mb-2">01 + 02 + 03</p>
                <h3 className="font-serif text-2xl text-ivory">Proyecto Transmedia</h3>
                <p className="font-sans text-xs text-white/30 mt-3">
                  Identidad · Interfaz · Audiovisual · 2025
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-jet/80 backdrop-blur-sm text-ivory font-sans text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-sm border border-white/10">
                  En edición
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
