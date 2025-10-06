"use client";

import { motion } from "framer-motion";
import { QuizCard } from "@/components/dashboard/quizCard";
import { PreviousQuizzes } from "@/components/dashboard/previousQuizez";

export default function DashboardClient({ profile, quizzes }: any) {
    return (
        <main className="px-6 md:px-10 py-6 space-y-6">
            <motion.header
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Welcome back {profile.name}
                </motion.p>
            </motion.header>

            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <QuizCard />
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={{
                    hidden: {},
                    show: {
                        transition: { staggerChildren: 0.15 },
                    },
                }}
            >
                <PreviousQuizzes items={quizzes.map((quiz: any, i: number) => ({
                    ...quiz,
                    motionProps: {
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.4, delay: i * 0.1 + 0.5 },
                    },
                }))} />
            </motion.section>
        </main>
    );
}
