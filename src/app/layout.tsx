import type { Metadata } from "next";
import "./globals.css";
import Header from "@/ui/Header/Header";
import { PropsWithChildren } from "react";
import Footer from "@/ui/Footer/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "@/components/ui/toaster";
import WindowSizeInitializer from "@/lib/WindowSizeInitializer";

export const metadata: Metadata = {
  title: {
    default: "Angeline Desdevises",
    template: "%s | Angeline Desdevises",
  },
  description:
    "Photographe indépendante basée à Rennes et originaire de Normandie, j'ai façonné ma pratique de la photo de façon autodidacte depuis l'adolescence. Après trois années d'étude en information et communication, je me suis dirigée vers un service civique au Club de la Presse de Bretagne. J'ai mené des missions d'éducation aux médias et côtoyé de près le monde de la presse au sens large. Mon travail s'articule essentiellement autour de la photo d'actualité et documentaire. Les questions de société sont mes sujets de prédilections. J'ai une approche diversifiée de la photographie et m'intéresse également aux thématiques de la mémoire, des origines et de la transmission, à la façon dont les récits individuels peuvent faire échos à des histoires collectives.",
};

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="fr">
      <UserProvider>
        <body>
          <Header />
          {children}
          <Footer />
          <WindowSizeInitializer />
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}
