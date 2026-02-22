import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADN_237_225 — Découvre ton ADN Culturel 🧬",
  description:
    "Test psychoculturel viral — Découvre ton score ADN culturel 237/225. Mindset, style, énergie sociale. Partage ton badge avec tes amis !",
  keywords: ["ADN culturel", "test culturel", "Cameroun", "Côte d'Ivoire", "Sénégal", "237", "225", "quiz africain"],
  openGraph: {
    title: "ADN_237_225 — Quel est ton ADN Culturel ? 🧬",
    description: "Découvre ton score psychoculturel et partage ton badge avec tes amis !",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADN_237_225 — Quel est ton ADN Culturel ?",
    description: "Test psychoculturel viral — Découvre ton score et partage !",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased gradient-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
