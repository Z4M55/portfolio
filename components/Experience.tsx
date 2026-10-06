"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="experiencia" className="bg-jet text-ivory py-28 md:py-36">
      <div ref={ref} className="max-w-8xl mx-auto px-8 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-[10px] tracking-widest uppercase text-white/20 mb-14"
        >
          Experiencia
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-[clamp(2rem,4vw,4rem)] leading-[1.05] mb-16"
        >
          Dónde he estado.
        </motion.h2>

        <div className="space-y-0">
          {[
            { period: "2022 – Presente", role: "Diseño Interactivo", org: "Universidad EAFIT", desc: "Formación en diseño centrado en el usuario, experiencias interactivas y sistemas visuales." },
            { period: "2023 – 2024", role: "Laboratorio de Mercadeo", org: "EAFIT", desc: "Diseño de piezas gráficas y estrategias visuales para investigación de mercado." },
            { period: "2022 – 2023", role: "Diseñador", org: "Decathlon", desc: "Comunicación visual y diseño de materiales para punto de venta." },
          ].map((item, i) => (
            <motion.div
              key={item.org}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 py-8 border-t border-white/[0.07]"
            >
              <p className="font-sans text-[10px] tracking-widest uppercase text-white/25">{item.period}</p>
              <div>
                <p className="font-serif text-lg text-ivory">{item.role}</p>
                <p className="font-sans text-sm text-white/40 mt-0.5">{item.org}</p>
              </div>
              <p className="font-sans text-sm text-white/45 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
