"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Folder from "./Folder";
import FlipCard from "./FlipCard";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  link?: string;
  loading?: boolean;
}

const categories: { label: string; number: string; color: string; projects: Project[] }[] = [
  {
    label: "Imagen y movimiento",
    number: "01",
    color: "#1a1a1a",
    projects: [
      {
        id: "automotive",
        title: "Entre motores y adrenalina",
        category: "Audio / Diseño Sonoro",
        year: "2025",
        description: "Una experiencia sonora inmersiva que sitúa al oyente dentro de una carrera ficticia. Mezcla de capas de sonido: motores, aceleraciones, neumáticos y ambiente.",
        link: "/Automotive.pdf",
      },
      {
        id: "fotografia",
        title: "Fotografía",
        category: "Fotografía Documental",
        year: "2025",
        description: "Serie fotográfica en desarrollo.",
        loading: true,
      },
      {
        id: "video-motion",
        title: "Video & Motion Graphics",
        category: "Dirección Audiovisual",
        year: "2025",
        description: "Piezas de video y motion graphics en producción.",
        loading: true,
      },
    ],
  },
  {
    label: "Experiencia",
    number: "02",
    color: "#555555",
    projects: [
      {
        id: "ritto",
        title: "Ritto",
        category: "UX/UI Design",
        year: "2024",
        description: "Diseño de interfaz y experiencia de usuario para plataforma digital.",
      },
      {
        id: "binance",
        title: "Binance",
        category: "UI Design",
        year: "2024",
        description: "Proyecto de rediseño en desarrollo.",
        loading: true,
      },
    ],
  },
  {
    label: "Identidad",
    number: "03",
    color: "#E8E4DE",
    projects: [
      {
        id: "lio",
        title: "Branding LIO",
        category: "Branding / Identidad Visual",
        year: "2024",
        description: "Desarrollo de sistema visual e identidad de marca completa para LIO.",
      },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  if (project.loading) {
    return (
      <div className="relative">
        <div
          className="w-full"
          style={{ filter: "blur(3px)", pointerEvents: "none", userSelect: "none" }}
        >
          <FlipCard
            width={240}
            height={320}
            radius={4}
            background="#1c1c1c"
            color="#f2f0ec"
            shadow={false}
            disabled
            front={
              <div className="w-full h-full p-6 flex flex-col justify-between">
                <div>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-white/30">{project.category}</p>
                  <h3 className="font-serif text-xl text-ivory mt-2">{project.title}</h3>
                </div>
                <p className="font-sans text-[10px] text-white/25">{project.year}</p>
              </div>
            }
            back={
              <div className="w-full h-full p-6 flex flex-col justify-between">
                <p className="font-sans text-sm text-white/60 leading-relaxed">{project.description}</p>
                <span className="font-sans text-[10px] tracking-widest uppercase text-white/30">En edición →</span>
              </div>
            }
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="bg-jet/80 backdrop-blur-sm text-ivory font-sans text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-sm border border-white/10">
            En edición
          </span>
        </div>
      </div>
    );
  }

  return (
    <FlipCard
      width={240}
      height={320}
      radius={4}
      background="#1c1c1c"
      color="#f2f0ec"
      shadow={false}
      ariaLabel={`Ver proyecto: ${project.title}`}
      front={
        <div className="w-full h-full p-6 flex flex-col justify-between">
          <div>
            <p className="font-sans text-[9px] tracking-widest uppercase text-white/30">{project.category}</p>
            <h3 className="font-serif text-2xl text-ivory mt-2 leading-tight">{project.title}</h3>
          </div>
          <div className="space-y-1">
            <p className="font-sans text-[9px] text-white/25">{project.year}</p>
            <p className="font-sans text-[9px] tracking-widest uppercase text-white/20">Clic para ver →</p>
          </div>
        </div>
      }
      back={
        <div className="w-full h-full p-6 flex flex-col justify-between bg-[#1c1c1c]">
          <p className="font-sans text-sm text-white/65 leading-relaxed">{project.description}</p>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[10px] tracking-widest uppercase text-ivory/70 hover:text-ivory transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Ver proyecto →
            </a>
          ) : (
            <span className="font-sans text-[10px] tracking-widest uppercase text-white/30">
              Próximamente →
            </span>
          )}
        </div>
      }
    />
  );
}

function CategorySection({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const isDark = index < 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className={`border-t ${isDark ? "border-white/10" : "border-jet/10"}`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between py-8 md:py-10 text-left group ${isDark ? "text-ivory" : "text-jet"}`}
      >
        <div className="flex items-baseline gap-6">
          <span className={`font-sans text-[10px] tracking-widest uppercase ${isDark ? "text-white/25" : "text-jet/25"}`}>
            {cat.number}
          </span>
          <span className="font-serif text-2xl md:text-4xl">{cat.label}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-sans text-[10px] tracking-widest uppercase ${isDark ? "text-white/25" : "text-jet/25"}`}>
            {cat.projects.length} proyectos
          </span>
          <Folder color={cat.color} size={0.6} />
          <span className={`font-sans text-sm transition-transform duration-300 ${open ? "rotate-45" : ""} ${isDark ? "text-white/40" : "text-jet/40"}`}>
            +
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 flex flex-wrap gap-6">
              {cat.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="proyectos" className="bg-jet text-ivory py-24 md:py-36">
      <div className="max-w-8xl mx-auto px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/20 mb-4">Proyectos</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,4rem)] leading-[1.05]">
            Tres frentes.
            <br />
            <em>Un diseñador.</em>
          </h2>
        </motion.div>

        <div>
          {categories.map((cat, i) => (
            <CategorySection key={cat.number} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
