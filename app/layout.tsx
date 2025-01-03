import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Header} from "@/app/components/header";
import {Footer} from "@/app/components/footer";
import {SolanaProviders} from "@/app/providers";
import {AuthProvider} from "@/contexts/authContext";
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  weight: ['400', '700', '600'], // specify the weights you need
  subsets: ['latin'],      // specify the subsets you need
  // style: ['normal', 'italic'], // if you need italic styles
  // variable: '--font-montserrat', // optionally define a CSS variable
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
      <body className={`${montserrat.className} antialiased min-h-screen flex flex-col`}>
        <Header/>
        <SolanaProviders>
          <main className="flex-grow bg-off-white dark:bg-dark-primary">
            {children}
          </main>
        </SolanaProviders>
        <Footer/>
      </body>
    </AuthProvider>
    </html>
  );
}
