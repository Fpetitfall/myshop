import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ShoeShop | Premium Footwear & Sneakers",
    template: "%s | ShoeShop",
  },
  description: "Discover the latest collection of premium shoes and sneakers. Quality, comfort, and style combined.",
  keywords: ["shoes", "sneakers", "footwear", "nike", "adidas", "fashion"],
  authors: [{ name: "ShoeShop Team" }],
  creator: "ShoeShop",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shoeshop.com",
    title: "ShoeShop | Premium Footwear & Sneakers",
    description: "Discover the latest collection of premium shoes and sneakers.",
    siteName: "ShoeShop",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShoeShop | Premium Footwear & Sneakers",
    description: "Discover the latest collection of premium shoes and sneakers.",
    creator: "@shoeshop",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
