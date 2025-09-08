import { useState, useEffect, use } from "react";
import { Bell, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from '../../../Context/AuthContext'

const SmartReminder = () => {

    const [reminders, setReminders] = useState([]);
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");
    const { user } = use(AuthContext);
    const userEmail = user?.email;

    // Fetch reminders from backend
    useEffect(() => {
        if (!userEmail) return;
        fetch(`http://localhost:5000/reminders/${userEmail}`)
            .then((res) => res.json())
            .then((data) => setReminders(data))
            .catch((err) => console.error(err));
    }, [userEmail]);

    // Add reminder data from DB
    const handleAddReminder = async () => {
        if (!task || !date || !userEmail) return;

        const newReminder = { email: userEmail, task, date };
        await fetch("http://localhost:5000/reminders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReminder),
        });

        // Refresh reminders
        fetch(`http://localhost:5000/reminders/${userEmail}`)
            .then((res) => res.json())
            .then((data) => setReminders(data));

        setTask("");
        setDate("");
    };

    // Delete reminder
    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/reminders/${id}`, {
            method: "DELETE",
        });

        setReminders(reminders.filter((r) => r._id !== id));
    };


    return (
        <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="container mx-auto mt-5 px-6">
                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2 justify-center">
                    <Bell className="w-7 h-7 text-blue-500" />
                    Smart Reminders
                </h2>
                <p className="text-gray-600 text-center mb-8">
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
                                key={reminder._id}
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
                                    onClick={() => handleDelete(reminder._id)}
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