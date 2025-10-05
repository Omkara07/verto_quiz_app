"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { QuizData, AnswerMap } from "@/types"

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
                <div>
                    <CardTitle className="text-pretty">Review your answers</CardTitle>
                    <CardDescription className="text-pretty">
                        Confirm your selections below, then submit the test.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <ul className="grid gap-4">
                    {quiz.questions.map((q: any, idx: number) => {
                        const picked = answers[q.id]
                        const pickedText = q.options.find((o: any) => o.id === picked)?.text
                        return (
                            <li key={q.id} className="rounded-md border p-4">
                                <div className="text-sm text-muted-foreground mb-1">Question {idx + 1}</div>
                                <div className="font-medium mb-2">{q.content}</div>
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Your answer: </span>
                                    {pickedText ? pickedText : <span className="italic text-muted-foreground">Unanswered</span>}
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <div className="flex items-center justify-end">
                    <Button onClick={onFinalSubmit}>Submit Test</Button>
                </div>
            </CardContent>
        </Card>
    )
}
