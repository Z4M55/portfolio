"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Folder from "./Folder";
import OrbitImages from "./OrbitImages";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  shortDesc: string;
  fullDesc: string;
  link?: string;
  linkLabel?: string;
  href?: string;
  cover?: string;
  audio?: string;
  loading?: boolean;
  tags?: string[];
}

const categories: { label: string; sublabel: string; number: string; color: string; projects: Project[] }[] = [
  {
    label: "Imagen y movimiento",
    sublabel: "Audio · Fotografía · Motion",
    number: "01",
    color: "#1a1a1a",
    projects: [
      {
        id: "automotive",
        title: "Entre motores y adrenalina",
        category: "Audio · Diseño Sonoro",
        year: "2025",
        shortDesc: "Experiencia sonora inmersiva dentro de una carrera ficticia.",
        fullDesc:
          "Este proyecto propone una experiencia sonora inmersiva que sitúa al oyente dentro de una carrera ficticia entre Alex y Marco. A través de sus diálogos y de los sonidos del entorno, la narración transmite la expectativa antes de arrancar, la tensión de las curvas y la emoción de llegar al final.\n\nLa propuesta utiliza Adobe Audition para editar las voces y construir una mezcla con distintas capas de sonido: motores, aceleraciones, neumáticos sobre el asfalto, viento y ambiente de carretera. El movimiento del sonido entre los canales estéreo permite representar la posición de los vehículos y sus adelantamientos, mientras los cambios de volumen y las pausas refuerzan la sensación de velocidad y cercanía.",
        audio: "/projects/automotive.mp3",
        cover: "/projects/automotive-cover.jpg",
        href: "/projects/automotive",
        tags: ["Adobe Audition", "Sound Design", "Narrativa"],
      },
      {
        id: "esperando-a-olivia",
        title: "Esperando a Olivia",
        category: "Fotografía Documental",
        year: "2025",
        shortDesc: "Un registro de la espera, la cercanía y la transformación de una familia antes de recibir a su hija.",
        fullDesc: "Serie fotográfica familiar que documenta la espera de una hija desde una mirada íntima y natural. El proyecto captura la conexión entre los padres, la expectativa y los pequeños gestos que acompañan esta etapa, construyendo un recuerdo visual cálido y atemporal.",
        cover: "/projects/olivia/img_1.jpeg",
        href: "/projects/esperando-a-olivia",
        tags: ["Fotografía", "Documental", "Serie familiar"],
      },
      {
        id: "video-motion",
        title: "Video & Motion Graphics",
        category: "Dirección Audiovisual",
        year: "2025",
        shortDesc: "Piezas de video y motion graphics en producción.",
        fullDesc: "Proyecto en producción.",
        loading: true,
      },
    ],
  },
  {
    label: "Experiencia",
    sublabel: "UX/UI · Prototipo · Interacción",
    number: "02",
    color: "#555555",
    projects: [
      {
        id: "ritto",
        title: "Ritto",
        category: "UX/UI · Prototipo",
        year: "2024",
        shortDesc: "Lo cotidiano es el escenario.",
        fullDesc:
          "Ritto es una aplicación UX/UI diseñada para creativos audiovisuales de Medellín. El proyecto propone una escenografía más accesible, sostenible y cercana: menos distancia entre la idea y el escenario.\n\nLa plataforma conecta directores, productores y técnicos con espacios y recursos para la producción audiovisual. El diseño parte de una investigación sobre los flujos de trabajo actuales y los puntos de fricción en la búsqueda de locaciones.\n\nProyecto conceptual · Prototipo UX/UI · Medellín\nAutoría: Celeste Gómez + Samuel Serna G.",
        link: "https://www.figma.com/design/fSLuq0OZvqvzX8cvMIRRyk/Ritto?node-id=4009-833&t=Hfe1sIOPu6M2pfIp-1",
        linkLabel: "Ver prototipo en Figma",
        href: "/projects/ritto",
        cover: "/projects/ritto-cover.png",
        tags: ["Figma", "UX Research", "Prototipo"],
      },
    ],
  },
  {
    label: "Identidad Visual",
    sublabel: "Branding · Sistemas Gráficos",
    number: "03",
    color: "#E8E4DE",
    projects: [
      {
        id: "lio",
        title: "LIO",
        category: "Branding · Identidad Visual",
        year: "2024",
        shortDesc: "Lo natural nunca había sido tan crujiente.",
        fullDesc:
          "LIO es una marca de snacks liofilizados que convierte frutas y verduras en productos crujientes, naturales y saludables. El proyecto abarcó el desarrollo completo del sistema de identidad visual: naming, logotipo, paleta cromática, tipografía, packaging y manual de marca.\n\nEl sistema visual refleja la naturaleza del proceso de liofilización: lo orgánico transformado en algo nuevo, preservando su esencia. Se desarrollaron 15 SKUs organizados en 3 líneas de producto: Frutas, Verduras, y Frutas + Chocolate.\n\nCada línea tiene su propio lenguaje visual dentro del sistema, manteniendo coherencia de marca en todos los puntos de contacto.",
        link: "https://www.figma.com/design/IqssKPNEvOc9KqnXeKl9E4/LIO-PRODUCOTOS?node-id=2-49&t=NGmvy8UF8Gar8lpy-1",
        linkLabel: "Ver sistema de identidad",
        href: "/projects/lio",
        cover: "/projects/lio-cover.png",
        tags: ["Branding", "Packaging", "Figma", "15 SKUs"],
      },
    ],
  },
];

