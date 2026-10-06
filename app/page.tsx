import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Transmedia from "@/components/Playground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Transmedia />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
