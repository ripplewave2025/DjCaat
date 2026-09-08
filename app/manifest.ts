import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DJ CAAT // Official Phonk Engine",
    short_name: "DJ CAAT",
    description: "Official Nepali Phonk & Brazilian Phonk Hub for DJ Caat. 808 Visualizer, Stem Collab, and Discography.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080a",
    theme_color: "#08080a",
    orientation: "portrait",
    icons: [
      {
        src: "/images/nepamorphosis.jpg",
        sizes: "192x192",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/images/nepamorphosis.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
