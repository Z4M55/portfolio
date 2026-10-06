"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlassIcons from "./GlassIcons";
import TrueFocus from "./TrueFocus";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contacto-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="min-h-screen bg-ivory flex items-center justify-center px-4 md:px-8 pt-24 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.06]"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr]">

          {/* ── Left column ── */}
          <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-between gap-10 min-h-[540px] md:min-h-[600px]">
            <div className="space-y-7">
              {/* TrueFocus headline */}
              <TrueFocus
                sentence="Diseñador Interactivo"
                blurAmount={4}
                borderColor="#080808"
                glowColor="rgba(8,8,8,0.15)"
                animationDuration={0.6}
                pauseBetweenAnimations={1.5}
                className="font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.06] text-jet"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-sans text-sm text-jet/55 leading-relaxed max-w-sm"
              >
                Diseño experiencias que conectan narrativa, identidad, imagen y tecnología. Me muevo entre UX/UI, motion, identidad visual y transmedia.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex items-center gap-3 flex-wrap"
              >
                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-2 bg-jet text-ivory font-sans text-[11px] tracking-widest uppercase px-6 py-3 hover:bg-jet/80 transition-colors duration-200 rounded-sm"
                >
                  Ver proyectos
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 border border-jet/20 text-jet font-sans text-[11px] tracking-widest uppercase px-6 py-3 hover:bg-jet hover:text-ivory transition-all duration-200 rounded-sm"
                >
                  Hablemos
                </a>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-jet/8"
            >
              {[
                { value: "04+", label: "Proyectos" },
                { value: "3+", label: "Años de práctica" },
                { value: "MDE", label: "Medellín, Colombia" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-2xl text-jet">{s.value}</p>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-jet/35 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: iso-cube SVG (top half only) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative min-h-[420px] md:min-h-0 bg-jet overflow-hidden flex items-start justify-center"
          >
            {/* SVG shown only top half — cube emerges from center */}
            <div className="w-full h-full absolute inset-0 flex items-center justify-center p-8">
              <div
                className="w-full"
                style={{ clipPath: "inset(0 0 50% 0)" }}
              >
                <Image
                  src="/icons/iso-cube.svg"
                  alt="Samuel Serna G."
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  style={{ filter: "invert(1) opacity(0.85)" }}
                  priority
                />
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="absolute bottom-6 right-5 md:bottom-8 md:right-8 bg-jet/85 backdrop-blur-md border border-white/10 rounded-xl p-5 max-w-[230px] shadow-xl"
            >
              <div>
                <p className="font-sans text-[9px] tracking-widest uppercase text-white/40 mb-1">
                  Disponible para proyectos
                </p>
                <p className="font-serif text-sm text-ivory leading-snug">
                  Comparte los detalles de tu idea y te responderé con una propuesta.
                </p>
              </div>
              <div className="mt-4">
                <GlassIcons
                  items={[{
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    ),
                    label: "Contactar",
                    color: "dark",
                    onClick: scrollToContact,
                  }]}
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
