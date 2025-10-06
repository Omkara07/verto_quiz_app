import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import {
  ClerkProvider
} from '@clerk/nextjs'
import { ProgressBar } from "@/components/progressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Verto Quiz | Smart Quiz Platform for Learning & Self-Assessment",
  description:
    "Verto Quiz helps you test your knowledge with engaging quizzes, instant scoring, and detailed reviews. Track your progress, revisit past attempts, and improve continuously with AI-powered quiz insights.",
  keywords: [
    "quiz app",
    "online quiz",
    "practice test",
    "self assessment",
    "quiz platform",
    "Verto Quiz",
    "learning quiz",
    "knowledge test",
    "study tool",
    "progress tracker",
    "mock test",
    "Verto"
  ],
  openGraph: {
    title: "Verto Quiz | Smart Quiz Platform for Learning & Self-Assessment",
    description:
      "Take interactive quizzes, track past attempts, and improve your learning with Verto Quiz — your personal quiz and knowledge tracker.",
    url: "https://vertoquiz.vercel.app", // will change this after deploy
    siteName: "Verto Quiz",
    images: [
      {
        url: "/verto-quiz-app-image.png",
        width: 1200,
        height: 630,
        alt: "Verto Quiz - Smart Quiz Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verto Quiz | Smart Quiz Platform for Learning & Self-Assessment",
    description:
      "Challenge yourself with quizzes, review results, and improve continuously with Verto Quiz — the ultimate quiz and practice test platform.",
    images: [
      {
        url: "https://vertoquiz.vercel.app/verto-quiz-app-image.png", // will change this after deploy
        alt: "Verto Quiz - Smart Quiz Platform",
        width: 1200,
        height: 630,
      },
    ],
    site: "@VertoQuiz_app", // twitter handle
  },
}

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
          <ProgressBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
