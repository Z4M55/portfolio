#!/usr/bin/env python3
"""
Portfolio Generator
-------------------
Lee portfolio_config.json y genera public/index.html

Uso:
    python generate.py
    python generate.py --config otro_config.json
    python generate.py --output dist
"""

import json
import os
import sys
import argparse
from pathlib import Path
from datetime import datetime

# Forzar UTF-8 en stdout para compatibilidad con terminales Windows (cp1252)
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# Desactivar buffering para que los prints aparezcan inmediatamente
sys.stdout.flush()


# ──────────────────────────────────────────────
# CSS
# ──────────────────────────────────────────────
CSS = """
/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Variables ── */
:root {
  --bg-0: #04060A;
  --bg-1: #090E16;
  --bg-2: #0E1622;
  --bg-card: #111C2E;
  --blue-deep: #0D3A6E;
  --blue-mid: #1A6EBF;
  --blue-bright: #3D93E0;
  --blue-glow: #5AAFF0;
  --txt-1: #E0EAF5;
  --txt-2: #8AA3BE;
  --txt-3: #4A647E;
  --border: #152235;
  --border-hover: #1E3A5A;
  --radius: 12px;
  --radius-sm: 6px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --font: 'Montserrat', sans-serif;
  --max-w: 1160px;
  --nav-h: 68px;
}

/* ── Base ── */
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--font);
  background: var(--bg-0);
  color: var(--txt-1);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
ul, ol { list-style: none; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg-0); }
::-webkit-scrollbar-thumb { background: var(--blue-deep); border-radius: 2px; }

/* ── Selection ── */
::selection { background: var(--blue-mid); color: #fff; }

/* ── Utils ── */
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 32px; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

/* ── Reveal animation ── */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ────────────────────────────────────────────
   NAV
──────────────────────────────────────────── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--nav-h);
  z-index: 100;
  display: flex;
  align-items: center;
  transition: background var(--transition), border-color var(--transition);
}
.nav.scrolled {
  background: rgba(4, 6, 10, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.nav__inner {
  width: 100%;
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__logo {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--txt-1);
  transition: color var(--transition);
}
.nav__logo span { color: var(--blue-bright); }
.nav__logo:hover { color: var(--blue-glow); }

.nav__links {
  display: flex;
  gap: 36px;
  align-items: center;
}
.nav__link {
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--txt-2);
  transition: color var(--transition);
  position: relative;
}
.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 1px;
  background: var(--blue-bright);
  transition: width var(--transition);
}
.nav__link:hover, .nav__link.active {
  color: var(--txt-1);
}
.nav__link:hover::after, .nav__link.active::after { width: 100%; }

.nav__cta {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 9px 22px;
  border: 1px solid var(--blue-mid);
  border-radius: var(--radius-sm);
  color: var(--blue-bright);
  transition: all var(--transition);
}
.nav__cta:hover {
  background: var(--blue-mid);
  color: #fff;
  box-shadow: 0 0 20px rgba(29, 110, 191, 0.35);
}

/* Hamburger */
.nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 4px;
  background: none;
  border: none;
}
.nav__burger span {
  display: block;
  width: 24px; height: 1.5px;
  background: var(--txt-1);
  transition: all var(--transition);
  transform-origin: center;
}
.nav__burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nav__burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav__burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

.nav__mobile {
  display: none;
  position: fixed;
  top: var(--nav-h); left: 0; right: 0;
  background: rgba(4, 6, 10, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 28px 32px 36px;
  z-index: 99;
  flex-direction: column;
  gap: 4px;
}
.nav__mobile.open { display: flex; }
.nav__mobile-link {
  font-size: 1.0625rem;
  font-weight: 500;
  color: var(--txt-2);
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  transition: color var(--transition);
}
.nav__mobile-link:last-child { border-bottom: none; }
.nav__mobile-link:hover { color: var(--blue-glow); }

/* ────────────────────────────────────────────
   HERO
──────────────────────────────────────────── */
.hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Grid de puntos de fondo */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(26, 110, 191, 0.07) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(61, 147, 224, 0.05) 0%, transparent 40%);
  pointer-events: none;
}
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.18;
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-top: var(--nav-h);
}

.hero__label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--blue-bright);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.hero__label::before {
  content: '';
  display: block;
  width: 28px; height: 1px;
  background: var(--blue-bright);
}

.hero__name {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  color: var(--txt-1);
}
.hero__name em {
  font-style: normal;
  color: var(--blue-bright);
}

.hero__tagline {
  font-size: clamp(1.0625rem, 2vw, 1.3125rem);
  font-weight: 300;
  color: var(--txt-2);
  max-width: 560px;
  line-height: 1.5;
  margin-bottom: 48px;
}

.hero__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 14px 30px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);
  border: none;
}
.btn--primary {
  background: var(--blue-mid);
  color: #fff;
}
.btn--primary:hover {
  background: var(--blue-bright);
  box-shadow: 0 0 28px rgba(61, 147, 224, 0.4);
  transform: translateY(-1px);
}
.btn--ghost {
  background: transparent;
  color: var(--txt-2);
  border: 1px solid var(--border-hover);
}
.btn--ghost:hover {
  color: var(--txt-1);
  border-color: var(--blue-mid);
  background: rgba(26, 110, 191, 0.08);
}

.hero__scroll {
  margin-top: 80px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--txt-3);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.hero__scroll-line {
  width: 36px; height: 1px;
  background: var(--txt-3);
  position: relative;
  overflow: hidden;
}
.hero__scroll-line::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: var(--blue-bright);
  animation: scan 2.4s ease-in-out infinite;
}
@keyframes scan {
  0% { left: -100%; }
  50% { left: 0%; }
  100% { left: 100%; }
}

/* ────────────────────────────────────────────
   SECCIÓN BASE
──────────────────────────────────────────── */
.section {
  padding: 100px 0;
}
.section--alt { background: var(--bg-1); }

.section__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--blue-mid);
  margin-bottom: 14px;
}
.section__title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: var(--txt-1);
  margin-bottom: 20px;
}
.section__subtitle {
  font-size: 1rem;
  color: var(--txt-2);
  max-width: 560px;
  line-height: 1.65;
}
.section__header { margin-bottom: 64px; }
.section__divider {
  width: 40px; height: 2px;
  background: var(--blue-mid);
  margin: 20px 0 0;
  border-radius: 1px;
}

/* ────────────────────────────────────────────
   ABOUT
──────────────────────────────────────────── */
.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.about__bio {
  font-size: 1.0625rem;
  color: var(--txt-2);
  line-height: 1.75;
  margin-bottom: 36px;
}
.about__bio strong { color: var(--txt-1); font-weight: 600; }

.about__links {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
.about__link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--txt-2);
  padding: 9px 18px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}
.about__link:hover {
  color: var(--blue-glow);
  border-color: var(--blue-mid);
  background: rgba(26, 110, 191, 0.08);
}
.about__link svg { width: 14px; height: 14px; flex-shrink: 0; }

.about__stats {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat-card {
  padding: 32px 36px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color var(--transition);
}
.stat-card:hover { border-color: var(--border-hover); }
.stat-card__value {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--blue-bright);
  line-height: 1;
  margin-bottom: 6px;
}
.stat-card__label {
  font-size: 0.8125rem;
  color: var(--txt-2);
  letter-spacing: 0.04em;
}

/* ────────────────────────────────────────────
   WORK
──────────────────────────────────────────── */
.work__filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.filter-btn {
  font-family: var(--font);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 8px 20px;
  background: transparent;
  color: var(--txt-2);
  border: 1px solid var(--border);
  border-radius: 100px;
  cursor: pointer;
  transition: all var(--transition);
}
.filter-btn:hover {
  color: var(--txt-1);
  border-color: var(--border-hover);
}
.filter-btn.active {
  background: var(--blue-mid);
  border-color: var(--blue-mid);
  color: #fff;
}

.work__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.project-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(61, 147, 224, 0.1);
}
.project-card.hidden {
  display: none;
}

.project-card__thumb {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  position: relative;
}
.project-card__thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.project-card:hover .project-card__thumb img { transform: scale(1.04); }

.project-card__placeholder {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, var(--bg-2) 0%, var(--blue-deep) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.project-card__placeholder svg {
  opacity: 0.2;
  width: 40px; height: 40px;
}

.project-card__body {
  padding: 24px 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.project-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.project-card__cat {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue-bright);
}
.project-card__year {
  font-size: 0.7875rem;
  color: var(--txt-3);
}
.project-card__title {
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--txt-1);
  margin-bottom: 10px;
  line-height: 1.3;
}
.project-card__desc {
  font-size: 0.875rem;
  color: var(--txt-2);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 20px;
}
.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}
.tag {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: rgba(13, 58, 110, 0.4);
  border: 1px solid rgba(26, 110, 191, 0.25);
  border-radius: 4px;
  color: var(--txt-2);
}
.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--blue-bright);
  transition: gap var(--transition), color var(--transition);
}
.project-card__link:hover { gap: 10px; color: var(--blue-glow); }
.project-card__link svg { width: 14px; height: 14px; }

/* ────────────────────────────────────────────
   PROCESS
──────────────────────────────────────────── */
.process__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.process-step {
  padding: 40px 36px;
  background: var(--bg-card);
  transition: background var(--transition);
}
.process-step:hover { background: var(--bg-2); }
.process-step__num {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--blue-mid);
  margin-bottom: 20px;
}
.process-step__title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--txt-1);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.process-step__desc {
  font-size: 0.875rem;
  color: var(--txt-2);
  line-height: 1.65;
}

/* ────────────────────────────────────────────
   SKILLS
──────────────────────────────────────────── */
.skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.skill-item {}
.skill-item__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
.skill-item__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--txt-1);
  letter-spacing: 0.02em;
}
.skill-item__pct {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--blue-bright);
  letter-spacing: 0.05em;
}
.skill-item__bar {
  height: 3px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.skill-item__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--blue-deep), var(--blue-bright));
  border-radius: 2px;
  width: 0;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ────────────────────────────────────────────
   CONTACT
──────────────────────────────────────────── */
.contact {
  text-align: center;
}
.contact__inner {
  max-width: 640px;
  margin: 0 auto;
}
.contact__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--txt-1);
  margin-bottom: 20px;
  line-height: 1.1;
}
.contact__title em {
  font-style: normal;
  color: var(--blue-bright);
}
.contact__text {
  font-size: 1rem;
  color: var(--txt-2);
  line-height: 1.65;
  margin-bottom: 44px;
}
.contact__email {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--blue-bright);
  transition: color var(--transition);
  margin-bottom: 40px;
}
.contact__email:hover { color: var(--blue-glow); }
.contact__social {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--txt-2);
  padding: 10px 22px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}
.social-btn:hover {
  color: var(--blue-glow);
  border-color: var(--blue-mid);
  background: rgba(26, 110, 191, 0.08);
}
.social-btn svg { width: 15px; height: 15px; }

/* ────────────────────────────────────────────
   FOOTER
──────────────────────────────────────────── */
.footer {
  border-top: 1px solid var(--border);
  padding: 32px 0;
}
.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.footer__copy {
  font-size: 0.8125rem;
  color: var(--txt-3);
  letter-spacing: 0.03em;
}
.footer__copy span { color: var(--blue-mid); }
.footer__back {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--txt-3);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color var(--transition);
  cursor: pointer;
}
.footer__back:hover { color: var(--blue-bright); }

/* ────────────────────────────────────────────
   RESPONSIVE
──────────────────────────────────────────── */
@media (max-width: 900px) {
  .nav__links { display: none; }
  .nav__burger { display: flex; }
  .about__grid { grid-template-columns: 1fr; gap: 48px; }
  .about__stats { flex-direction: row; flex-wrap: wrap; }
  .stat-card { flex: 1; min-width: 140px; }
}
@media (max-width: 640px) {
  .container { padding: 0 20px; }
  .section { padding: 72px 0; }
  .work__grid { grid-template-columns: 1fr; }
  .hero__actions { flex-direction: column; align-items: flex-start; }
  .process__grid { grid-template-columns: 1fr 1fr; }
  .footer__inner { justify-content: center; text-align: center; }
}
@media (max-width: 480px) {
  .process__grid { grid-template-columns: 1fr; }
  .nav__inner { padding: 0 20px; }
  .nav__mobile { padding: 20px; }
}
"""


