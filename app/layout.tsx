import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { LanguageProvider } from "@/constants/context/LanguageProvider";
import StoreProvider from "@/constants/context/StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Agro-Galaxy",
  description: "Agro-Galaxy is a platform for farmers to sell their products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0 scroll-smooth box-border`}
      >
        <LanguageProvider>
          <StoreProvider>{children}</StoreProvider>
        </LanguageProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
