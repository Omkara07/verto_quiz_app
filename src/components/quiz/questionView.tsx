"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuizData, AnswerMap } from "@/types"

export function QuestionView({
    quiz,
    index,
    answers,
    onSelect,
    onPrev,
    onNext,
    onSubmitLast,
}: {
    quiz: QuizData
    index: number
    answers: AnswerMap
    onSelect: (questionId: string, optionId: string) => void
    onPrev: () => void
    onNext: () => void
    onSubmitLast: () => void
}) {
    const q = quiz.questions[index]
    const selected = answers[q?.id] || ""
    const isFirst = index === 0
    const isLast = index === quiz.questions.length - 1

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-pretty">
                    Question {index + 1} of {quiz.questions.length}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-lg">{q.content}</div>
                <RadioGroup value={selected} onValueChange={(val) => onSelect(q.id, val)} className="grid gap-2">
                    {q.options.map((opt) => (
                        <div key={opt.id} className="flex items-center gap-3 rounded-md border p-3">
                            <RadioGroupItem id={opt.id} value={opt.id} />
                            <Label htmlFor={opt.id} className="cursor-pointer">
                                {opt.text}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <Button variant="outline" onClick={onPrev} disabled={isFirst}>
                    Prev
                </Button>
                {!isLast ? <Button onClick={onNext}>Next</Button> : <Button onClick={onSubmitLast}>Submit</Button>}
            </CardFooter>
        </Card>
    )
}
