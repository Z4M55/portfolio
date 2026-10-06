"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    number: "01",
    id: "lio-manual-marca",
    title: "LIO — Manual de Marca",
    category: "Branding",
    year: "2026",
    description:
      "Manual de marca completo para LIO, marca de productos alimenticios. Sistema visual que abarca estrategia, logotipo, paleta cromática, tipografía y aplicaciones en medios digitales e impresos, redes sociales y merchandise.",
    tags: ["Branding", "Identidad Visual", "Sistema Visual", "Figma"],
    image: "/images/lio-manual-marca.jpg",
    url: "#",
  },
  {
    number: "02",
    id: "temporada-ethel-gilmour",
    title: "Temporada — Archivo Florecido",
    category: "Diseño Editorial",
    year: "2026",
    description:
      "Proyecto editorial y curatorial sobre la obra de Ethel Gilmour, pintora e instaladora colombo-estadounidense. Propuesta de recorrido y montaje expositivo que conecta archivo, memoria y violencia en el arte contemporáneo de Antioquia.",
    tags: ["Editorial", "Curaduría", "Exposición", "Diseño de Experiencia"],
    image: "/images/temporada-ethel-gilmour.jpg",
    url: "#",
  },
  {
    number: "03",
    id: "hilo-circular-renault",
    title: "Hilo Circular — Economía Circular",
    category: "Research & Estrategia",
    year: "2024",
    description:
      "Investigación de mercados para articular los residuos textiles de Renault Sofasa con diseñadores de Medellín mediante modelos de upcycling y downcycling. Propuesta de cadena de valor con impacto ambiental, social y económico en el Valle de Aburrá.",
    tags: ["Market Research", "Estrategia", "Sostenibilidad", "Economía Circular"],
    image: "/images/hilo-circular-renault.jpg",
    url: "#",
  },
  {
    number: "04",
    id: "nuez-pimienta-ux",
    title: "Nuez & Pimienta — Portal Web",
    category: "UX Design",
    year: "2025",
    description:
      "Diseño de portal web para restaurante de alimentación consciente en Medellín. Integración de servicios (reservas, domicilios, eventos) basado en research con arquetipos reales y enfoque en comunicar la esencia de la marca.",
    tags: ["UX Design", "Web Design", "User Research", "Arquetipos"],
    image: "/images/nuez-pimienta-ux.jpg",
    url: "#",
  },
];

function ProjectRow({ p }: { p: (typeof projects)[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-t border-white/10 pt-10 pb-16"
    >
      {/* Meta row */}
      <div className="grid md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-2 hidden md:block">
          <span className="font-serif text-[5rem] leading-none text-white/10 select-none">
            {p.number}
          </span>
        </div>
        <div className="md:col-span-10 flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="font-sans text-[10px] tracking-widest uppercase text-white/35 block mb-1.5">
              {p.category}
            </span>
            <h3 className="font-serif text-[clamp(1.6rem,3.5vw,3rem)] text-ivory leading-tight">
              {p.title}
            </h3>
          </div>
          <span className="font-sans text-sm text-white/25 mt-1">{p.year}</span>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden group mb-8">
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 90vw"
        />
        <div className="absolute inset-0 bg-jet/30 group-hover:bg-jet/15 transition-colors duration-500" />
      </div>

      {/* Description & tags */}
      <div className="grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-2 hidden md:block" />
        <div className="md:col-span-5">
          <p className="font-sans text-sm md:text-base text-white/45 leading-relaxed">
            {p.description}
          </p>
        </div>
        <div className="md:col-span-5 flex flex-col gap-5 md:items-end">
          <div className="flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] tracking-wider uppercase text-white/25 border border-white/10 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={p.url}
            className="group font-sans text-[11px] tracking-widest uppercase text-ivory/50 hover:text-ivory flex items-center gap-2 transition-colors duration-200"
          >
            View case study
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="work" className="bg-jet text-ivory py-28 md:py-36">
      <div className="max-w-8xl mx-auto px-8 md:px-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20"
        >
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/25 mb-5">
            Selected Work
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,5.5vw,5.5rem)] text-ivory leading-[1.05]">
            Projects where
            <br />
            <em>ideas became</em> experiences.
          </h2>
        </motion.div>

        {/* Project list */}
        <div>
          {projects.map((p) => (
            <ProjectRow key={p.id} p={p} />
          ))}
        </div>
        <div className="border-t border-white/10" />
      </div>
    </section>
  );
}
