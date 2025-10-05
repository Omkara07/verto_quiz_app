import CurrentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const profile = await CurrentProfile();

        if (!profile) return new NextResponse('Unauthorized', { status: 401 });

        const quiz = await db.quiz.create({
            data: {
                userId: profile.id
            }
        });

        return NextResponse.json({ quizId: quiz.id });
    }
    catch (err) {
        console.log("QUIZ_START_POST", err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}