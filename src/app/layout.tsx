import type { Metadata } from "next";
import "./globals.css";
import Header from "@/ui/Header/Header";
import { PropsWithChildren } from "react";
import Footer from "@/ui/Footer/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Angeline Desdevises",
  description:
    "Voici le portfolio de la photographe Angeline Desdevises. Retrouvez ses nombreux clichées et également ses articles.",
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
        </body>
      </UserProvider>
    </html>
  );
}
