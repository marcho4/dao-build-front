import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Header} from "@/app/components/header";
import {Footer} from "@/app/components/footer";
import {SolanaProviders} from "@/app/providers";
import {AuthProvider} from "@/contexts/authContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DAO BUILD",
  description: "Built by marcho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <AuthProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
      <Header/>
      <SolanaProviders>
        <main className="flex-grow">
          {children}
        </main>
      </SolanaProviders>
      <Footer/>
      </body>
    </AuthProvider>
    </html>
  );
}
