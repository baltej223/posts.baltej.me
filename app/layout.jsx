import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
