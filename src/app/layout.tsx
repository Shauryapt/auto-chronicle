import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import { AnnouncementStrip } from "@/components/layout/AnnouncementStrip";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteOrigin } from "@/lib/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const title = "Auto Chronicle — Every Car. Every Era. Every Story.";
const description =
  "An independent automotive encyclopedia covering manufacturers, landmark cars and the eras of motoring history, from pioneering classics to the electric age.";

export const metadata: Metadata = {
  // Absolute URLs (canonical, Open Graph) resolve against the configured address; none is assumed.
  metadataBase: siteOrigin() ?? undefined,
  // Detail pages set their own name; the template adds the site name after it.
  title: { default: title, template: "%s — Auto Chronicle" },
  description,
  applicationName: "Auto Chronicle",
  openGraph: {
    title,
    description,
    siteName: "Auto Chronicle",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#131211",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bodoni.variable} ${archivo.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-ivory px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <AnnouncementStrip />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
