"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createQuiz } from "@/lib/quizData"

export function QuizCard() {
    const router = useRouter()
    const handleQuizStart = async () => {
        try {
            const quiz = await createQuiz()
            router.push(`/quiz/${quiz.id}`)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <Card className="border">
            <CardHeader>
                <CardTitle className="text-pretty">Take a Quiz</CardTitle>
                <CardDescription className="text-pretty">
                    Test your knowledge with a quick quiz. You can review your results afterwards.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-1">
                    <li>Timed and untimed modes</li>
                    <li>Immediate scoring</li>
                    <li>Detailed explanations on review</li>
                </ul>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Takes ~5–10 minutes</span>
                <Button asChild>
                    <button onClick={handleQuizStart}>Start Quiz</button>
                </Button>
            </CardFooter>
        </Card>
    )
}
