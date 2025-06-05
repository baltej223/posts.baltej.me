import "./globals.css"
import Navbar from "@/components/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Navbar/>
        <div className="content pt-10 pl-10 pr-10 md:pl-30 md:pr-30 lg:pl-100 lg:pr-100">
        {children}
        </div>
      </body>
    </html>
  );
}