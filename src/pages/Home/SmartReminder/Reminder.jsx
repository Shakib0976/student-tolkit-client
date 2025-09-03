import { useState, useEffect } from "react";
import { Bell, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const SmartReminder = () => {

    const [reminders, setReminders] = useState([]);
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");



    useEffect(() => {
        // Load from localStorage only on mount
        const saved = localStorage.getItem("reminders");
        if (saved) setReminders(JSON.parse(saved));
    }, []);

    useEffect(() => {
        // Save every time reminders change
        localStorage.setItem("reminders", JSON.stringify(reminders));
    }, [reminders]);

    // reminder logic

    const handleAddReminder = () => {
        if (!task || !date) return;
        const newReminder = { id: Date.now(), task, date };
        setReminders([...reminders, newReminder]);
        setTask("");
        setDate("");
    };

    // delete reminder data
    const handleDelete = (id) => {
        setReminders(reminders.filter((r) => r.id !== id));
    };

    return (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="container mx-auto px-6">
                {/* Heading */}
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 justify-center">
                    <Bell className="w-7 h-7 text-blue-500" />
                    Smart Reminders
                </h2>
                <p className="text-gray-600 text-center mb-8 md:mb-13">
                    Never miss deadlines again! Add your important tasks and reminders.
                </p>

                {/* Input Form */}
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Enter reminder (e.g., Math Exam, Assignment)"
                            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                        <input
                            type="date"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button
                            onClick={handleAddReminder}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Reminder List */}
                <div className="max-w-2xl mx-auto space-y-4">
                    {reminders.length === 0 ? (
                        <p className="text-gray-500 text-center">
                            No reminders yet. Add one above!
                        </p>
                    ) : (
                        reminders.map((reminder) => (
                            <div
                                key={reminder.id}
                                className="flex items-center justify-between bg-white shadow rounded-xl px-6 py-4"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {reminder.task}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        📅 {new Date(reminder.date).toDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(reminder.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}


export default SmartReminder;