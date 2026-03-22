import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stoic Oracle — Wisdom from the Ancients",
  description:
    "Converse with the wisdom of Marcus Aurelius, Seneca, and Epictetus. A purpose-built Stoic philosophy chatbot.",
  openGraph: {
    title: "Stoic Oracle",
    description: "Ancient wisdom for the modern mind.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Josefin+Sans:wght@200;300;400&family=Courier+Prime:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
