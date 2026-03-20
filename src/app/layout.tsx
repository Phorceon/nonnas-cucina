import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nonna's Cucina | Authentic Italian Restaurant",
  description: "Experience authentic Italian cuisine with recipes passed down through generations. Warm ambiance, fresh ingredients, and unforgettable flavors.",
  keywords: ["Italian restaurant", "authentic Italian", "pasta", "pizza", "fine dining"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${playfair.variable} ${lato.variable} h-full antialiased scroll-smooth`}
      >
        <body className="min-h-full flex flex-col font-sans">
          <SmoothScroll>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}
