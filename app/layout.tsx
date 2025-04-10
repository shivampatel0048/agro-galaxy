import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageProvider";
import StoreProvider from "@/context/StoreProvider";
import { Toaster } from "@/components/ui/sonner";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0 scroll-smooth box-border relative`}
      >
        <LanguageProvider>
          <StoreProvider>{children}</StoreProvider>
          <Toaster richColors position="bottom-right" closeButton />
        </LanguageProvider>
      </body>
    </html>
  );
}

// payU  ka payment integration 