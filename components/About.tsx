"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="sobre-mi" className="bg-ivory text-jet py-28 md:py-40">
      <div ref={ref} className="max-w-8xl mx-auto px-8 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-[10px] tracking-widest uppercase text-jet/30 mb-14"
        >
          ABOUT / 01
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,5rem)] leading-[1.08]">
              I DESIGN TO
              <br />
              UNDERSTAND.
              <br />
              AND I UNDERSTAND
              <br />
              <em>TO DESIGN.</em>
            </h2>
          </motion.div>

          {/* Right: portrait + bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Portrait placeholder */}
            <div className="w-full aspect-[3/4] bg-jet/5 border border-jet/8 flex items-center justify-center rounded-sm">
              <span className="font-serif text-6xl text-jet/10">SS</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-serif text-xl text-jet">Samuel Serna</p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-jet/40 mt-1">
                  Interactive Designer · Medellín, Colombia
                </p>
              </div>

              <p className="font-sans text-sm text-jet/55 leading-relaxed">
                Me interesa el diseño UX/UI para producto digital, el motion graphics, el front-end y el desarrollo de piezas gráficas y audiovisuales. Busco continuar mi crecimiento profesional a través de proyectos que integren diseño, tecnología y personas.
              </p>

              <div className="pt-4 border-t border-jet/10">
                <p className="font-sans text-[10px] tracking-widest uppercase text-jet/25 mb-2">
                  Currently exploring
                </p>
                <p className="font-sans text-sm text-jet/60">
                  Interaction × AI × Human behavior
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
