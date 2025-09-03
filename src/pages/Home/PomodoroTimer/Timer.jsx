import React, { useState, useEffect } from "react";

const Timer = () => {
    const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);

    // timer logic

    useEffect(() => {
        let timer;
        if (isRunning && time > 0) {
            timer = setInterval(() => setTime((prev) => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    // timer controls

    const handleStartPause = () => setIsRunning(!isRunning);
    const handleReset = () => {
        setIsRunning(false);
        setTime(25 * 60);
    };

    // progress in %
    const progress = ((25 * 60 - time) / (25 * 60)) * 100;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">⏳ Pomodoro Timer</h2>
                <p className="text-gray-600 mb-8">
                    Stay focused with 25-minute study sessions and short breaks.
                </p>

                <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8">
                    {/* Timer Display */}
                    <div className="text-6xl font-bold text-gray-800 mb-6">
                        {formatTime(time)}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                        <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleStartPause}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            {isRunning ? "Pause" : "Start"}
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timer;
