import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samuel Serna — Interactive Designer",
  description:
    "Interactive Design student focused on creating digital experiences through research, storytelling, interaction and emerging technologies.",
  openGraph: {
    title: "Samuel Serna — Interactive Designer",
    description: "Designing experiences between people, stories and technology.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="bg-ivory">
      <body className={`${instrumentSerif.variable} ${inter.variable} bg-ivory`}>
        {children}
      </body>
    </html>
  );
}
