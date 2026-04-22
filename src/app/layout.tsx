import type { Metadata, Viewport } from "next";
import { sora, outfit, jetbrainsMono } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/layout/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandesh Hamal Thakuri — Full Stack Developer",
  description:
    "Full Stack Developer with 5+ years of experience building production web and mobile applications for US companies. AWS Verified Academy Educator based in Pokhara, Nepal.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "AWS",
    "Pokhara",
    "Nepal",
    "Portfolio",
  ],
  authors: [{ name: "Sandesh Hamal Thakuri" }],
  creator: "Sandesh Hamal Thakuri",
  metadataBase: new URL("https://sandesh-hamal.com.np"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Sandesh Hamal Thakuri — Full Stack Developer",
    description:
      "5+ years building production apps for US companies. React, Next.js, Node.js, AWS. Based in Pokhara, Nepal.",
    siteName: "Sandesh Hamal Thakuri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandesh Hamal Thakuri — Full Stack Developer",
    description:
      "5+ years building production apps for US companies. React, Next.js, Node.js, AWS.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#B87333",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sandesh Hamal Thakuri",
  url: "https://sandesh-hamal.com.np",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer with 5+ years of experience building production web and mobile applications for US companies. AWS Verified Academy Educator.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pokhara",
    addressCountry: "NP",
  },
  sameAs: [
    "https://github.com/sssh199x",
    "https://linkedin.com/in/sandesh-hamal-thakuri",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Java",
    "Spring Boot",
    "AWS",
    "Flutter",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[9999] -translate-y-20 rounded-md bg-copper px-4 py-2 font-mono text-sm text-cream transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