# ──────────────────────────────────────────────
# JS
# ──────────────────────────────────────────────
JS = """
(function() {
  'use strict';

  // ── Nav scroll ──
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── Active nav link ──
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(function(s) { observer.observe(s); });

  // ── Mobile menu ──
  var burger = document.querySelector('.nav__burger');
  var mobileMenu = document.querySelector('.nav__mobile');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function() {
      var isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll reveal ──
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, idx) {
      if (entry.isIntersecting) {
        var delay = entry.target.dataset.delay || 0;
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function(el, i) {
    if (!el.dataset.delay) el.dataset.delay = (i % 4) * 80;
    revealObs.observe(el);
  });

  // ── Skill bars animation ──
  var skillObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-item__fill').forEach(function(fill) {
          setTimeout(function() {
            fill.style.width = fill.dataset.pct + '%';
          }, 200);
        });
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  var skillsSection = document.querySelector('.skills__grid');
  if (skillsSection) skillObs.observe(skillsSection);

  // ── Project filter ──
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.dataset.cat;
      projectCards.forEach(function(card) {
        var show = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  // ── Back to top ──
  var backTop = document.querySelector('.footer__back');
  if (backTop) {
    backTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
"""


# ──────────────────────────────────────────────
# HTML COMPONENT BUILDERS
# ──────────────────────────────────────────────
def _icon_arrow():
    return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8h10M9 4l4 4-4 4"/></svg>'

