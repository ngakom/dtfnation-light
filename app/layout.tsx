import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["700", "800", "900"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  title: {
    default: "DTF Nation SA | DTF Printing Made Easy, Nationwide",
    template: "%s | DTF Nation SA",
  },
  description:
    "Premium-quality DTF gang sheet printing at competitive prices. Same-day printing, next-day courier options and collection points across South Africa. From R180 per metre.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "DTF Nation SA | DTF Printing Made Easy",
    description: "Same-day printing, next-day courier and nationwide collection points. More metres, better prices.",
    images: [{ url: "/images/print-sunflower.jpg", width: 960, height: 1280, alt: "A full-colour DTF print" }],
    locale: "en_ZA",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script adds the "js" class before React hydrates.
    <html lang="en" className={`${archivo.variable} ${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <ScrollReveal />
      </body>
    </html>
  );
}
