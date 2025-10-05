"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"

export function QuizCard() {
    const router = useRouter()
    const handleQuizStart = async () => {
        try {
            const res = await axios.post("/api/quiz/start");
            if (!res.data) {
                console.log("failed to start quiz")
            }
            const { quizId }: any = res?.data
            router.push(`/quiz/${quizId}`)
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