def _icon_external():
    return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3H3v10h10v-3M9 3h4v4M9 7l4-4"/></svg>'

def _icon_placeholder():
    return '<svg viewBox="0 0 40 40" fill="currentColor"><rect x="4" y="8" width="32" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="16" r="3"/><path d="M4 26l9-8 6 6 5-4 8 6"/></svg>'

def _icon_linkedin():
    return '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M2.7 5.4h2.6V13H2.7V5.4zm1.3-4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM6.1 5.4H8.5v1s.8-1.4 2.8-1.4c2.2 0 2.9 1.4 2.9 3.5V13h-2.6V9c0-1.2-.5-2-1.5-2-1.5 0-1.9 1.2-1.9 2V13H6.1V5.4z"/></svg>'

def _icon_behance():
    return '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M6.1 7.4c.6-.3.9-.8.9-1.5 0-1.4-1-2-2.4-2H1v8h3.8c1.5 0 2.7-.7 2.7-2.3 0-.9-.5-1.8-1.4-2.2zm-3.4-2h1.7c.6 0 1 .2 1 .8 0 .5-.3.8-1 .8H2.7V5.4zm1.9 5H2.7V8h1.9c.7 0 1.1.3 1.1.9 0 .7-.5 1.1-1.1 1.1zm9.2-3.3c0-1.5-1-3.1-3-3.1-1.9 0-3.1 1.4-3.1 3.2 0 1.9 1.2 3.1 3.2 3.1 1.4 0 2.4-.6 2.9-1.8h-1.5c-.2.4-.7.6-1.3.6-.8 0-1.4-.5-1.5-1.4h4.3v-.6zm-4.3-.7c.1-.7.6-1.3 1.4-1.3.9 0 1.3.5 1.4 1.3H9.5zM10.2 3h2.5v.8h-2.5V3z"/></svg>'

