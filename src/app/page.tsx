import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Hero } from "@/components/sections/Hero";
import { ScrollObserver } from "@/components/layout/ScrollObserver";
import { DuskGradient } from "@/components/layout/DuskGradient";
import { Footer } from "@/components/layout/Footer";
import { IntroOverlay } from "@/components/animations/IntroOverlay";


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
      <IntroOverlay />
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

        {/* Content scrolls over the pinned hero — like warm parchment lifting */}
        <div
          className="relative z-10"
          style={{
            boxShadow: "0 -8px 30px rgba(26, 23, 20, 0.12), 0 -2px 8px rgba(26, 23, 20, 0.06)",
          }}
        >
          {/* Copper horizon line — where the light meets the page */}
          <div className="pointer-events-none absolute top-0 left-1/2 z-10 h-px w-3/5 max-w-md -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-copper/25 to-transparent" />

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
