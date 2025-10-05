"use server"

// utils functions for quiz
import { db } from "@/lib/db"
import CurrentProfile from "./currentProfile"

// creates a new quiz
export async function createQuiz() {
    const profile = await CurrentProfile();
    if (!profile) throw new Error("Unauthorized")
    const userId = profile.id

    // pick 10 random questions (raw query for random order)
    const randomQuestions = await db.$queryRaw<{ id: string }[]>`
    SELECT id FROM "Question" ORDER BY RANDOM() LIMIT 10
  `
    const ids = randomQuestions.map(q => q.id)

    const quiz = await db.quiz.create({
        data: {
            userId,
            answers: {
                create: ids.map(qid => ({ questionId: qid }))
            }
        },
        include: {
            answers: { include: { question: { include: { options: true } } } }
        }
    })

    return quiz
}

// submit a quiz, update quiz answers, calculate and return score
export async function submitQuiz(quizId: string, answers: Record<string, string>) {
    const quiz = await db.quiz.findUnique({
        where: { id: quizId },
        include: { answers: { include: { question: { include: { options: true } } } } }
    })
    if (!quiz) throw new Error("Quiz not found")

    let score = 0

    for (const ans of quiz.answers) {
        const chosenId = answers[ans.questionId]
        if (chosenId) {
            await db.answer.update({
                where: { id: ans.id },
                data: { optionId: chosenId }
            })
        }
        // check correctness
        const correctOpt = ans.question.options[ans.question.correctOption]
        if (chosenId && chosenId === correctOpt.id) {
            score++
        }
    }

    await db.quiz.update({
        where: { id: quizId },
        data: { score }
    })

    return score
}

// format and fetch the quiz data (questions and options)
export async function getQuizData(quizId: string) {
    const quiz = await db.quiz.findUnique({
        where: { id: quizId },
        include: {
            answers: {
                include: { question: { include: { options: true } }, option: true }
            }
        }
    })
    if (!quiz) throw new Error("Not found")

    return {
        id: quiz.id,
        title: "General Knowledge Quiz",
        questions: quiz.answers.map(ans => ({
            id: ans.question.id,
            content: ans.question.content,
            options: ans.question.options.map(o => ({ id: o.id, text: o.text })),
            correctOption: ans.question.correctOption
        }))
    }
}
