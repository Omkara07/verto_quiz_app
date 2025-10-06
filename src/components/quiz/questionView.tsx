"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuizData, AnswerMap } from "@/types"
import { motion, AnimatePresence } from "framer-motion"

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
        <AnimatePresence mode="wait">
            <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Question {index + 1} of {quiz.questions.length}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg"
                        >
                            {q.content}
                        </motion.div>

                        <RadioGroup
                            value={selected}
                            onValueChange={(val) => onSelect(q.id, val)}
                            className="grid gap-2"
                        >
                            {q.options.map((opt, i) => (
                                <motion.div
                                    key={opt.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + i * 0.1 }}
                                    className="flex items-center gap-3 rounded-md border p-3 hover:bg-accent/20"
                                >
                                    <RadioGroupItem id={opt.id} value={opt.id} />
                                    <Label htmlFor={opt.id} className="cursor-pointer">
                                        {opt.text}
                                    </Label>
                                </motion.div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                        <Button variant="outline" onClick={onPrev} disabled={isFirst}>
                            Prev
                        </Button>
                        {!isLast ? (
                            <Button onClick={onNext}>Next</Button>
                        ) : (
                            <Button onClick={onSubmitLast}>Submit</Button>
                        )}
                    </CardFooter>
                </Card>
            </motion.div>
        </AnimatePresence>
    )
}
