"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { QuizData, AnswerMap } from "@/types"
import Link from "next/link"
import { Button } from "../ui/button"

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
        <Card>
            <CardHeader>
                <CardTitle className="text-pretty">Result</CardTitle>
                <CardDescription className="text-pretty">Your quiz has been submitted.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-2xl font-semibold">{score !== null ? `${score} / ${quiz.questions.length}` : "…"}</div>
                <div className="text-muted-foreground">
                    Thanks for participating! You can review questions above or take another quiz from the dashboard.
                </div>
                <Link href='/dashboard'> <Button>Go to Dashboard</Button> </Link>
            </CardContent>
        </Card>
    )
}
