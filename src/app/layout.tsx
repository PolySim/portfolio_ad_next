import type { Metadata } from "next";
import "./globals.css";
import Header from "@/ui/Header/Header";
import { PropsWithChildren } from "react";
import Footer from "@/ui/Footer/Footer";

export const metadata: Metadata = {
  title: "Angeline Desdevises - Home",
  description:
    "Voici le portfolio de la photographe Angeline Desdevises. Retrouvez ses nombreux clichées et également ses articles.",
};

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
