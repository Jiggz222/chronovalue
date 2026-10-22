import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChronoValue — Upptäck din klockas värde",
  description: "En enklare väg till en smartare klockvärdering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
