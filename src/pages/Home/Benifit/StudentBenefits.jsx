import React from "react";
import { Calendar, Wallet, BookOpen, Target, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import studentImg from "../../../assets/joyful-schoolboy-with-heavy-backpack-removebg-preview.png";

const StudentBenefits = () => {
    const benefits = [
        {
            icon: <Calendar className="w-8 h-8 text-blue-600" />,
            title: "Class Schedule Tracker",
            description:
                "Stay on top of your daily or weekly classes. Add, edit, or delete subjects and color-code them for better organization.",
        },
        {
            icon: <Wallet className="w-8 h-8 text-green-600" />,
            title: "Budget Tracker",
            description:
                "Manage allowance, part-time earnings, and expenses. Visualize your spending with charts and track your savings goals.",
        },
        {
            icon: <BookOpen className="w-8 h-8 text-purple-600" />,
            title: "Exam Q&A Generator",
            description:
                "Prepare smarter with random practice questions in multiple formats. Choose difficulty levels to match your exam prep.",
        },
        {
            icon: <Target className="w-8 h-8 text-red-600" />,
            title: "Study Planner",
            description:
                "Break big study goals into smaller tasks. Assign subjects, priorities, and deadlines to stay productive and focused.",
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section className="py-30 px-5 md:px-10">
            <div className="text-center mb-8 px-4 sm:px-6 md:px-10">
                <div className="flex  gap-3 items-center justify-center md:gap-4 mb-4">
                    <GraduationCap className="w-12 h-12 text-blue-600 mb-2 md:mb-0" />
                    <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800">
                        Discover the Benefits
                    </h2>
                </div>
                <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
                    Unlock tools, resources, and tips designed to help students manage their studies, stay organized, and make the most of campus life.
                </p>
            </div>


            <div className="max-w-7xl mx-auto mt-5 px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <img
                        src={studentImg}
                        alt="Student using toolkit"
                        className="rounded-2xl mt-5 shadow-lg"
                    />
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="grid gap-20 sm:grid-cols-2">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex items-start gap-4"
                            >
                                <div className="p-2 bg-white rounded-lg shadow">{benefit.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-lg">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StudentBenefits;
