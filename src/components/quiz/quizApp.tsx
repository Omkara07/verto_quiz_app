"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { QuizTimer } from "@/components/quiz/quizTimer"
import { QuestionView } from "@/components/quiz/questionView"
import { ReviewSubmit } from "@/components/quiz/reviewSubmit"
import { ResultView } from "@/components/quiz/resultView"
import type { QuizData, AnswerMap } from "@/types"
import { submitQuiz } from "@/lib/quizData"

type Step = "intro" | "quiz" | "review" | "result"

const DURATION_MIN = 10 // 10 minutes

export function QuizApp({ quiz }: { quiz: QuizData }) {
    const params = useParams<{ id: string }>()
    const quizId = params?.id || quiz.id

    // localStorage keys
    const STORAGE_KEYS = useMemo(() => {
        const base = `quiz-${quizId}`
        return {
            step: `${base}-step`,
            startAt: `${base}-startAt`,
            endAt: `${base}-endAt`,
            answers: `${base}-answers`,
            submitted: `${base}-submitted`,
            score: `${base}-score`,
        }
    }, [quizId])

    // State
    const [step, setStep] = useState<Step>("intro")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<AnswerMap>({})
    const [endAt, setEndAt] = useState<number>(0)

    // hydrate from storage
    useEffect(() => {
        const submitted = localStorage.getItem(STORAGE_KEYS.submitted)
        if (submitted === "true") {
            setStep("result")
        } else {
            const savedStep = (localStorage.getItem(STORAGE_KEYS.step) as Step | null) || "intro"
            const endAt = Number(localStorage.getItem(STORAGE_KEYS.endAt) || 0)
            const now = Date.now()
            // restore answers
            const savedAnswers = localStorage.getItem(STORAGE_KEYS.answers)
            if (savedAnswers) {
                try {
                    setAnswers(JSON.parse(savedAnswers))
                } catch (err) {
                    console.log(err)
                }
            }
            if (savedStep === "intro") {
                setStep("intro")
            } else if (endAt && now >= endAt) {
                // time over
                setStep("review")
            } else {
                setStep(savedStep || "intro")
            }
        }
    }, [STORAGE_KEYS])

    // persist step/answers
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.step, step)
    }, [STORAGE_KEYS.step, step])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(answers))
    }, [STORAGE_KEYS.answers, answers])

    // start quiz 
    const handleStart = useCallback(() => {
        const startAt = Date.now()
        const endAt = startAt + DURATION_MIN * 60_000
        localStorage.setItem(STORAGE_KEYS.startAt, String(startAt))
        localStorage.setItem(STORAGE_KEYS.endAt, String(endAt))
        setStep("quiz")
        setCurrentIndex(0)
    }, [STORAGE_KEYS.startAt, STORAGE_KEYS.endAt])

    // timer expiration => move to review
    const handleExpire = useCallback(() => {
        setStep("review")
    }, [])

    // navigation
    const goPrev = useCallback(() => {
        setCurrentIndex((i) => Math.max(0, i - 1))
    }, [])
    const goNext = useCallback(() => {
        setCurrentIndex((i) => Math.min(quiz.questions.length - 1, i + 1))
    }, [quiz.questions.length])

    // answer selection
    const selectAnswer = useCallback((questionId: string, optionId: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
    }, [])

    // from quiz to review (last ques submit)
    const goToReview = useCallback(() => {
        setStep("review")
    }, [])

    // final submit => compute score + result
    const handleFinalSubmit = useCallback(async () => {
        const score = await submitQuiz(quiz.id, answers)  // send answers to server
        localStorage.setItem(STORAGE_KEYS.score, String(score))
        localStorage.setItem(STORAGE_KEYS.submitted, "true")
        setStep("result")
    }, [answers, quiz.id, STORAGE_KEYS])


    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedEndAt = Number(localStorage.getItem(STORAGE_KEYS.endAt) || 0)
            setEndAt(storedEndAt)
        }
    }, [STORAGE_KEYS.endAt])

    const isQuizStep = step === "quiz"
    const isReview = step === "review"
    const isResult = step === "result"

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-balance">{quiz.title}</h1>
                    <p className="text-muted-foreground text-pretty">
                        {step === "intro"
                            ? "Please review the quiz details before starting."
                            : step === "quiz"
                                ? "Answer the questions before time runs out."
                                : step === "review"
                                    ? "Review your answers and submit the test."
                                    : "Your result"}
                    </p>
                </div>
                {/* Top-right live countdown clock during quiz, stops on review/result */}
                <div className="shrink-0">
                    {isQuizStep && endAt ? (
                        <QuizTimer endAt={endAt} onExpire={handleExpire} />
                    ) : (
                        <div className="text-sm text-muted-foreground">Timer stopped</div>
                    )}
                </div>
            </div>

            {step === "intro" && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-pretty">Before you begin</CardTitle>
                        <CardDescription className="text-pretty">Read the instructions carefully.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>Duration: {DURATION_MIN} minutes</li>
                            <li>Questions: {quiz.questions.length}</li>
                            <li>Quiz will be automatically submitted when time ends.</li>
                        </ul>
                        <Separator />
                        <div className="flex items-center justify-end">
                            <Button onClick={handleStart}>Start Quiz</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {isQuizStep && (
                <QuestionView
                    quiz={quiz}
                    index={currentIndex}
                    answers={answers}
                    onSelect={selectAnswer}
                    onPrev={goPrev}
                    onNext={goNext}
                    onSubmitLast={goToReview}
                />
            )}

            {isReview && <ReviewSubmit quiz={quiz} answers={answers} onFinalSubmit={handleFinalSubmit} />}

            {isResult && <ResultView quiz={quiz} answers={answers} storageKey={STORAGE_KEYS.score} />}
        </div>
    )
}
