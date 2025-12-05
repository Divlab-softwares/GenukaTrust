import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "./contexts/NotificationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genuka Trust - Tableau de bord",
  description: "Gérez et analysez les avis de vos clients avec Genuka Trust, la solution tout-en-un pour améliorer votre réputation en ligne.",
  icons: {
    icon: [
      { url: '/images/Genuka.jpg', type: 'image/jpg' },
      { url: '/images/Genuka.jpg', sizes: '32x32', type: 'image/jpg' },
      { url: '/images/Genuka.jpg', sizes: '16x16', type: 'image/jpg' },
    ],
    apple: [
      { url: '/images/Genuka.jpg' },
    ],
  },
  openGraph: {
    title: 'Genuka Trust - Tableau de bord',
    description: 'Gérez et analysez les avis de vos clients avec Genuka Trust.',
    url: 'https://genuka-trust.vercel.app',
    siteName: 'Genuka Trust',
    images: [
      {
        url: '/images/Genuka.jpg',
        width: 1200,
        height: 630,
        alt: 'Genuka Trust',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genuka Trust - Tableau de bord',
    description: 'Gérez et analysez les avis de vos clients avec Genuka Trust.',
    images: ['/images/Genuka.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-full`}
      >
        <NotificationProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
