import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Providers } from "@/providers/providers";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '700', '600'],
  subsets: ['latin'],
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
      <html lang="en" className="overflow-x-hidden">
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
              <title>dao build - build your community easily</title>
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
              <link rel="manifest" href="/site.webmanifest"/>
          </head>
          <body
              className={`${montserrat.className} antialiased min-h-screen flex flex-col bg-off-white dark:bg-dark-primary w-full max-w-full overflow-x-hidden`}>
              <Providers>
                  <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
                      <Header/>
                      <main className="flex-grow bg-off-white dark:bg-dark-primary w-full max-w-full overflow-x-hidden px-4">
                          <div className="w-full max-w-full mx-auto">
                              {children}
                          </div>
                      </main>
                      <Footer/>
                  </div>
              </Providers>
          </body>
      </html>
  );
}