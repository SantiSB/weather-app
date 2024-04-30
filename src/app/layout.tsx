import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/components/Header";
import { LocationProvider } from "@/state/LocationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocationProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div style={{ height: "100px" }}></div>
          {children}
        </body>
      </html>
    </LocationProvider>
  );
}
