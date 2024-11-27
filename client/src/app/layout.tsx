import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionProvider  from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/base/Navbar";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ChitChat",
  description: "A fast, secure, and user-friendly app for real-time messaging across any device.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          {/* <Navbar/> */}
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
