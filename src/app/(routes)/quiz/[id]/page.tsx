import { Suspense } from "react"
import { QuizApp } from "@/components/quiz/quizApp"
import { getQuizData } from "@/lib/quizData"

export default async function QuizPage({
    params,
}: {
    params: { id: string }
}) {
    const quiz = await getQuizData(params.id)

    return (
        <main className="px-6 md:px-10 py-6">
            <Suspense fallback={<div className="text-muted-foreground">Loading quiz…</div>}>
                <QuizApp quiz={quiz} />
            </Suspense>
        </main>
    )
}
