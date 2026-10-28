import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Threadline — Wear your next favourite",
  description: "A responsive fashion-commerce frontend portfolio project built with Next.js, React, TypeScript and Tailwind CSS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
