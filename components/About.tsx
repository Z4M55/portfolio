"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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
          Sobre mí / 01
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,5rem)] leading-[1.08] mb-10">
              Diseño para
              <br />
              entender.
              <br />
              Entiendo para
              <br />
              <em>diseñar.</em>
            </h2>

            <div className="space-y-5">
              <p className="font-sans text-sm text-jet/60 leading-relaxed">
                Soy Samuel Serna, diseñador interactivo en formación, interesado en crear experiencias que conecten narrativa, identidad, imagen y tecnología.
              </p>
              <p className="font-sans text-sm text-jet/55 leading-relaxed">
                Mi práctica se mueve entre distintas disciplinas del diseño. Me interesa comprender cada proyecto desde su contexto, construir un concepto sólido y encontrar el medio más adecuado para comunicarlo: desde una identidad visual o una pieza audiovisual hasta una interfaz, un servicio o una experiencia interactiva.
              </p>
              <p className="font-sans text-sm text-jet/55 leading-relaxed">
                Trabajo principalmente desde tres frentes: imagen y movimiento, diseño de experiencias e identidad visual. A partir de ellos también desarrollo proyectos transmedia, donde diferentes medios, formatos e interacciones se articulan para construir una experiencia narrativa más amplia.
              </p>
              <p className="font-sans text-sm text-jet/55 leading-relaxed">
                No entiendo estas disciplinas como áreas aisladas, sino como herramientas que puedo combinar según lo que una historia, una experiencia o un problema necesite.
              </p>

              <div className="pt-6 border-t border-jet/10">
                <p className="font-sans text-[10px] tracking-widest uppercase text-jet/25 mb-2">
                  Actualmente explorando
                </p>
                <p className="font-sans text-sm text-jet/60">
                  Interacción × Transmedia × Comportamiento humano
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src="/portrait.jpg"
                alt="Samuel Serna G."
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="mt-6">
              <p className="font-serif text-lg text-jet">Samuel Serna G.</p>
              <p className="font-sans text-[10px] tracking-widest uppercase text-jet/40 mt-1">
                Diseñador Interactivo · Medellín, Colombia
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
