import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

type QuizItem = {
    id: string,
    userId: string
    score: number,
    answers: any,
    createdAt: Date
}


export function PreviousQuizzes({ items }: { items: QuizItem[] }) {
    const hasItems = items && items.length > 0

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div>
                    <CardTitle className="text-pretty">Previous Quizzes</CardTitle>
                    <CardDescription className="text-pretty">
                        Review your past attempts to track progress and identify areas to improve.
                    </CardDescription>
                </div>
                {hasItems ? (
                    <Button asChild variant="outline" className="shrink-0 bg-transparent">
                        <Link href="/quizzes">View all</Link>
                    </Button>
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
                                    <TableRow key={q.id}>
                                        <TableCell>Quiz {i + 1}</TableCell>
                                        <TableCell>{new Date(q.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">{q.score}/10</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <Empty className="border border-dashed">
                        <EmptyHeader>
                            <EmptyTitle>No previous quizzes</EmptyTitle>
                            <EmptyDescription>
                                You haven&apos;t taken any quizzes yet. Start your first one to see it listed here.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button asChild>
                                <Link href="/quiz">Take your first quiz</Link>
                            </Button>
                        </EmptyContent>
                    </Empty>
                )}
            </CardContent>
        </Card>
    )
}
