"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  "UX/UI · Diseño de producto",
  "Branding · Identidad visual",
  "Motion · Video",
  "Diseño sonoro",
  "Proyecto transmedia",
  "Otro",
];

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const [form, setForm] = useState({ nombre: "", correo: "", servicio: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nCorreo: ${form.correo}\nServicio: ${form.servicio}\n\n${form.mensaje}`
    );
    window.location.href = `mailto:ssernag5@eafit.edu.co?subject=Proyecto%20—%20${encodeURIComponent(form.servicio || "Consulta")}&body=${body}`;
    setSent(true);
  };

  const inputCls =
    "w-full bg-transparent border border-jet/15 font-sans text-sm text-jet placeholder:text-jet/30 px-5 py-4 focus:outline-none focus:border-jet/40 transition-colors duration-200 rounded-sm";

  return (
    <section id="contacto-form" className="bg-ivory text-jet py-28 md:py-40 border-t border-jet/8">
      <div ref={ref} className="max-w-8xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="font-sans text-[10px] tracking-widest uppercase text-jet/25 mb-8">
              Iniciar un proyecto
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.07] mb-8">
              Cuéntame
              <br />
              <em>tu idea.</em>
            </h2>
            <p className="font-sans text-sm text-jet/50 leading-relaxed max-w-sm">
              Comparte los detalles de tu proyecto y te respondo con una propuesta clara. Trabajo con fundadores, equipos creativos y marcas que quieren comunicar algo significativo.
            </p>

            <div className="mt-12 space-y-4">
              {[
                { label: "Email", value: "ssernag5@eafit.edu.co", href: "mailto:ssernag5@eafit.edu.co" },
                { label: "LinkedIn", value: "Samuel Serna G.", href: "https://www.linkedin.com/in/samuel-serna-design-interactive-transmedia/" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-jet/25 mb-1">{item.label}</p>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-jet/60 hover:text-jet transition-colors"
                  >
                    {item.value} →
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-start justify-center gap-4 py-16">
                <p className="font-serif text-2xl text-jet">¡Gracias por escribir!</p>
                <p className="font-sans text-sm text-jet/50">
                  Tu cliente de correo se abrió con el mensaje listo. Si no se abrió automáticamente, escríbeme directamente a <a href="mailto:ssernag5@eafit.edu.co" className="underline">ssernag5@eafit.edu.co</a>.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="font-sans text-[10px] tracking-widest uppercase text-jet/40 hover:text-jet transition-colors mt-4"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-[9px] tracking-widest uppercase text-jet/35 block mb-2">
                      Nombre
                    </label>
                    <input
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="font-sans text-[9px] tracking-widest uppercase text-jet/35 block mb-2">
                      Correo
                    </label>
                    <input
                      name="correo"
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      value={form.correo}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-[9px] tracking-widest uppercase text-jet/35 block mb-2">
                    ¿Qué servicio buscas?
                  </label>
                  <select
                    name="servicio"
                    required
                    value={form.servicio}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    <option value="">Selecciona una opción</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-sans text-[9px] tracking-widest uppercase text-jet/35 block mb-2">
                    Cuéntame tu proyecto
                  </label>
                  <textarea
                    name="mensaje"
                    rows={5}
                    placeholder="Describe brevemente tu idea, el contexto y lo que necesitas..."
                    value={form.mensaje}
                    onChange={handleChange}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-jet text-ivory font-sans text-[11px] tracking-widest uppercase py-4 hover:bg-jet/80 transition-colors duration-200 rounded-sm"
                >
                  Enviar mensaje →
                </button>

                <p className="font-sans text-[9px] text-jet/25 text-center">
                  Al enviar se abrirá tu cliente de correo con el mensaje listo.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
