import Link from "next/link";
import CircularCarousel from "@/components/CircularCarousel";
import type { CarouselItem } from "@/components/CircularCarousel";

const photos: CarouselItem[] = [
  { src: "/projects/olivia/img_0.jpeg", alt: "Esperando a Olivia 1", title: "01", subtitle: "Espera" },
  { src: "/projects/olivia/img_1.jpeg", alt: "Esperando a Olivia 2", title: "02", subtitle: "Cercanía" },
  { src: "/projects/olivia/img_3.jpeg", alt: "Esperando a Olivia 3", title: "03", subtitle: "Conexión" },
  { src: "/projects/olivia/img_4.jpeg", alt: "Esperando a Olivia 4", title: "04", subtitle: "Gesto" },
  { src: "/projects/olivia/img_5.jpeg", alt: "Esperando a Olivia 5", title: "05", subtitle: "Luz" },
  { src: "/projects/olivia/img_6.jpeg", alt: "Esperando a Olivia 6", title: "06", subtitle: "Textura" },
  { src: "/projects/olivia/img_7.jpeg", alt: "Esperando a Olivia 7", title: "07", subtitle: "Tiempo" },
  { src: "/projects/olivia/img_8.jpeg", alt: "Esperando a Olivia 8", title: "08", subtitle: "Espacio" },
  { src: "/projects/olivia/img_09.jpeg", alt: "Esperando a Olivia 9", title: "09", subtitle: "Detalle" },
  { src: "/projects/olivia/img_10.jpeg", alt: "Esperando a Olivia 10", title: "10", subtitle: "Silencio" },
  { src: "/projects/olivia/img_11.jpeg", alt: "Esperando a Olivia 11", title: "11", subtitle: "Presencia" },
  { src: "/projects/olivia/img_12.jpeg", alt: "Esperando a Olivia 12", title: "12", subtitle: "Llegada" },
];

export default function EsperandoAOlivia() {
  return (
    <main className="min-h-screen bg-[#0e0c0a] text-[#e8e3dc]">
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-[#0e0c0a]/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/#proyectos" className="font-sans text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-2">
            ← Proyectos
          </Link>
          <span className="font-sans text-[10px] tracking-widest uppercase text-white/20">01 / Imagen y movimiento</span>
        </div>
      </div>

      {/* Full-height carousel */}
      <div style={{ height: "85vh" }}>
        <CircularCarousel
          items={photos}
          preset="orbit"
          intro="rise"
          cardWidth={280}
          aspectRatio={0.75}
          gap={30}
          speed={10}
          autoplay="drift"
          direction="left"
          depthFade={0.4}
          fadeColor="#0e0c0a"
          innerShade={0.25}
          captions
          cornerRadius={10}
          className="w-full h-full"
        />
      </div>

      {/* Description */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 space-y-16">

        {/* Hero text */}
        <div className="space-y-5">
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/25">
            01 Imagen y movimiento · Fotografía Documental · 2026
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[1.0] tracking-tight">
            Esperando<br />a Olivia
          </h1>
          <p className="font-serif text-[clamp(1.1rem,2vw,1.5rem)] text-[#e8e3dc]/55 italic">
            Un registro de la espera, la cercanía y la transformación.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Fotografía Documental", "Serie familiar", "Íntimo", "Natural", "2025"].map((t) => (
              <span key={t} className="font-sans text-[9px] tracking-widest uppercase px-3 py-1.5 border border-white/10 text-white/35 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        {/* Long description */}
        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-16 border-t border-white/[0.07] pt-10">
          <p className="font-sans text-[9px] tracking-widest uppercase text-white/20">Sobre el proyecto</p>
          <div className="space-y-5">
            <p className="font-sans text-base text-[#e8e3dc]/65 leading-relaxed">
              Serie fotográfica familiar que documenta la espera de una hija desde una mirada íntima y natural. El proyecto busca capturar la conexión entre los padres e hija, la expectativa y los pequeños gestos que acompañan esta etapa, construyendo un recuerdo visual cálido y atemporal antes de su llegada.
            </p>
            <p className="font-sans text-base text-[#e8e3dc]/55 leading-relaxed">
              A través de una fotografía natural y sensible, el proyecto convierte un momento cotidiano en una memoria visual íntima y duradera. Cada imagen busca la luz disponible, los gestos no ensayados y las texturas del día a día: el trabajo de la fotografía documental en su estado más honesto.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-16 border-t border-white/[0.07] pt-10">
          <p className="font-sans text-[9px] tracking-widest uppercase text-white/20">Proceso</p>
          <div className="space-y-5">
            <p className="font-sans text-base text-[#e8e3dc]/65 leading-relaxed">
              Fotografía en condiciones reales de luz y espacio. Sin set, sin posados dirigidos. La cámara como testigo: presente pero discreto, atento a los momentos que ocurren sin aviso. El resultado es una serie de 12 imágenes que forman un relato visual continuo.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/[0.07] flex items-center justify-between">
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/20">Samuel Serna G. · 2026</p>
          <Link href="/#proyectos" className="font-sans text-[10px] tracking-widest uppercase text-white/30 hover:text-white transition-colors">
            ← Volver a proyectos
          </Link>
        </div>
      </div>
    </main>
  );
}
