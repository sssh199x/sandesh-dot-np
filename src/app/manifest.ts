import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sandesh Hamal Thakuri — Full Stack Developer",
    short_name: "Sandesh",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#1A1714",
    background_color: "#FAF7F2",
    display: "standalone",
  };
}
