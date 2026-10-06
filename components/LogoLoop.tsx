"use client";

import { useRef, useEffect, useState } from "react";

interface LogoItem {
  name: string;
  icon: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  className?: string;
}

export default function LogoLoop({
  logos,
  speed = 60,
  direction = "left",
  gap = 48,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = true,
  className = "",
}: LogoLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const posRef = useRef(0);
  const rafRef = useRef(0);
  const lastRef = useRef(performance.now());

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (now: number) => {
      const dt = Math.min(50, now - lastRef.current) / 1000;
      lastRef.current = now;
      const currentSpeed = hovered ? hoverSpeed : speed;
      const delta = currentSpeed * dt * (direction === "left" ? -1 : 1);
      posRef.current += delta;
      const half = track.scrollWidth / 2;
      if (direction === "left" && posRef.current <= -half) posRef.current += half;
      if (direction === "right" && posRef.current >= 0) posRef.current -= half;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, hoverSpeed, direction, hovered]);

  const doubled = [...logos, ...logos];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        maskImage: fadeOut
          ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
          : undefined,
        WebkitMaskImage: fadeOut
          ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
          : undefined,
      }}
    >
      <div ref={trackRef} className="flex items-center will-change-transform" style={{ gap }}>
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className={`flex flex-col items-center flex-shrink-0 transition-transform duration-200 ${scaleOnHover ? "hover:scale-110" : ""}`}
            style={{ minWidth: 64 }}
          >
            {logo.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.icon}
                alt={logo.name}
                width={40}
                height={40}
                className="object-contain opacity-50 hover:opacity-100 transition-opacity duration-200"
                style={{ width: 40, height: 40 }}
              />
            ) : (
              <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-white/40 text-xs font-sans">
                {logo.name.slice(0, 2)}
              </div>
            )}
            <span className="mt-2 font-sans text-[9px] tracking-widest uppercase text-white/25">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
