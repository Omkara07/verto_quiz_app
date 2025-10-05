import { motion } from "framer-motion";
import { Brain, Target, BarChart3, Zap, Users, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
    {
        icon: Target,
        title: "Focused Practice",
        description: "Target specific topics and areas where you need improvement",
        color: "secondary",
    },
    {
        icon: BarChart3,
        title: "Progress Tracking",
        description: "Detailed analytics and insights to monitor your learning journey",
        color: "accent",
    },
    {
        icon: Zap,
        title: "Instant Feedback",
        description: "Get immediate explanations for every answer to accelerate learning",
        color: "primary",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const FeaturesSection = () => {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background -z-10" />

            <div className="container mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Everything You Need to{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">Excel</span>
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-foreground/10 -z-10"></span>
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Powerful features designed to make learning interactive, engaging, and effective
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="group relative p-6 h-full bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary/20 cursor-pointer overflow-hidden">
                                {/* Hover Effect Background */}
                                <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors"
                                    >
                                        <feature.icon className="w-6 h-6" />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Bottom Border Animation */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-foreground"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
