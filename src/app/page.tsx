import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Hero } from "@/components/sections/Hero";
import { ScrollObserver } from "@/components/layout/ScrollObserver";
import { DuskGradient } from "@/components/layout/DuskGradient";
import { Footer } from "@/components/layout/Footer";

// Below-fold sections — lazy loaded for faster initial paint
const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const Experience = dynamic(() => import("@/components/sections/Experience").then((m) => m.Experience));
const Projects = dynamic(() => import("@/components/sections/Projects").then((m) => m.Projects));
const Skills = dynamic(() => import("@/components/sections/Skills").then((m) => m.Skills));
const Teaching = dynamic(() => import("@/components/sections/Teaching").then((m) => m.Teaching));
const Contact = dynamic(() => import("@/components/sections/Contact").then((m) => m.Contact));

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ScrollObserver />
      <DuskGradient />
      <Navbar />

      <main id="main-content">
        <Hero />

        <About />

        <Experience />

        <Projects />

        <Skills />

        <Teaching />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
