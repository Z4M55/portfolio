"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PixelCard from "./PixelCard";
import TechText from "./TechText";

export default function Hero() {
  const ref = useRef(null);

  return (
    <section id="inicio" className="min-h-screen bg-ivory text-jet pt-20">
      <div className="max-w-8xl mx-auto px-8 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left column */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-8"
          >
            {/* TechText interactive */}
            <div className="w-full" style={{ height: 100 }}>
              <TechText
                text="Diseña"
                fontSize={80}
                color="#080808"
                accentColor="#080808"
                sweep
                draggable
                selection
                labels={false}
                specks={8}
                speed={0.6}
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            <div className="space-y-6">
              <h1 className="font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] text-jet">
                Samuel Serna G.
                <br />
                <span className="text-jet/40">Diseñador Interactivo</span>
              </h1>

              <p className="font-sans text-sm md:text-base text-jet/55 leading-relaxed max-w-md">
                Me interesa el diseño UX/UI para producto digital, el motion graphics, el front-end y el desarrollo de piezas gráficas y audiovisuales. Busco continuar mi crecimiento profesional a través de proyectos que integren diseño, tecnología y personas.
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-2 bg-jet text-ivory font-sans text-[11px] tracking-widest uppercase px-6 py-3 hover:bg-jet/80 transition-colors duration-200"
                >
                  Ver proyectos →
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 border border-jet/20 text-jet font-sans text-[11px] tracking-widest uppercase px-6 py-3 hover:bg-jet hover:text-ivory transition-all duration-200"
                >
                  Contactar
                </a>
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-jet/10"
            >
              {[
                { value: "04+", label: "Proyectos" },
                { value: "3+", label: "Años de práctica" },
                { value: "MDE", label: "Medellín, Colombia" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-2xl text-jet">{s.value}</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-jet/35 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <PixelCard
              variant="default"
              className="w-full aspect-[3/4] rounded-sm overflow-hidden bg-jet/5 border border-jet/8 flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image src="/portrait.jpg" alt="Samuel Serna G." fill style={{ objectFit: "cover", objectPosition: "top" }} sizes="(max-width: 768px) 100vw, 50vw" priority />
              </div>
            </PixelCard>

            {/* Glassmorphism floating card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="absolute bottom-8 left-4 right-4 md:left-auto md:right-auto md:bottom-12 md:-left-8 bg-white/80 backdrop-blur-md border border-white/60 rounded-sm p-5 shadow-lg max-w-xs"
            >
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 mt-1 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-jet/40 mb-1">Disponible para proyectos</p>
                  <p className="font-serif text-base text-jet leading-tight">
                    Explorando interacción, transmedia y experiencias digitales.
                  </p>
                  <a href="#contacto" className="inline-flex items-center gap-1 mt-3 font-sans text-[10px] tracking-widest uppercase text-jet hover:text-jet/60 transition-colors">
                    Iniciar un proyecto ↗
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
