import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import PageTransition from "./_components/PageTransition";
import { Noto_Sans_Thai } from "next/font/google";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai","latin"],
  weight: ["400","500","700"],
  display: "swap",
  preload: true,
  variable: "--font-noto-thai",
});

export const metadata = {
  title: "SIAMSANTA PARTNER",
  description: "Premium travel & partner portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${notoThai.variable} antialiased`}>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
