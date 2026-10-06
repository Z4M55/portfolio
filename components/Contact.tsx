"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contacto" className="bg-ivory text-jet py-36 md:py-52">
      <div ref={ref} className="max-w-8xl mx-auto px-8 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-sans text-[10px] tracking-widest uppercase text-jet/20 mb-14"
        >
          Contacto
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-[clamp(3rem,8vw,9rem)] leading-[0.97] text-jet mb-20"
        >
          HAGAMOS
          <br />
          <em>ALGO</em>
          <br />
          QUE VALGA
          <br />
          RECORDAR.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-t border-jet/10 pt-12 grid md:grid-cols-3 gap-10"
        >
          {/* Email */}
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-jet/25 mb-4">Email</p>
            <a
              href="mailto:ssernag5@eafit.edu.co"
              className="group font-serif text-lg md:text-xl text-jet/65 hover:text-jet transition-colors duration-200 flex items-center gap-2"
            >
              ssernag5@eafit.edu.co
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Phone + LinkedIn */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-jet/25 mb-2">Teléfono</p>
              <a
                href="tel:+573172247004"
                className="group font-sans text-sm text-jet/55 hover:text-jet flex items-center gap-2 transition-colors"
              >
                +57 317 224 7004
              </a>
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-jet/25 mb-2">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/samuel-serna-design-interactive-transmedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="group font-sans text-sm text-jet/55 hover:text-jet flex items-center gap-2 transition-colors"
              >
                Samuel Serna
                <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
              </a>
            </div>
          </div>

          {/* CV */}
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-jet/25 mb-4">Hoja de Vida</p>
            <a
              href="https://drive.google.com/file/d/1X3jjnb3uDoBamQiy8Nx1ApW86DKqcxfH/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-jet text-ivory font-sans text-[11px] tracking-widest uppercase px-6 py-3 hover:bg-jet/80 transition-colors duration-200"
            >
              Descargar CV ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
