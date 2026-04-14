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
        {/* Hero stays fixed — sections scroll over it */}
        <div className="sticky top-0 z-0">
          <Hero />
        </div>

        {/* Content scrolls over the pinned hero */}
        <div className="relative z-10">
          <div className="pointer-events-none h-0 w-full shadow-[0_-20px_60px_rgba(26,23,20,0.15)]" />
          <About />

          <Experience />

          <Projects />

          <Skills />

          <Teaching />

          <Contact />

          <Footer />
        </div>
      </main>
    </>
  );
}
