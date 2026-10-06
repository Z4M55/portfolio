import Image from "next/image";
import Link from "next/link";

export default function AutomotivePage() {
  return (
    <main className="min-h-screen bg-jet text-ivory">
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-jet/95 backdrop-blur-sm border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/#proyectos" className="font-sans text-[10px] tracking-widest uppercase text-white/40 hover:text-ivory transition-colors flex items-center gap-2">
            ← Proyectos
          </Link>
          <span className="font-sans text-[10px] tracking-widest uppercase text-white/20">01 / Imagen y movimiento</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 space-y-20">

        {/* Hero */}
        <div className="space-y-6">
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/25">Audio · Diseño Sonoro · 2025</p>
          <h1 className="font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1.04]">
            Entre motores<br />y adrenalina
          </h1>
          <div className="flex flex-wrap gap-2">
            {["Adobe Audition", "Sound Design", "Narrativa Sonora", "Estéreo"].map((t) => (
              <span key={t} className="font-sans text-[9px] tracking-widest uppercase px-3 py-1.5 border border-white/15 text-white/45 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        {/* Cover image */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
          <Image src="/projects/automotive-cover.jpg" alt="Entre motores y adrenalina" fill style={{ objectFit: "cover" }} sizes="(max-width: 1024px) 100vw, 900px" />
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <div>
            <p className="font-sans text-[9px] tracking-widest uppercase text-white/25 mb-3">Presentación</p>
          </div>
          <div className="space-y-5">
            <p className="font-sans text-base text-white/70 leading-relaxed">
              Este proyecto propone una experiencia sonora inmersiva que sitúa al oyente dentro de una carrera ficticia entre Alex y Marco. A través de sus diálogos y de los sonidos del entorno, la narración transmite la expectativa antes de arrancar, la tensión de las curvas y la emoción de llegar al final.
            </p>
            <p className="font-sans text-base text-white/65 leading-relaxed">
              La propuesta utiliza Adobe Audition para editar las voces y construir una mezcla con distintas capas de sonido: motores, aceleraciones, neumáticos sobre el asfalto, viento y ambiente de carretera. El movimiento del sonido entre los canales estéreo permite representar la posición de los vehículos y sus adelantamientos, mientras los cambios de volumen y las pausas refuerzan la sensación de velocidad y cercanía.
            </p>
            <p className="font-sans text-base text-white/65 leading-relaxed">
              El objetivo es que el público experimente la historia desde el sonido, sin depender de imágenes. Las voces aportan el vínculo emocional entre los personajes y los efectos construyen el espacio que los rodea. Así, la pieza explora cómo el diseño sonoro puede transformar una conversación en una escena que el oyente imagina y siente.
            </p>
          </div>
        </div>

        {/* Audio player */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
          <p className="font-sans text-[9px] tracking-widest uppercase text-white/30">Escuchar la pieza</p>
          <p className="font-serif text-xl text-ivory">Entre motores y adrenalina</p>
          <audio controls className="w-full mt-2" style={{ accentColor: "#F2F0EC" }}>
            <source src="/projects/automotive.mp3" type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <p className="font-sans text-[9px] tracking-widest uppercase text-white/25">Imágenes del proyecto</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/projects/automotive-1.jpg" alt="Automotive 1" fill style={{ objectFit: "cover" }} sizes="450px" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/projects/automotive-2.jpg" alt="Automotive 2" fill style={{ objectFit: "cover" }} sizes="450px" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/8 flex items-center justify-between">
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/20">Samuel Serna G. · 2025</p>
          <Link href="/#proyectos" className="font-sans text-[10px] tracking-widest uppercase text-white/30 hover:text-ivory transition-colors">
            ← Volver a proyectos
          </Link>
        </div>
      </div>
    </main>
  );
}
