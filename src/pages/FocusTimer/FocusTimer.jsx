import React, { useState, useEffect, useRef } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { FaFire } from "react-icons/fa"; import { GiArcheryTarget } from "react-icons/gi";
import tickSound from '../../assets/sound2.mp3';
import beepSound from '../../assets/sound2.mp3';

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];

const FocusTimer = () => {
    // min state
    const [minutes, setMinutes] = useState(25);
    // sec state
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    // default duration state
    const [duration, setDuration] = useState(25);
    const [subject, setSubject] = useState(subjects[0]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [streak, setStreak] = useState(0);
    const [sessions, setSessions] = useState(0);
    const [level] = useState(1);
    // sound on off state
    const [soundOn, setSoundOn] = useState(true);

    // timer href
    const timerRef = useRef(null);
    const tickRef = useRef(null);
    const beepRef = useRef(null);

    useEffect(() => {
        setMinutes(duration);
        setSeconds(0);
    }, [duration]);



    // timer start function
    const startTimer = () => {
        if (!isActive) {
            setIsActive(true);

            timerRef.current = setInterval(() => {
                setSeconds((prevSec) => {
                    if (prevSec === 0) {
                        if (minutes === 0) {
                            clearInterval(timerRef.current);
                            setIsActive(false);
                            setSessions((prev) => prev + 1);
                            setTotalPoints((prev) => prev + 10);
                            setStreak((prev) => prev + 1);
                            if (soundOn) beepRef.current.play(); // sound beep at end
                            return 0;
                        }
                        setMinutes((prevMin) => prevMin - 1);
                        return 59;
                    } else {
                        if (soundOn) tickRef.current.play(); // sound  tick every second
                        return prevSec - 1;
                    }
                });
            }, 1000);
        } else {
            // sound Pause
            clearInterval(timerRef.current);
            setIsActive(false);
        }
    };


    // all time reset function
    const resetTimer = () => {
        clearInterval(timerRef.current);
        setIsActive(false);
        setMinutes(duration);
        setSeconds(0);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen">
            {/* Audio Elements  with timer start adn end based*/}
            <audio ref={tickRef} src={tickSound} />
            <audio ref={beepRef} src={beepSound} />


            <h1 className="text-3xl font-bold text-purple-600">⏱ Focus Timer</h1>
            <p className="text-gray-500 mb-6">Stay focused with the Pomodoro technique and earn rewards</p>

            {/* Stats with timer based */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white  dark:bg-slate-900 p-4 rounded shadow">
                    <p className="text-gray-500">Total Points</p>
                    <p className="text-2xl font-bold text-yellow-500">{totalPoints}</p>
                </div>
                <div className="bg-white p-4  dark:bg-slate-900 rounded shadow">
                    <p className="text-gray-500">Current Streak</p>
                    <p className="text-2xl font-bold text-orange-500">{streak} days</p>
                </div>
                <div className="bg-white p-4  dark:bg-slate-900 rounded shadow">
                    <p className="text-gray-500">Today's Sessions</p>
                    <p className="text-2xl font-bold text-blue-500">{sessions}</p>
                </div>
                <div className="bg-white p-4  dark:bg-slate-900 rounded shadow">
                    <p className="text-gray-500">Level</p>
                    <p className="text-2xl font-bold text-purple-500">{level}</p>
                </div>
            </div>

            {/* Timer Card */}
            <div className="bg-white  dark:bg-slate-900 rounded-lg shadow p-6 relative flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Sound Icon Top-left */}
                <button
                    onClick={() => setSoundOn(prev => !prev)}
                    className="absolute top-4 left-4 text-2xl text-gray-600 hover:text-gray-800"
                    title={soundOn ? "Sound On" : "Sound Off"}
                >
                    {soundOn ? <FiVolume2 /> : <FiVolumeX />}
                </button>

                {/* Timer Info */}
                <div className="flex flex-col items-center flex-1">
                    <p className="text-gray-500">Studying: {subject}</p>
                    <div className="text-5xl font-bold my-4">
                        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={startTimer}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            {isActive ? "Pause" : "Start"}
                        </button>
                        <button
                            onClick={resetTimer}
                            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Controls  with timer min and subject*/}
                <div className="flex flex-col gap-4 flex-1">
                    <div>
                        <label className="block text-gray-500 mb-1">Duration</label>
                        <select
                            className="w-full dark:bg-slate-900 border border-gray-300 rounded px-3 py-2"
                            value={duration}
                            onChange={e => setDuration(Number(e.target.value))}
                        >
                            {[15, 20, 25, 30, 40, 50].map(d => (
                                <option key={d} value={d}>
                                    {d} minutes
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-500 mb-1">Subject</label>
                        <select
                            className="w-full border dark:bg-slate-900 border-gray-300 rounded px-3 py-2"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        >
                            {subjects.map(sub => (
                                <option key={sub} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-yellow-100  dark:bg-green-950 p-4 rounded shadow">
                    <p className="font-semibold flex gap-2"><FaFire className="text-orange-500 text-2xl" />
                        Fire Streak!</p>
                    <p className="text-gray-500">7 days in a row</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-950 p-4 rounded shadow">
                    <p className="font-semibold flex gap-2"><GiArcheryTarget className="text-pink-500 text-2xl" /> Focus Master</p>
                    <p className="text-gray-500">25 sessions completed</p>
                </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded shadow mt-6">
                <h2 className="font-semibold mb-2">Recent Sessions</h2>
                <p className="text-gray-500">No sessions yet. Start your first focus session!</p>
            </div>
        </div>
    );
};

export default FocusTimer;