def _icon_dribbble():
    return '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm4.7 3.1c.8 1 1.3 2.3 1.3 3.6-.2 0-2-.4-3.8-.2-.1-.2-.2-.4-.3-.6-.2-.5-.5-1-.7-1.4 1.4-.6 2.8-1.2 3.5-1.4zm-1-1c-.7.2-2 .8-3.4 1.4A12.8 12.8 0 006 2.3a6 6 0 015.7.8zM4.8 2.7c.3.7.9 2 1.4 3.4C4.3 6.7 2.6 6.8 2.2 6.8c.4-1.8 1.4-3.3 2.6-4.1zM2 8c0-.1 0-.3.1-.5.5.1 2.6.1 4.9-.7l.4.8C6 8 4.5 9.5 3.3 11.3A6 6 0 012 8zm2 4.4c1-1.6 2.4-3 3.8-3.5.6 1.6 1 3.3 1.1 5A6 6 0 014 12.4zm4.9.9c-.1-1.6-.5-3.2-1-4.8l.3-.1c1.7-.2 3.4.2 3.7.2A6 6 0 018.9 13.3z"/></svg>'

def _icon_email():
    return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5"/><path d="M1.5 4.5l6.5 5 6.5-5"/></svg>'


def build_project_cards(projects):
    categories = sorted(set(p['category'] for p in projects))

    filter_html = '<button class="filter-btn active" data-cat="all">Todo</button>\n'
    for cat in categories:
        filter_html += f'    <button class="filter-btn" data-cat="{cat}">{cat}</button>\n'

    cards_html = ''
    for i, p in enumerate(projects):
        img_html = ''
        if p.get('image'):
            img_html = f'<img src="{p["image"]}" alt="{p["title"]}" loading="lazy">'
        else:
            img_html = f'<div class="project-card__placeholder">{_icon_placeholder()}</div>'

        tags_html = ''.join(f'<span class="tag">{t}</span>' for t in p.get('tags', []))
        link = p.get('url', '#')
        featured = 'data-featured="true"' if p.get('featured') else ''

        cards_html += f'''    <article class="project-card reveal" data-cat="{p['category']}" {featured}>
      <div class="project-card__thumb">{img_html}</div>
      <div class="project-card__body">
        <div class="project-card__meta">
          <span class="project-card__cat">{p['category']}</span>
          <span class="project-card__year">{p.get('year', '')}</span>
        </div>
        <h3 class="project-card__title">{p['title']}</h3>
        <p class="project-card__desc">{p.get('description', '')}</p>
        <div class="project-card__tags">{tags_html}</div>
        <a href="{link}" class="project-card__link" target="_blank" rel="noopener">
          Ver proyecto {_icon_arrow()}
        </a>
      </div>
    </article>
'''
    return filter_html, cards_html


