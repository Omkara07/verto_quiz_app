import { db } from "@/lib/db";
interface PageProps {
    params: Promise<{
        id: string
    }>
}
const QuizPage = async ({ params }: PageProps) => {
    const { id } = await params;

    // get 10 random question IDs (sql raw query for random order)
    const randomQuestions = await db.$queryRaw<{ id: string }[]>`
        SELECT id FROM "Question"
        ORDER BY RANDOM()
        LIMIT 10
        `;

    // extract IDs
    const ids = randomQuestions.map(q => q.id);

    // fetch full questions
    const questions = await db.question.findMany({
        where: { id: { in: ids } },
        include: { options: true, Answer: true },
    });
    console.log(questions)
    const areQuestions = questions && questions?.length > 0
    return (
        <div>
            {
                areQuestions ? (
                    <div>
                        <h1>Quiz</h1>
                        <p>{id}</p>
                        {questions.map((question: any) => (
                            <div key={question.id}>
                                <h2>{question.content}</h2>
                                {question.options.map((option: any) => (
                                    <div key={option.id}>
                                        <input type="radio" name={question.id} value={option.id} />
                                        <label>{option.text}</label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) :
                    (
                        <p>Something went wrong</p>
                    )
            }
        </div>
    );
}

export default QuizPage;