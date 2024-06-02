import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Angeline Desdevises - Home",
  description: "Voici le portfolio de la photographe Angeline Desdevises. Retrouvez ses nombreux clichées et également ses articles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
