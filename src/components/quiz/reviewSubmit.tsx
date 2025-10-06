"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { QuizData, AnswerMap } from "@/types"
import { motion } from "framer-motion"

export function ReviewSubmit({
    quiz,
    answers,
    onFinalSubmit,
}: {
    quiz: QuizData
    answers: AnswerMap
    onFinalSubmit: () => void
}) {
    return (
        <Card>
            <CardHeader className="flex items-start justify-between gap-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <CardTitle>Review your answers</CardTitle>
                    <CardDescription>
                        Confirm your selections below, then submit the test.
                    </CardDescription>
                </motion.div>
            </CardHeader>
            <CardContent className="space-y-4">
                <ul className="grid gap-4">
                    {quiz.questions.map((q, idx) => {
                        const picked = answers[q.id]
                        const pickedText = q.options.find((o: any) => o.id === picked)?.text
                        return (
                            <motion.li
                                key={q.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="rounded-md border p-4"
                            >
                                <div className="text-sm text-muted-foreground mb-1">Question {idx + 1}</div>
                                <div className="font-medium mb-2">{q.content}</div>
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Your answer: </span>
                                    {pickedText ? pickedText : <span className="italic text-muted-foreground">Unanswered</span>}
                                </div>
                            </motion.li>
                        )
                    })}
                </ul>
                <motion.div className="flex justify-end">
                    <Button onClick={onFinalSubmit}>Submit Test</Button>
                </motion.div>
            </CardContent>
        </Card>
    )
}
