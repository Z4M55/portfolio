import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    num: "01",
    title: "Contexto",
    subtitle: "Lo natural nunca había sido tan crujiente.",
    body: "LIO es una propuesta familiar de snacks liofilizados. El proyecto desarrolla su identidad visual y un sistema de empaques para comunicar ingredientes reales, versatilidad y disfrute cotidiano.\n\nEn LIO transformamos ingredientes reales en snacks contemporáneos mediante liofilización: un proceso que preserva sabor, color y textura de forma natural. Gracias a esta técnica, logramos productos ligeros, nutritivos y duraderos, sin necesidad de conservantes ni refrigeración.",
  },
  {
    num: "02",
    title: "Reto",
    subtitle: "Hacer reconocible una marca con varias líneas.",
    body: "Traducir el origen familiar de LIO en una identidad contemporánea y cercana. El desafío consiste en diferenciar fruta, fruta con chocolate y dulces, manteniendo una misma marca y una lectura clara en el empaque.\n\nPilares de la marca: Propósito — Transformar la fruta natural en snacks modernos mediante la liofilización, combinando un sabor intenso, un crujido natural y una identidad basada en el diseño.\n\nVisión — Convertirnos en una marca líder de snacks contemporáneos, reconocida por redefinir los productos liofilizados mediante un diseño modular, experiencias sensoriales y una identidad visual de alta calidad.",
  },
  {
    num: "03",
    title: "Proceso",
    subtitle: "De la estrategia al lenguaje visual.",
    body: "El proceso articula propósito, personalidad y un perfil conceptual de consumo. A partir de esos criterios se definen el logotipo, la mascota, la paleta, la tipografía y las aplicaciones de empaque.\n\nPerfil de usuario: Valentina, 26 años, creadora de contenidos y estratega de marca en Medellín. Valora el bienestar, la estética y el consumo consciente. Busca snacks prácticos, auténticos y versátiles que se adapten a su rutina diaria.\n\nMarcas referentes: Aesop, Glossier, Rhode, Oatly, Nude Project.\n\nLa revisión posterior corrige textos, ordena el sistema y desarrolla frutas vectoriales: 8 frutas, 15 variantes SVG como componentes editables.",
  },
  {
    num: "04",
    title: "Solución",
    subtitle: "Una identidad modular con carácter propio.",
    body: "El logotipo de LIO nace desde la esencia misma de la marca: transformar lo simple en una experiencia con identidad, color e intención. A través de la mascota —la iguana—, la marca aporta cercanía, personalidad y un lenguaje visual vivo que conecta lo natural con lo contemporáneo.\n\nSistema tipográfico:\nOpen Sans · lectura y empaques\nChau Philomene One · acentos y titulares\n\nLíneas de producto:\n• Frutas — sobria, limpia\n• Verduras — fresca, natural\n• Frutas + Chocolate — expresiva, atrevida\n\n15 SKUs con sistema de empaque modular: 10 × 15 cm, información nutricional estandarizada, instrucciones de consumo, identidad de red social.",
  },
  {
    num: "05",
    title: "Impacto",
    subtitle: "Un sistema más claro y reutilizable.",
    body: "El resultado verificable es un manual revisado, una zona organizada de identidad y empaques y 15 activos vectoriales reutilizables. Estas piezas facilitan mantener la coherencia entre variantes y preparar nuevas aplicaciones.\n\nPróximos pasos: comprobar la legibilidad a tamaño real, realizar pruebas de impresión y evaluar si las personas reconocen y diferencian las líneas de producto. Registrar los resultados para sustentar el impacto del caso.\n\nEl proyecto aún no documenta resultados en ventas, percepción de marca o uso: ese impacto requiere validación.",
  },
];

export default function LioPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#1a1a1a]">
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-[#f7f5f0]/95 backdrop-blur-sm border-b border-black/8">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/#proyectos" className="font-sans text-[10px] tracking-widest uppercase text-black/40 hover:text-black transition-colors flex items-center gap-2">
            ← Proyectos
          </Link>
          <span className="font-sans text-[10px] tracking-widest uppercase text-black/20">03 / Identidad Visual</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 space-y-20">

        {/* Hero */}
        <div className="space-y-5">
          <p className="font-sans text-[10px] tracking-widest uppercase text-black/30">
            03 Identidad Visual · Branding · Sistema de empaques · 2024
          </p>
          <h1 className="font-serif text-[clamp(4rem,10vw,9rem)] leading-[0.9] tracking-tight text-black">
            LIO
          </h1>
          <p className="font-serif text-[clamp(1.2rem,2.5vw,2rem)] text-black/50 italic">
            Lo natural nunca había sido tan crujiente.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Branding", "Packaging", "Sistema visual", "15 SKUs", "Liofilización"].map((t) => (
              <span key={t} className="font-sans text-[9px] tracking-widest uppercase px-3 py-1.5 border border-black/15 text-black/45 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        {/* Cover */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black/5">
          <Image src="/projects/lio-cover.png" alt="LIO Branding" fill style={{ objectFit: "cover" }} sizes="(max-width: 1024px) 100vw, 900px" />
        </div>

        {/* Case study sections */}
        <div className="space-y-16">
          {sections.map((s) => (
            <div key={s.num} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12 border-t border-black/8 pt-10">
              <div>
                <p className="font-sans text-[9px] tracking-widest uppercase text-black/25">{s.num} / {s.title}</p>
              </div>
              <div className="space-y-4">
                <h2 className="font-serif text-xl md:text-2xl text-black leading-snug">{s.subtitle}</h2>
                {s.body.split("\n\n").map((para, i) => (
                  <p key={i} className="font-sans text-sm text-black/60 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Manual link */}
        <div className="bg-black/5 border border-black/8 rounded-xl p-8 space-y-4">
          <p className="font-sans text-[9px] tracking-widest uppercase text-black/30">Sistema de identidad completo</p>
          <p className="font-sans text-sm text-black/60">Manual de marca, empaques y 15 variantes SVG disponibles en Figma.</p>
          <a
            href="https://www.figma.com/design/IqssKPNEvOc9KqnXeKl9E4/LIO-PRODUCOTOS?node-id=2-49&t=NGmvy8UF8Gar8lpy-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white font-sans text-[10px] tracking-widest uppercase px-5 py-3 hover:bg-black/70 transition-colors rounded-sm"
          >
            Ver en Figma ↗
          </a>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-black/8 flex items-center justify-between">
          <p className="font-sans text-[10px] tracking-widest uppercase text-black/20">03 Identidad Visual · 2024</p>
          <Link href="/#proyectos" className="font-sans text-[10px] tracking-widest uppercase text-black/30 hover:text-black transition-colors">
            ← Volver a proyectos
          </Link>
        </div>
      </div>
    </main>
  );
}
