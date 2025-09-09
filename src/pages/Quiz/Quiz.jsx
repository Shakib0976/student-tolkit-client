import React, { useState, useRef, useEffect, useContext } from "react";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../Context/AuthContext";
import { ClipboardList } from "lucide-react";
import toast from "react-hot-toast";

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];

const Quiz = () => {

    // all state for subject detect , difficulty check ,  massage , question generate and ans etc
    const [subject, setSubject] = useState("Computer Science");
    const [difficulty, setDifficulty] = useState("Medium");
    const [questionType, setQuestionType] = useState("Multiple Choice");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [selectedCorrectAns, SetSelectedCorrectAns] = useState(false);
    const [attempts, setAttempts] = useState([]);


    console.log(attempts);

    // user get authContext
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;

    // correct snd wrong sound implement
    const correctSound = useRef(new Audio("/src/assets/correct-6033.mp3"));
    const wrongSound = useRef(new Audio("/src/assets/wrong-answer-126515.mp3"));

    // Fetch previous attempts for feature section
    useEffect(() => {
        if (!userEmail) return;
        fetch(`https://student-toolkit-balkend.vercel.app/quiz-attempts/${userEmail}`)
            .then((res) => res.json())
            .then((data) => setAttempts(data))
            .catch((err) => console.error(err));
    }, [userEmail]);


    console.log(attempts)
    // Generate Question with ai 
    const generateQuestion = async () => {
        setLoading(true);
        setSelectedAnswer(null);
        try {
            const res = await fetch("https://student-toolkit-balkend.vercel.app/generate-question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, type: questionType, difficulty }),
            });
            const data = await res.json();
            setMessages([{ role: "assistant", content: data.question, options: data.options }]);
            setCorrectAnswer(data.answer);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // Handle Answer , this function check ans is valid or not valid
    const handleAnswer = (opt) => {
        const selectedLetter = opt.trim().toLowerCase().charAt(0);
        const correctLetter = correctAnswer.trim().toLowerCase();

        setSelectedAnswer(opt);
        setAnsweredQuestions((prev) => prev + 1);

        const isCorrect = selectedLetter === correctLetter;
        SetSelectedCorrectAns(isCorrect);

        if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1);
            correctSound.current.play();
        } else {
            setWrongAnswers((prev) => prev + 1);
            wrongSound.current.play();
        }

        // Save attempt to DB
        fetch("https://student-toolkit-balkend.vercel.app/quiz-attempts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: userEmail,
                subject,
                difficulty,
                question: messages[0]?.content,
                selectedAnswer: opt,
                correctAnswer,
                result: isCorrect ? "correct" : "wrong",
                createdAt: new Date(),
            }),
        })

            // get attempt from Db
            .then(() =>
                fetch(`https://student-toolkit-balkend.vercel.app/quiz-attempts/${userEmail}`)
                    .then((res) => res.json())
                    .then((data) => setAttempts(data))
            )
            .catch((err) => console.error(err));
    };

    // Clear all history for user
    const clearHistory = async () => {
        if (!userEmail) return;
        await fetch(`https://student-toolkit-balkend.vercel.app/quiz-attempts/clear/${userEmail}`, {
            method: "DELETE",
        });
        setAttempts([]);
        toast.success('All History Clear Success')
    };

    //   this user correct , incorrect  and attempt detected
    const totalAnsweredByDb = attempts?.length || 0;
    const totalCorrectByDb = attempts.filter(a => a.result === "correct").length;
    const totalWrongByDb = attempts.filter(a => a.result === "wrong").length;

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen">
            <h1 className=" text-2xl md:text-3xl font-bold text-purple-600 ">
                Exam Q&A Generator
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
                Generate question and strengthen your knowledge
            </p>

            {/* Question Settings  section*/}
            <div className="bg-white dark:bg-slate-900 shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Question Settings</h3>
                <div className="md:flex space-y-3 md:space-x-6">
                    {/* Subject */}
                    <div className=" md:w-1/3">
                        <label className="block dark:text-gray-300 text-gray-600">Select Subject</label>
                        <select
                            className="w-full border dark:bg-slate-800 rounded-lg px-3 py-2"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            {subjects.map((sub) => (
                                <option key={sub} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty section */}
                    <div className="md:w-1/3">
                        <label className="block dark:text-gray-300 text-gray-600">Difficulty Level</label>
                        <select
                            className="w-full border dark:bg-slate-800 rounded-lg px-3 py-2"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    {/* Question Type select section */}
                    <div className="md:w-1/3">
                        <label className="block dark:text-gray-300 text-gray-600">Question Type</label>
                        <select
                            className="w-full border dark:bg-slate-800 rounded-lg px-3 py-2"
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                        >
                            <option>Multiple Choice</option>
                            <option>True/False</option>
                        </select>
                    </div>
                </div>



                {/* question generate and reset button */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={generateQuestion}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        Generate Question
                    </button>
                    <button
                        onClick={() => {
                            setMessages([]);
                            setAnsweredQuestions(0);
                            setCorrectAnswers(0);
                            setWrongAnswers(0);
                            setSelectedAnswer(null);
                            SetSelectedCorrectAns(false);
                        }}
                        className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Question + Stats */}
            <div className="flex flex-col lg:flex-row bg-white dark:bg-slate-900 shadow-lg rounded-2xl p-6 gap-6">
                {/* Question Area */}
                <div className="flex-1">
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center h-40"
                        >
                            <motion.div
                                className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                            <p className="ml-3 text-gray-500">Generating question...</p>
                        </motion.div>
                    )}

                    {/* No Question */}
                    {!loading && messages.length === 0 && (
                        <div className="h-50 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-xl">
                            <FaRobot className="text-3xl mb-2" />
                            <p>No question generated yet</p>
                        </div>
                    )}

                    {/* Question */}
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-2 text-purple-600">
                                <FaRobot />
                                <span className="font-semibold">AI:</span>
                            </div>
                            {/* Question */}
                            <p className="text-gray-800 dark:text-gray-200 text-lg font-medium leading-relaxed">
                                {msg.content}
                            </p>

                            {/* Options */}
                            {msg.options && (
                                <div className="flex flex-col gap-3 mt-4">
                                    {msg.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(opt)}
                                            disabled={!!selectedAnswer}
                                            className={`px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all duration-200 shadow-sm ${selectedAnswer === opt ? selectedCorrectAns ? "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/40 border-red-500 text-red-700 dark:text-red-400"
                                                : "bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                                                } ${!selectedAnswer ? "hover:shadow-md cursor-pointer" : "opacity-90 cursor-not-allowed"}
          `}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {selectedAnswer && (
                        <p
                            className={`mt-3 font-semibold ${selectedCorrectAns ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {selectedCorrectAns
                                ? "✅ Correct!"
                                : `❌ Wrong. Correct Answer: ${correctAnswer}`}
                        </p>
                    )}
                </div>

                {/* Stats Sidebar with display , right ans wrong ans and attempt */}
                <div className="lg:w-1/3 flex flex-col items-center justify-between border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-6">
                    <div className="text-center mb-6 w-full">
                        <h4 className="font-semibold text-gray-600 mb-4">Session Statistics</h4>
                        {
                            user ? <div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <span className="block text-xl font-bold">{totalAnsweredByDb}</span>
                                        <span className="text-gray-500 text-sm">Answered</span>
                                    </div>
                                    <div>
                                        <span className="block text-xl font-bold text-green-600">
                                            {totalCorrectByDb}
                                        </span>
                                        <span className="text-gray-500 text-sm">Correct</span>
                                    </div>
                                    <div>
                                        <span className="block text-xl font-bold text-red-600">
                                            {totalWrongByDb}
                                        </span>
                                        <span className="text-gray-500 text-sm">Wrong</span>
                                    </div>
                                </div>


                            </div>
                                : <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <span className="block text-xl font-bold">{answeredQuestions}</span>
                                        <span className="text-gray-500 text-sm">Answered</span>
                                    </div>
                                    <div>
                                        <span className="block text-xl font-bold text-green-600">
                                            {correctAnswers}
                                        </span>
                                        <span className="text-gray-500 text-sm">Correct</span>
                                    </div>
                                    <div>
                                        <span className="block text-xl font-bold text-red-600">
                                            {wrongAnswers}
                                        </span>
                                        <span className="text-gray-500 text-sm">Wrong</span>
                                    </div>
                                </div>
                        }
                        <p className="mt-4 text-lg font-semibold text-purple-600">
                            {answeredQuestions > 0
                                ? `${((correctAnswers / answeredQuestions) * 100).toFixed(0)}%`
                                : "0%"}{" "}
                            Accuracy
                        </p>
                    </div>
                    <button
                        onClick={generateQuestion}
                        className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition shadow"
                    >
                        Next Question
                    </button>
                </div>
            </div>

            {/* Quiz History  section*/}
            <div className="mt-10 bg-white dark:bg-slate-900 shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Your Quiz History</h3>
                    {attempts.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="bg-blue-950   text-white px-4  py-2 cursor-pointer rounded hover:bg-blue-800 transition text-sm"
                        >
                            Clear History
                        </button>
                    )}
                </div>

                {attempts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <ClipboardList className="h-12 w-12 text-purple-500 mb-4 animate-bounce" />
                        <p className="text-gray-500 dark:text-gray-400 text-center text-lg font-medium">
                            No attempts saved yet
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm text-center mt-2">
                            Your quiz attempts will appear here once you start solving questions.
                        </p>
                    </div>
                ) : (
                    <ul className="space-y-3 max-h-80 overflow-y-auto">
                        {attempts.map((a, idx) => (
                            <li
                                key={idx}
                                className="p-3 border rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold">
                                        {a.subject} ({a.difficulty})
                                    </p>
                                    <p className="text-sm dark:text-gray-400 text-gray-600">{a.question}</p>
                                    <p className="text-sm">
                                        Your Answer:{" "}
                                        <span
                                            className={`${a.result === "correct" ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {a.selectedAnswer}
                                        </span>
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-lg text-white text-sm ${a.result === "correct" ? "bg-green-500" : "bg-red-500"
                                        }`}
                                >
                                    {a.result}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Quiz;