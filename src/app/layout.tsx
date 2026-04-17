import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GAUSS LAB",
  description: "Laboratorio Interactivo de la Distribución Normal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`min-h-screen bg-background font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