def build_skills(skills):
    html = ''
    for s in skills:
        html += f'''    <div class="skill-item reveal">
      <div class="skill-item__header">
        <span class="skill-item__name">{s['name']}</span>
        <span class="skill-item__pct">{s['level']}%</span>
      </div>
      <div class="skill-item__bar">
        <div class="skill-item__fill" data-pct="{s['level']}"></div>
      </div>
    </div>
'''
    return html


def build_stats(stats):
    html = ''
    for s in stats:
        html += f'''  <div class="stat-card reveal">
    <div class="stat-card__value">{s['value']}</div>
    <div class="stat-card__label">{s['label']}</div>
  </div>
'''
    return html


def build_process_steps(steps):
    html = ''
    for step in steps:
        html += f'''    <div class="process-step reveal">
      <div class="process-step__num">{step['number']}</div>
      <h3 class="process-step__title">{step['title']}</h3>
      <p class="process-step__desc">{step['description']}</p>
    </div>
'''
    return html


def build_social_links(p):
    links = []
    if p.get('linkedin'):
        links.append(f'<a href="{p["linkedin"]}" class="social-btn" target="_blank" rel="noopener">{_icon_linkedin()} LinkedIn</a>')
    if p.get('behance'):
        links.append(f'<a href="{p["behance"]}" class="social-btn" target="_blank" rel="noopener">{_icon_behance()} Behance</a>')
    if p.get('dribbble'):
        links.append(f'<a href="{p["dribbble"]}" class="social-btn" target="_blank" rel="noopener">{_icon_dribbble()} Dribbble</a>')
    return '\n        '.join(links)