/* ── Project Detail Modal ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-jet/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 bg-[#111] text-ivory w-full md:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl md:rounded-2xl"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          {/* Close */}
          <div className="sticky top-0 z-10 flex justify-between items-center px-8 py-5 border-b border-white/8 bg-[#111]">
            <div>
              <p className="font-sans text-[9px] tracking-widest uppercase text-white/30">{project.category}</p>
              <h2 className="font-serif text-xl text-ivory mt-0.5">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-ivory transition-colors rounded-full border border-white/10"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="px-8 py-8 space-y-8">
            {/* Cover */}
            {project.cover && (
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="700px"
                />
              </div>
            )}

            {/* Tags */}
            {project.tags && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="font-sans text-[9px] tracking-widest uppercase px-3 py-1.5 border border-white/15 text-white/45 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="space-y-4">
              {project.fullDesc.split("\n\n").map((para, i) => (
                <p key={i} className="font-sans text-sm text-white/65 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Audio player */}
            {project.audio && (
              <div className="space-y-3">
                <p className="font-sans text-[9px] tracking-widest uppercase text-white/30">Escuchar pieza</p>
                <audio
                  controls
                  className="w-full rounded-lg"
                  style={{ accentColor: "#F2F0EC" }}
                >
                  <source src={project.audio} type="audio/mpeg" />
                  Tu navegador no soporta audio.
                </audio>
              </div>
            )}

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-[11px] tracking-widest uppercase px-6 py-3 bg-ivory text-jet hover:bg-ivory/80 transition-colors rounded-sm"
              >
                {project.linkLabel ?? "Ver proyecto"} ↗
              </a>
            )}

            <div className="pt-2 pb-2 flex items-center justify-between border-t border-white/8">
              <span className="font-sans text-[9px] tracking-widest uppercase text-white/20">{project.year}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  if (project.loading) {
    return (
      <div className="relative w-[220px] h-[300px] rounded overflow-hidden" style={{ filter: "blur(3px)", pointerEvents: "none", userSelect: "none" }}>
        <div className="w-full h-full bg-[#1c1c1c] p-5 flex flex-col justify-between">
          <p className="font-sans text-[9px] tracking-widest uppercase text-white/25">{project.category}</p>
          <p className="font-sans text-[9px] text-white/20">{project.year}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-jet/80 backdrop-blur-sm text-ivory font-sans text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-sm border border-white/10">
            En edición
          </span>
        </div>
      </div>
    );
  }

  const cardContent = (
    <div className="w-[220px] flex-shrink-0 bg-[#141414] rounded overflow-hidden border border-white/[0.07] group transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      {/* Cover image */}
      {project.cover ? (
        <div className="relative h-[160px] overflow-hidden">
          <Image src={project.cover} alt={project.title} fill style={{ objectFit: "cover" }} sizes="220px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 to-transparent" />
        </div>
      ) : (
        <div className="h-[160px] bg-[#1c1c1c] flex items-center justify-center">
          <p className="font-serif text-2xl text-white/20">{project.category.slice(0, 2)}</p>
        </div>
      )}

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <p className="font-sans text-[9px] tracking-widest uppercase text-white/25 mb-1">{project.category}</p>
          <h3 className="font-serif text-base text-ivory leading-snug">{project.title}</h3>
          <p className="font-sans text-[10px] text-white/35 mt-1 leading-relaxed line-clamp-2">{project.shortDesc}</p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.07]">
          <span className="font-sans text-[9px] text-white/20">{project.year}</span>
          <span className="font-sans text-[9px] tracking-widest uppercase text-white/50 group-hover:text-ivory transition-colors">
            Ver →
          </span>
        </div>
      </div>
    </div>
  );

  if (project.href) {
    return (
      <a href={project.href} className="block no-underline" style={{ textDecoration: "none" }}>
        {cardContent}
      </a>
    );
  }

  return (
    <button
      onClick={onOpen}
      className="text-left block"
      aria-label={`Abrir proyecto: ${project.title}`}
    >
      {cardContent}
    </button>
  );
}

/* ── Category Section ── */
function CategorySection({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const isDark = true; // always on jet background

  return (
    <>
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
          <div className="flex items-baseline gap-5">
            <span className={`font-sans text-[10px] tracking-widest uppercase ${isDark ? "text-white/25" : "text-jet/25"}`}>
              {cat.number}
            </span>
            <div>
              <span className="font-serif text-2xl md:text-4xl">{cat.label}</span>
              <p className={`font-sans text-[10px] tracking-widest uppercase mt-1 ${isDark ? "text-white/20" : "text-jet/20"}`}>
                {cat.sublabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`font-sans text-[10px] tracking-widest uppercase hidden md:block ${isDark ? "text-white/20" : "text-jet/20"}`}>
              {cat.projects.filter((p) => !p.loading).length} proyecto{cat.projects.filter((p) => !p.loading).length !== 1 ? "s" : ""}
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
              <div className="pb-12 flex flex-wrap gap-5">
                {cat.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={() => setActiveProject(project)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
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

        {/* Orbit preview of projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 -mx-4"
        >
          <OrbitImages
            images={[
              { src: "/projects/automotive-cover.jpg", alt: "Entre motores y adrenalina", href: "/projects/automotive" },
              { src: "/projects/ritto-cover.png", alt: "Ritto", href: "/projects/ritto" },
              { src: "/projects/lio-cover.png", alt: "LIO", href: "/projects/lio" },
              { src: "/projects/olivia/img_1.jpeg", alt: "Esperando a Olivia", href: "/projects/esperando-a-olivia" },
            ]}
            radiusX={320}
            radiusY={110}
            duration={26}
            itemSize={110}
            direction={1}
          />
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
