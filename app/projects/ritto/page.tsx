import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    num: "01",
    title: "Contexto",
    subtitle: "La ciudad como punto de partida.",
    body: "Medellín es escenario de la creación musical y un entorno lleno de objetos, calles y espacios con significado. Ritto parte de una oportunidad: aprovechar esa identidad cotidiana frente a las recreaciones artificiales de muchas producciones.",
  },
  {
    num: "02",
    title: "Reto",
    subtitle: "Convertir lo cotidiano en una herramienta creativa.",
    body: "Diseñar una herramienta que ayude a equipos audiovisuales a descubrir y resignificar objetos y espacios urbanos, manteniendo coherencia visual y facilitando la colaboración.\n\n¿Cómo ayudar a los equipos creativos a encontrar, resignificar y coordinar recursos cotidianos para sus producciones audiovisuales?",
  },
  {
    num: "03",
    title: "Proceso — Investigación",
    subtitle: "Lo cercano también puede ser memorable.",
    body: "El hallazgo del proyecto propone que los elementos cotidianos favorecen la cercanía emocional con la audiencia. La oportunidad: convertir esa familiaridad en una herramienta de dirección de arte.\n\nIndagación: entrevistas y referentes para comprender la creación escenográfica. Asimilación: brief, «Entorno simbólico» e identidad. Potenciación: traducción de necesidades en un recorrido UX/UI para explorar recursos y conectar con profesionales.\n\nReferentes: Bad Bunny, Feid y J Balvin. Homólogos: Efecto Perfecto, El Sótano Studio y Alto Studios.",
  },
  {
    num: "04",
    title: "Solución",
    subtitle: "Explorar. Componer. Conectar.",
    body: "La propuesta UX/UI organiza el trabajo creativo: explorar elementos y locaciones, definir una paleta, encontrar referentes y contactar colaboradores. El sistema visual sostiene una experiencia cercana y coherente.\n\n01 / Encontrar una locación\n02 / Definir el color\n03 / Conectar con creativos",
  },
  {
    num: "05",
    title: "Impacto",
    subtitle: "Menos distancia entre la idea y el escenario.",
    body: "Aporte de experiencia: un recorrido UX/UI que conecta recursos urbanos con profesionales creativos. Aporte de identidad: un concepto y un lenguaje visual que articulan el proyecto.\n\nImpacto esperado: una escenografía más accesible, sostenible y cercana.\n\nValidación pendiente: no se aportaron métricas de adopción. El siguiente paso es probar el recorrido con usuarios y desarrollar las guías, RA y comparación antes/después.",
  },
];

export default function RittoPage() {
  return (
    <main className="min-h-screen bg-[#211F1C] text-[#CBC7B7]">
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-[#211F1C]/95 backdrop-blur-sm border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/#proyectos" className="font-sans text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-2">
            ← Proyectos
          </Link>
          <span className="font-sans text-[10px] tracking-widest uppercase text-white/20">02 / Experiencia</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 space-y-20">

        {/* Hero */}
        <div className="space-y-5">
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/25">
            02 Experiencia · UX · UI · Creación Escenográfica · 2024
          </p>
          <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.97] tracking-tight text-white">
            RITTO
          </h1>
          <p className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] text-[#CBC7B7]/70 italic">
            Lo cotidiano es el escenario.
          </p>

          {/* Color palette */}
          <div className="flex gap-3 pt-4">
            {[{ hex: "#BC1823", name: "Rojo" }, { hex: "#CBC7B7", name: "Crema" }, { hex: "#211F1C", name: "Negro" }].map((c) => (
              <div key={c.hex} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-white/20" style={{ background: c.hex }} />
                <span className="font-sans text-[9px] tracking-widest uppercase text-white/35">{c.hex}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {["#Música", "#Escenografía", "#ArteEnCiudadDeMedellín", "#DiseñoDeSets"].map((t) => (
              <span key={t} className="font-sans text-[9px] px-3 py-1.5 border border-white/15 text-white/40 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        {/* Cover */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#BC1823]/20">
          <Image src="/projects/ritto-cover.png" alt="Ritto" fill style={{ objectFit: "cover" }} sizes="(max-width: 1024px) 100vw, 900px" />
        </div>

        {/* Intro */}
        <div className="max-w-2xl">
          <p className="font-sans text-base text-[#CBC7B7]/70 leading-relaxed">
            Una propuesta digital para transformar objetos y espacios de Medellín en escenografías musicales con identidad.
          </p>
        </div>

        {/* Case study sections */}
        <div className="space-y-16">
          {sections.map((s) => (
            <div key={s.num} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12 border-t border-white/8 pt-10">
              <div>
                <p className="font-sans text-[9px] tracking-widest uppercase text-white/20">{s.num} / {s.title}</p>
              </div>
              <div className="space-y-4">
                <h2 className="font-serif text-xl md:text-2xl text-white leading-snug">{s.subtitle}</h2>
                {s.body.split("\n\n").map((para, i) => (
                  <p key={i} className="font-sans text-sm text-[#CBC7B7]/65 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Credits + link */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
          <p className="font-sans text-[9px] tracking-widest uppercase text-white/25">Créditos</p>
          <p className="font-sans text-sm text-white/60">Autoría: Celeste Gómez + Samuel Serna G.</p>
          <p className="font-sans text-[9px] text-white/30">Proyecto conceptual · Prototipo UX/UI · Medellín</p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="https://www.figma.com/design/fSLuq0OZvqvzX8cvMIRRyk/Ritto?node-id=4009-833&t=Hfe1sIOPu6M2pfIp-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#BC1823] text-white font-sans text-[10px] tracking-widest uppercase px-5 py-3 hover:bg-[#BC1823]/80 transition-colors rounded-sm"
            >
              Ver prototipo en Figma ↗
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/8 flex items-center justify-between">
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/20">02 Experiencia · 2024</p>
          <Link href="/#proyectos" className="font-sans text-[10px] tracking-widest uppercase text-white/30 hover:text-white transition-colors">
            ← Volver a proyectos
          </Link>
        </div>
      </div>
    </main>
  );
}
