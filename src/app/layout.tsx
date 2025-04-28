import "./globals.css";
import Header from "@/ui/Header/Header";
import { PropsWithChildren } from "react";
import Footer from "@/ui/Footer/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "@/components/ui/toaster";
import WindowSizeInitializer from "@/lib/WindowSizeInitializer";
import { getBiography } from "@/actions/about";

export const generateMetadata = async () => {
  const biography = await getBiography();
  return {
    title: {
      default: "Angeline Desdevises",
      template: "%s | Angeline Desdevises",
    },
    description:
      biography.fr.length > 300 ? biography.fr.slice(0, 300) : biography.fr,
  };
};

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="fr">
      <head>
        <link rel="canonical" />
      </head>
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
