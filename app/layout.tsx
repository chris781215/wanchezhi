import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import MobileTabBar from "@/components/MobileTabBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "玩车志 - 经典燃油车爱好者共创社区",
  description: "玩车志，经典燃油车爱好者共创社区",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "玩车志 - 经典燃油车爱好者共创社区",
    description: "玩车志，经典燃油车爱好者共创社区",
    type: "website",
    images: ["/og-default.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-secondary">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <MobileTabBar />
        </Providers>
        {/* Bottom padding for mobile tab bar */}
        <div className="md:hidden h-14" />
      </body>
    </html>
  );
}
