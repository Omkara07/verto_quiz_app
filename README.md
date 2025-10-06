# QuizApp

A modern, interactive, and gamified Quiz Application built with **Next.js 15**, **TypeScript**, **Clerk** for authentication, **PostgreSQL Database**, **Prisma ORM** and **Framer Motion** for smooth animations. This app allows users to take timed quizzes, review answers, and track their progress over time.

---

## Table of Contents

1.  [Features](#features)
2.  [Demo](#demo)
3.  [Tech Stack](#tech-stack)
4.  [Getting Started](#getting-started)
5.  [Project Structure](#project-structure)
6.  [Authentication](#authentication)
7.  [Quiz Flow](#quiz-flow)
8.  [Animations](#animations)
9.  [Deployment](#deployment)
10. [License](#license)

---

## Features

- **User Authentication**: Secure signup and login using Clerk.
- **Timed Quizzes**: Automatic timer with countdown and expiry handling.
- **Quiz Review**: Users can review answers before submitting.
- **Results Tracking**: Persist scores and display results.
- **Responsive UI**: Works seamlessly on mobile, tablet, and desktop.
- **Smooth Animations**: Built with Framer Motion for a polished experience.
- **Previous Quizzes**: Users can track past attempts and performance.

---

---

## Tech Stack

| Category               | Technology               |
| :--------------------- | :----------------------- |
| **Frontend & Backend** | Next.js 13 (App Router)  |
| **Language**           | TypeScript               |
| **Authentication**     | Clerk                    |
| **Database**           | Prisma + PostgreSQL      |
| **Animations**         | Framer Motion            |
| **Styling**            | Tailwind CSS + Shadcn/ui |
| **State Management**   | React hooks              |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- PostgreSQL database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/Omkara07/verto_quiz_app.git](https://github.com/Omkara07/verto_quiz_app.git)
    cd quizapp
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn
    ```

3.  **Create a `.env` file** in the root directory:

    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
    CLERK_SECRET_KEY="your-clerk-secret-key"
    ```

    Replace placeholders with your PostgreSQL and Clerk credentials.

4.  **Run locally:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open `http://localhost:3000` in your browser.

---

## Project Structure

```
├─ app/
│ ├─ dashboard/ # Dashboard page
│ ├─ quiz/ # Quiz pages and components
│ └─ layout.tsx # Root layout
├─ components/
│ ├─ dashboard/
│ │ ├─ quizCard.tsx
│ │ └─ previousQuizzes.tsx
│ ├─ quiz/
│ │ ├─ questionView.tsx
│ │ ├─ quizApp.tsx
│ │ ├─ quizTimer.tsx
│ │ ├─ reviewSubmit.tsx
│ │ └─ resultView.tsx
│ └─ ui/ # Reusable UI components (Card, Button, Table, etc.)
├─ lib/
│ ├─ db.ts # Prisma database client
│ └─ quizData.ts # API functions for quizzes
├─ types/ # TypeScript types for Quiz, Answers, etc.
└─ middleware.ts # Removed for Vercel Edge compatibility
```

---

## Authentication

This app uses **Clerk** for authentication:

- Sign-up and login pages are handled by Clerk.
- Pages are protected using `auth()` instead of middleware for Vercel Edge compatibility:

  ```typescript
  import { auth } from "@clerk/nextjs";
  import { RedirectToSignIn } from "@clerk/nextjs";

  export default async function DashboardPage() {
    const { userId } = auth();
    if (!userId) return <RedirectToSignIn />;
    return <div>Welcome, user!</div>;
  }
  ```

---

## Quiz Flow

1.  **Intro**: Users see quiz details before starting.
2.  **Quiz**: Timed quiz with live countdown.
3.  **Review**: Users can review selected answers.
4.  **Result**: Score is calculated and displayed.

> All quiz data and progress are saved in `localStorage` for persistence across page refreshes.

---

## Animations

Smooth transitions using **Framer Motion**:

- Quiz steps fade in/out with slide animations.
- Review and Result pages scale and fade for a polished feel.

**Example:**

```typescript
import { motion } from "framer-motion";

<motion.div
  key="quiz"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
>
  <QuestionView />
</motion.div>;
```

## Deployment

Vercel

1. Push your repository to GitHub.

2. Connect your repo on Vercel.

3. Set environment variables on Vercel:

- DATABASE_URL

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

- CLERK_SECRET_KEY

- Deploy.

## License

This project is licensed under the MIT License. See LICENSE for details.

## ✨ Extra Notes

1. Designed with reusable UI components for future scalability.

2. Can be extended with leaderboards, multiplayer quiz rooms, or analytics.

3. Fully TypeSafe and production-ready for modern deployment.
