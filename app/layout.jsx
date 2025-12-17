"use client";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const canonicalUrl = `https://posts.baltej.me${pathname}`;

  return (
    <html lang="en">
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-10 pl-10 pr-10 md:pl-30 md:pr-30 lg:pl-100 lg:pr-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
