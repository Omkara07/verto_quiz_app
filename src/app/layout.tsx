import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import {
  ClerkProvider
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Verto Quiz App - Test Your Knowledge',
  description: 'Challenge yourself with engaging quizzes on Verto. Interactive quiz platform with smooth user experience and instant feedback.',
  keywords: 'quiz app, trivia, knowledge test, learning platform, interactive quizzes',
  openGraph: {
    title: 'Verto Quiz App - Test Your Knowledge',
    description: 'Challenge yourself with engaging quizzes on Verto. Interactive quiz platform with smooth user experience and instant feedback.',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