def build_about_links(p):
    links = []
    if p.get('linkedin'):
        links.append(f'<a href="{p["linkedin"]}" class="about__link" target="_blank" rel="noopener">{_icon_linkedin()} LinkedIn</a>')
    if p.get('behance'):
        links.append(f'<a href="{p["behance"]}" class="about__link" target="_blank" rel="noopener">{_icon_behance()} Behance</a>')
    if p.get('dribbble'):
        links.append(f'<a href="{p["dribbble"]}" class="about__link" target="_blank" rel="noopener">{_icon_dribbble()} Dribbble</a>')
    if p.get('cv_url'):
        links.append(f'<a href="{p["cv_url"]}" class="about__link" download>{_icon_arrow()} Descargar CV</a>')
    return '\n          '.join(links)


def generate_html(config):
    p = config['personal']
    projects = config.get('projects', [])
    skills = config.get('skills', [])
    steps = config.get('process_steps', [])
    stats = config.get('stats', [])
    year = datetime.now().year

    filter_html, cards_html = build_project_cards(projects)
    skills_html = build_skills(skills)
    stats_html = build_stats(stats)
    process_html = build_process_steps(steps)
    social_html = build_social_links(p)
    about_links_html = build_about_links(p)

    # Nombre dividido para destacar apellido
    name_parts = p['name'].split(' ', 1)
    hero_name = f"{name_parts[0]} <em>{name_parts[1]}</em>" if len(name_parts) > 1 else p['name']

    mobile_nav = ''
    nav_items = [('Inicio', '#hero'), ('Sobre mí', '#about'), ('Trabajo', '#work'), ('Proceso', '#process'), ('Contacto', '#contact')]
    for label, href in nav_items:
        mobile_nav += f'<a href="{href}" class="nav__mobile-link">{label}</a>\n'

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{p['name']} — {p['title']}. {p.get('tagline', '')}">
  <meta property="og:title" content="{p['name']} — {p['title']}">
  <meta property="og:description" content="{p.get('tagline', '')}">
  <meta name="theme-color" content="#04060A">
  <title>{p['name']} — {p['title']}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>{CSS}</style>
