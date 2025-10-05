"use client"

import { useEffect, useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function QuizTimer({
    endAt,
    onExpire,
}: {
    endAt: number
    onExpire: () => void
}) {
    const [now, setNow] = useState<number>(() => Date.now())

    useEffect(() => {
        const i = setInterval(() => {
            setNow(Date.now())
        }, 250)
        return () => clearInterval(i)
    }, [])

    const { mm, ss, done } = useMemo(() => {
        const msLeft = Math.max(0, endAt - now)
        const totalSeconds = Math.floor(msLeft / 1000)
        const m = Math.floor(totalSeconds / 60)
        const s = totalSeconds % 60
        return { mm: String(m).padStart(2, "0"), ss: String(s).padStart(2, "0"), done: msLeft <= 0 }
    }, [endAt, now])

    useEffect(() => {
        if (done) {
            onExpire()
        }
    }, [done, onExpire])

    return (
        <Badge variant="secondary" className="text-base font-mono">
            {mm}:{ss}
        </Badge>
    )
}
