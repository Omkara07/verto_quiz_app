import { QuizCard } from "@/components/dashboard/quizCard"
import { PreviousQuizzes } from "@/components/dashboard/previousQuizez"
import { initialProfile } from "@/lib/initialProfile";
import { RedirectToSignIn } from "@clerk/nextjs";
import axios from "axios";
import { db } from "@/lib/db";

export default async function DashboardPage() {
    const profile = await initialProfile();
    if (!profile) return <RedirectToSignIn />

    const quizzes = await db.quiz.findMany({
        where: {
            userId: profile.id
        },
        include: { answers: true }
    });
    return (
        <main className="px-6 md:px-10 py-6 space-y-6">
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back {profile.name}
                </p>
            </header>

            <section>
                <QuizCard />
            </section>

            <section>
                <PreviousQuizzes items={quizzes} />
            </section>
        </main>
    )
}