</head>
<body>

  <!-- NAV -->
  <nav class="nav" id="nav">
    <div class="nav__inner">
      <a href="#hero" class="nav__logo">{name_parts[0]}<span>.</span></a>
      <ul class="nav__links">
        <li><a href="#about" class="nav__link">Sobre mí</a></li>
        <li><a href="#work" class="nav__link">Trabajo</a></li>
        <li><a href="#process" class="nav__link">Proceso</a></li>
        <li><a href="#contact" class="nav__cta">Contacto</a></li>
      </ul>
      <button class="nav__burger" aria-label="Menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- MOBILE MENU -->
  <div class="nav__mobile" id="mobile-menu">
    {mobile_nav}
  </div>

  <main>

    <!-- HERO -->
    <section id="hero" class="hero">
      <div class="container">
        <div class="hero__content">
          <p class="hero__label">{p['title']}</p>
          <h1 class="hero__name">{hero_name}</h1>
          <p class="hero__tagline">{p.get('tagline', '')}</p>
          <div class="hero__actions">
            <a href="#work" class="btn btn--primary">Ver trabajo {_icon_arrow()}</a>
            <a href="#contact" class="btn btn--ghost">Hablemos</a>
          </div>
          <div class="hero__scroll">
            <div class="hero__scroll-line"></div>
            Scroll
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section section--alt">
      <div class="container">
        <div class="about__grid">
          <div class="reveal">
            <p class="section__label">Sobre mí</p>
            <h2 class="section__title">Diseño con propósito,<br>no con suposiciones.</h2>
            <p class="about__bio">{p.get('bio', '')}</p>
            <div class="about__links">
              {about_links_html}
            </div>
          </div>
          <div class="about__stats">
            {stats_html}
          </div>
        </div>
      </div>
    </section>

    <!-- WORK -->
    <section id="work" class="section">
      <div class="container">
        <div class="section__header">
          <p class="section__label reveal">Proyectos seleccionados</p>
          <h2 class="section__title reveal">Trabajo reciente</h2>
          <div class="section__divider reveal"></div>
        </div>
        <div class="work__filters reveal">
          {filter_html}
        </div>
        <div class="work__grid">
{cards_html}
        </div>
      </div>
    </section>

    <!-- PROCESS -->
    <section id="process" class="section section--alt">
      <div class="container">
        <div class="section__header">
          <p class="section__label reveal">Cómo trabajo</p>
          <h2 class="section__title reveal">Proceso de diseño</h2>
          <div class="section__divider reveal"></div>
        </div>
        <div class="process__grid">
{process_html}
        </div>
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills" class="section">
      <div class="container">
        <div class="section__header">
          <p class="section__label reveal">Habilidades</p>
          <h2 class="section__title reveal">Herramientas y disciplinas</h2>
          <div class="section__divider reveal"></div>
        </div>
        <div class="skills__grid">
{skills_html}
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section section--alt contact">
      <div class="container">
        <div class="contact__inner">
          <p class="section__label reveal" style="text-align:center">Contacto</p>
          <h2 class="contact__title reveal">¿Tienes un proyecto<br><em>en mente?</em></h2>
          <p class="contact__text reveal">Estoy disponible para proyectos freelance y oportunidades de colaboración. Escríbeme y lo hablamos.</p>
          <a href="mailto:{p.get('email', '')}" class="contact__email reveal">
            {_icon_email()} {p.get('email', '')}
          </a>
          <div class="contact__social reveal">
            {social_html}
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <p class="footer__copy">© {year} <span>{p['name']}</span> — Hecho con precisión.</p>
        <button class="footer__back" aria-label="Volver al inicio">Inicio {_icon_arrow()}</button>
      </div>
    </div>
  </footer>

  <script>{JS}</script>
</body>
</html>"""

    return html


# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description='Portfolio Generator')
    parser.add_argument('--config', default='portfolio_config.json', help='Ruta al archivo de configuración')
    parser.add_argument('--output', default='public', help='Directorio de salida')
    args = parser.parse_args()

    config_path = Path(args.config)
    if not config_path.exists():
        print(f"✗ No se encontró: {config_path}", file=sys.stderr)
        sys.exit(1)

    with open(config_path, 'r', encoding='utf-8') as f:
        raw = f.read()
    # Tolerante a basura/espacios al final del JSON (problema con ciertos editores en Windows)
    try:
        config = json.loads(raw)
    except json.JSONDecodeError:
        decoder = json.JSONDecoder()
        config, _ = decoder.raw_decode(raw)

    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    output_file = output_dir / 'index.html'
    html = generate_html(config)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)

    size_kb = output_file.stat().st_size / 1024
    print(f"✓ Portfolio generado: {output_file}  ({size_kb:.1f} KB)")
    print(f"  Proyectos:   {len(config.get('projects', []))}")
    print(f"  Habilidades: {len(config.get('skills', []))}")


if __name__ == '__main__':
    main()
