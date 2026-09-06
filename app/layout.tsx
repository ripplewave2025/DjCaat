import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://djcaat.com"),
  title: "DJ CAAT | Official Phonk Architect (Darjeeling // Global)",
  description: "Official digital hub for DJ Caat — Darjeeling pioneer of Nepali Phonk and Brazilian Phonk. Over 33.3K community. Real-time audio visualizer, stem collaboration intake, sound vault, and discography.",
  keywords: [
    "DJ Caat",
    "Nepali Phonk",
    "Darjeeling Phonk",
    "Brazilian Phonk",
    "Drift Phonk",
    "Himalayan Drift",
    "Nepamorphosis",
    "Timro Yaad Ma",
    "Phonk Producer",
    "Audio Visualizer"
  ],
  authors: [{ name: "DJ Caat" }],
  openGraph: {
    title: "DJ CAAT | Nepali & Brazilian Phonk Official Platform",
    description: "Listen to official masters, test beats on the real-time 808 visualizer, and drop vocal stems directly to DJ Caat.",
    images: ["/images/nepamorphosis.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-void text-gray-100 min-h-screen flex flex-col relative selection:bg-cyanAccent selection:text-black">
        {/* Subtle Cyber Grid & CRT scanline ambient layers */}
        <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-40" />
        <div className="fixed inset-0 crt-overlay pointer-events-none z-50 opacity-25" />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
