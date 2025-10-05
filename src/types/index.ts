export type Option = {
    id: string
    text: string
}

export type Question = {
    id: string
    content: string
    options: Option[]
    correctOption: number
    createdAt?: string
}

export type QuizData = {
    id: string
    title: string
    questions: Question[]
}

// for mapping answer in the cache
export type AnswerMap = Record<string, string>