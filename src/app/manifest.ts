import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Interview Practice",
    short_name: "Interview Prep",
    description: "Read saved interview lessons and practice at your own pace.",
    start_url: "/offline",
    scope: "/",
    display: "standalone",
    background_color: "#f4f5f7",
    theme_color: "#18191c",
    icons: [
      {
        src: "/icons/app-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/app-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/app-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
