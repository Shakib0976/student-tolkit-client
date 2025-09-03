import { useState } from "react";
import { Sparkles } from "lucide-react";

const BrainBoost = () => {

    // motivational quotes array
    const quotes = [
        "Believe you can and you're halfway there.",
        "Success is the sum of small efforts repeated daily.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Study smarter, not harder.",
        "Your future is created by what you do today, not tomorrow.",
        "Discipline is the bridge between goals and accomplishment.",
        "Every expert was once a beginner."
    ];

    const [quote, setQuote] = useState(
        quotes[Math.floor(Math.random() * quotes.length)]
    );
    //   random quote generator
    const handleNewQuote = () => {
        let newQuote;
        do {
            newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        } while (newQuote === quote);
        setQuote(newQuote);
    };

    return (
        <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="container mx-auto px-6 text-center">
                {/* Heading */}
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                    <Sparkles className="w-7 h-7 text-purple-500" />
                    Brain Boost
                </h2>
                <p className="text-gray-600 mb-8">
                    Get inspired with motivational quotes and study tips.
                </p>

                {/* Quote Card */}
                <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 relative">
                    <p className="text-xl italic text-gray-800 mb-6">“{quote}”</p>

                    {/* Button */}
                    <button
                        onClick={handleNewQuote}
                        className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
                    >
                        New Boost
                    </button>
                </div>
            </div>
        </section>
    );
}


export default BrainBoost;