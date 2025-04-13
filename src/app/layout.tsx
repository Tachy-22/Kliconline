import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "@/components/ui/toast";
//import Navbar from "@/components/ui/Navbar";
//import Footer from "@/components/ui/Footer";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Klic Online Church",
  description: "Generated by create next app",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased min-h-screen max-w-screen w-full overflow-y-auto bg-white">
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          defaultTheme="light" // Optional: Specify a default theme
        >
          <TooltipProvider>
            <ToastProvider>
              <Toaster />
              <Sonner />
              <main>{children}</main>
            </ToastProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
