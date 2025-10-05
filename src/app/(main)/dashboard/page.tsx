import { initialProfile } from "@/lib/initialProfile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import DashboardClient from "@/components/dashboard/dashboardClient";

export default async function DashboardPage() {
    const profile = await initialProfile();
    if (!profile) return <RedirectToSignIn />;

    const quizzes = await db.quiz.findMany({
        where: {
            userId: profile.id,
        },
        include: { answers: true },
        orderBy: { createdAt: "desc" },
    });

    return <DashboardClient profile={profile} quizzes={quizzes} />;
}
