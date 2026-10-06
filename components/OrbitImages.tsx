"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import "./OrbitImages.css";

export interface OrbitItem {
  src: string;
  alt: string;
  href?: string;
}

interface OrbitImagesProps {
  images: OrbitItem[];
  radiusX?: number;
  radiusY?: number;
  duration?: number;
  itemSize?: number;
  direction?: 1 | -1;
  centerContent?: React.ReactNode;
}

export default function OrbitImages({
  images,
  radiusX = 340,
  radiusY = 130,
  duration = 22,
  itemSize = 120,
  direction = 1,
  centerContent,
}: OrbitImagesProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = (timestamp - startTime.current) / 1000;

      images.forEach((_, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const offset = (i / images.length) * Math.PI * 2;
        const t = elapsed / duration * Math.PI * 2 * direction + offset;
        const x = radiusX * Math.cos(t);
        const y = radiusY * Math.sin(t);
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [images.length, radiusX, radiusY, duration, direction]);

  const containerH = radiusY * 2 + itemSize + 20;

  return (
    <div className="orbit-container" style={{ height: containerH }}>
      <svg
        className="orbit-svg-guide"
        width={radiusX * 2}
        height={radiusY * 2}
        viewBox={`${-radiusX} ${-radiusY} ${radiusX * 2} ${radiusY * 2}`}
      >
        <ellipse cx={0} cy={0} rx={radiusX} ry={radiusY} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
      </svg>

      {centerContent && (
        <div className="orbit-center-content">{centerContent}</div>
      )}

      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="orbit-item"
          style={{ width: itemSize, height: itemSize }}
        >
          <div className="orbit-item-inner">
            {img.href ? (
              <a href={img.href} style={{ display: "block", width: "100%", height: "100%", position: "relative" }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="orbit-image"
                  sizes={`${itemSize}px`}
                  style={{ objectFit: "cover" }}
                />
              </a>
            ) : (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="orbit-image"
                sizes={`${itemSize}px`}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
