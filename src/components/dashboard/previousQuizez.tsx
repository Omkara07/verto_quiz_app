"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { createQuiz } from "@/lib/quizData"

type QuizItem = {
    id: string
    userId: string
    score: number
    answers: any
    createdAt: Date
}

export function PreviousQuizzes({ items }: { items: QuizItem[] }) {
    const hasItems = items && items.length > 0
    const router = useRouter()

    const handleQuizStart = async () => {
        try {
            const quiz = await createQuiz()
            router.push(`/quiz/${quiz.id}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <CardTitle className="text-pretty">Previous Quizzes</CardTitle>
                        <CardDescription className="text-pretty">
                            Review your past attempts to track progress and identify areas to improve.
                        </CardDescription>
                    </motion.div>

                    {hasItems ? (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild variant="outline" className="shrink-0 bg-transparent">
                                View all
                            </Button>
                        </motion.div>
                    ) : null}
                </CardHeader>

                <CardContent>
                    {hasItems ? (
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Quiz</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((q, i: number) => (
                                        <motion.tr
                                            key={q.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                        >
                                            <TableCell>Quiz {items.length - i}</TableCell>
                                            <TableCell>
                                                {new Date(q.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">{q.score}/10</TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Empty className="border border-dashed">
                                <EmptyHeader>
                                    <EmptyTitle>No previous quizzes</EmptyTitle>
                                    <EmptyDescription>
                                        You haven&apos;t taken any quizzes yet. Start your first one to see it listed here.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>
                                    <Button asChild>
                                        <button onClick={handleQuizStart}>Take your first quiz</button>
                                    </Button>
                                </EmptyContent>
                            </Empty>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}
