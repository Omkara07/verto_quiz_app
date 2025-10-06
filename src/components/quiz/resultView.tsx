"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { QuizData, AnswerMap } from "@/types"
import Link from "next/link"
import { Button } from "../ui/button"
import { motion } from "framer-motion"

export function ResultView({
    quiz,
    answers,
    storageKey,
}: {
    quiz: QuizData
    answers: AnswerMap
    storageKey: string
}) {
    const [score, setScore] = useState<number | null>(null)

    useEffect(() => {
        const s = Number(localStorage.getItem(storageKey) || 0)
        setScore(Number.isFinite(s) ? s : 0)
    }, [storageKey])

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <Card>
                <CardHeader>
                    <CardTitle>Result</CardTitle>
                    <CardDescription>Your quiz has been submitted.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-2xl font-semibold"
                    >
                        {score !== null ? `${score} / ${quiz.questions.length}` : "…"}
                    </motion.div>
                    <div className="text-muted-foreground">
                        Thanks for participating! You can review questions above or take another quiz from the dashboard.
                    </div>
                    <motion.div>
                        <Link href="/dashboard">
                            <Button>Go to Dashboard</Button>
                        </Link>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
