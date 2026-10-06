import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoLoop from "@/components/LogoLoop";
import Work from "@/components/Work";
import About from "@/components/About";
import Transmedia from "@/components/Playground";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const tools = [
  { name: "Figma", icon: "/icons/figma.png" },
  { name: "After Effects", icon: "/icons/aftereffects.png" },
  { name: "Premiere", icon: "/icons/premiere.png" },
  { name: "Illustrator", icon: "/icons/illustrator.png" },
  { name: "GitHub", icon: "/icons/github.png" },
  { name: "Adobe", icon: "/icons/adobe.svg" },
  { name: "Framer", icon: "/icons/framer.svg" },
  { name: "Claude", icon: "/icons/claude.svg" },
  { name: "Notion", icon: "/icons/notion.svg" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Tool strip — white background, right below Hero */}
        <div className="bg-white border-t border-b border-black/[0.05] py-8">
          <LogoLoop logos={tools} speed={45} direction="left" gap={72} scaleOnHover fadeOut />
        </div>
        <Work />
        <About />
        <Transmedia />
        <Contact />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
