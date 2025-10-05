import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding questions...");

    const questions = [
        {
            content: "What is the capital of France?",
            options: ["Paris", "Berlin", "Rome", "Madrid"],
            correctOption: 0,
        },
        {
            content: "Which language runs in a web browser?",
            options: ["Java", "C", "Python", "JavaScript"],
            correctOption: 3,
        },
        {
            content: "What year was JavaScript created?",
            options: ["1995", "2000", "1998", "1999"],
            correctOption: 0,
        },
        {
            content: "Which company developed React?",
            options: ["Google", "Facebook", "Microsoft", "Apple"],
            correctOption: 1,
        },
        {
            content: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Solution"],
            correctOption: 0,
        },
        {
            content: "Which HTML element is used for JavaScript code?",
            options: ["<js>", "<script>", "<code>", "<javascript>"],
            correctOption: 1,
        },
        {
            content: "Which company created TypeScript?",
            options: ["Facebook", "Google", "Microsoft", "Amazon"],
            correctOption: 2,
        },
        {
            content: "Which database is relational?",
            options: ["MongoDB", "Redis", "PostgreSQL", "Cassandra"],
            correctOption: 2,
        },
        {
            content: "Which command initializes a Node.js project?",
            options: ["npm install", "node start", "npm init", "node init"],
            correctOption: 2,
        },
        {
            content: "What does HTTP stand for?",
            options: ["HyperText Transfer Protocol", "High Text Transport Protocol", "Hyperlink Transfer Process", "HyperText Translation Protocol"],
            correctOption: 0,
        },
        {
            content: "Which of these is NOT a JavaScript framework?",
            options: ["React", "Vue", "Django", "Angular"],
            correctOption: 2,
        },
        {
            content: "What is the purpose of the 'alt' attribute in HTML images?",
            options: ["Sets image size", "Provides alternative text", "Defines image source", "Adds image border"],
            correctOption: 1,
        },
        {
            content: "Which HTML element defines a navigation menu?",
            options: ["<header>", "<nav>", "<section>", "<menu>"],
            correctOption: 1,
        },
        {
            content: "What is the default port for HTTP?",
            options: ["443", "8080", "80", "21"],
            correctOption: 2,
        },
        {
            content: "Which CSS property controls text size?",
            options: ["text-size", "font-style", "font-size", "text-font"],
            correctOption: 2,
        },
        {
            content: "What does API stand for?",
            options: ["Automated Process Integration", "Application Programming Interface", "Advanced Program Interface", "Application Process Integration"],
            correctOption: 1,
        },
        {
            content: "Which version control system is most commonly used?",
            options: ["Subversion", "Mercurial", "Git", "CVS"],
            correctOption: 2,
        },
        {
            content: "What is the main purpose of Node.js?",
            options: ["Styling web pages", "Running JavaScript server-side", "Managing databases", "Compiling TypeScript"],
            correctOption: 1,
        },
        {
            content: "Which of these is a NoSQL database?",
            options: ["MySQL", "MongoDB", "SQLite", "PostgreSQL"],
            correctOption: 1,
        },
        {
            content: "What is the primary function of Webpack?",
            options: ["Database management", "Module bundling", "API routing", "Server-side rendering"],
            correctOption: 1,
        },
        {
            content: "Which HTTP method retrieves data?",
            options: ["POST", "PUT", "GET", "DELETE"],
            correctOption: 2,
        },
        {
            content: "What does JSX stand for in React?",
            options: ["JavaScript Extension", "JSON XML", "Java Syntax", "JavaScript XML"],
            correctOption: 3,
        },
        {
            content: "Which tool manages dependencies in a Node.js project?",
            options: ["pip", "npm", "maven", "composer"],
            correctOption: 1,
        },
        {
            content: "What is the purpose of the 'async' keyword in JavaScript?",
            options: ["Declares variables", "Imports modules", "Defines asynchronous functions", "Makes functions synchronous"],
            correctOption: 2,
        },
        {
            content: "Which CSS framework is known for its grid system?",
            options: ["jQuery", "React", "Bootstrap", "Express"],
            correctOption: 2,
        },
        {
            content: "What is the default port for HTTPS?",
            options: ["80", "21", "443", "8080"],
            correctOption: 2,
        },
        {
            content: "Which JavaScript method adds an element to the end of an array?",
            options: ["pop()", "shift()", "push()", "unshift()"],
            correctOption: 2,
        },
        {
            content: "What is the primary purpose of GraphQL?",
            options: ["Styling web pages", "Querying data efficiently", "Managing sessions", "Compiling code"],
            correctOption: 1,
        },
        {
            content: "Which HTML5 element is used for semantic grouping of content?",
            options: ["<div>", "<span>", "<p>", "<section>"],
            correctOption: 3,
        },
        {
            content: "What does REST stand for in API design?",
            options: ["Remote System Technology", "Representational State Transfer", "Responsive State Transition", "Real-time System Transfer"],
            correctOption: 1,
        },
    ];

    for (const q of questions) {
        await prisma.question.create({
            data: {
                content: q.content,
                correctOption: q.correctOption,
                options: { create: q.options.map((opt) => ({ text: opt })) },
            },
        });
    }

    console.log("✅ Done seeding!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());