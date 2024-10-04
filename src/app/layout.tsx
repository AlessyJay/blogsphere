import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "BlogSphere",
    template: "%s | BlogSphere",
  },
  description:
    "BlogSphere: Your gateway to a world of captivating stories and insightful perspectives. Connect with fellow bloggers, share your passions, and explore a diverse range of topics. Join our thriving community and let your voice be heard on BlogSphere.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
