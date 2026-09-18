import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEEKER Digital Marketing",
  description: "Thailand-based KOL, influencer, and affiliate marketing agency prototype."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
