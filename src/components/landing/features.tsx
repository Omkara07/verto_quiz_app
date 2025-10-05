"use client"

import { motion } from "framer-motion"
import { Clock, ListChecks, ShieldCheck } from "lucide-react"

const features = [
    {
        title: "Real-time Timer",
        desc: "Accurate countdown that persists across refresh for a fair timed experience.",
        Icon: Clock,
    },
    {
        title: "Review Then Submit",
        desc: "Pause the clock at the review screen to calmly confirm answers before submitting.",
        Icon: ListChecks,
    },
    {
        title: "Instant Results",
        desc: "See your score immediately with a clear summary of your performance.",
        Icon: ShieldCheck,
    },
]

export function Features() {
    return (
        <section id="features" aria-labelledby="features-heading" className="py-14 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-10">
                <h2 id="features-heading" className="text-balance text-2xl md:text-4xl font-semibold mb-2">
                    Everything you need to practice better
                </h2>
                <p className="text-muted-foreground text-pretty max-w-2xl">
                    Smooth navigation, reliable timing, and focused review help you learn faster and score higher.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {features.map((f, i) => (
                        <motion.article
                            key={f.title}
                            className="rounded-lg border p-6 h-full bg-background"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <f.Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                                <h3 className="text-lg font-semibold">{f.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{f.desc}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
