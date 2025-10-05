"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    const prefersReducedMotion = useReducedMotion()

    const container = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    }

    const stagger = {
        show: {
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.08,
                delayChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <header className="border-b">
            <div className="container mx-auto max-w-6xl px-6 md:px-10 py-16 md:py-24">
                <motion.div
                    className="flex flex-col items-center text-center gap-5"
                    variants={{ ...container, ...stagger }}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h1 variants={item} className="text-balance text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                        Welcome to Verto Quiz App
                    </motion.h1>
                    <motion.p variants={item} className="text-pretty text-muted-foreground max-w-2xl text-base md:text-lg">
                        Timed quizzes with a real-time clock, a calm review step, and instant results. Designed for focus, speed,
                        and accessibility.
                    </motion.p>
                    <motion.div variants={item} className="flex items-center gap-3 pt-2">
                        <Link href="/dashboard" aria-label="Get started with Verto Quiz App">
                            <Button size="lg">Get Started</Button>
                        </Link>
                        <a
                            href="#features"
                            className="inline-flex h-11 items-center rounded-md border px-5 text-sm transition-colors hover:bg-accent"
                        >
                            Learn More
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </header>
    )
}
