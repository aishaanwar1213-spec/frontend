
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Marketora - Buy Smart. Sell Easy.",
  description: "A premium marketplace for buying and selling products.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"  data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <WishlistProvider>
          <CartProvider>
      <Navbar />
      {children}
    </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
