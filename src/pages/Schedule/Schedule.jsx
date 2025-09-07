import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { format, isThisWeek, parse } from "date-fns";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const today = format(new Date(), "eee");
// const todayFullDate = format(new Date(), "yyyy-MM-dd");

const Schedule = () => {

    // schedules state
    const [schedules, setSchedules] = useState([]);
    const { user } = use(AuthContext);
    console.log(user?.email);

    const navigate = useNavigate();

    // schedule form state
    const [form, setForm] = useState({
        subject: "",
        instructor: "",
        startTime: "",
        endTime: "",
        date: "",
        location: "",
        category: "",
    });
    // schedule editing state
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


    // Category-based styles
    const categoryStyles = {
        Mathematics: {
            card: "bg-blue-50 border border-blue-200/80 shadow-sm",
            subjectText: "text-blue-600",
            timeText: "text-blue-900/90",
            locationText: "text-blue-900/70",
        },
        Biology: {
            card: "bg-green-50 border border-green-200/80 shadow-sm",
            subjectText: "text-green-600",
            timeText: "text-green-900/90",
            locationText: "text-green-900/70",
        },
        English: {
            card: "bg-purple-50 border border-purple-200/80 shadow-sm",
            subjectText: "text-purple-600",
            timeText: "text-purple-900/90",
            locationText: "text-purple-900/70",
        },
        default: {
            card: "bg-purple-50 border border-gray-200/80 shadow-sm",
            subjectText: "text-gray-600",
            timeText: "text-gray-900/90",
            locationText: "text-gray-900/70",
        },
    };

    // Fetch schedules
    useEffect(() => {
        fetchSchedules();
    }, []);

    //    Schedule fetching function
    const fetchSchedules = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/email/schedules?email=${user?.email}`
            );
            setSchedules(res.data);
        } catch (err) {
            console.error("Error fetching schedules:", err);
        }
    };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    // schedule form submit handler
    // update existing schedulev
    // create new schedule with email
    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedDate = new Date(`${form.date}T00:00:00`);
        const dayOfWeek = format(selectedDate, "eee");
        toast.success(`Class scheduled for ${dayOfWeek}`);

        try {
            if (editingId) {
                const { _id, ...dataWithoutId } = { ...form, day: dayOfWeek };
                await axios.put(
                    `http://localhost:5000/schedules/${editingId}`,
                    { ...dataWithoutId, email: user.email }
                );
            } else {
                await axios.post("http://localhost:5000/schedules", {
                    ...form,
                    day: dayOfWeek,
                    email: user.email,
                });
            }

            // reset form
            setForm({
                subject: "",
                instructor: "",
                startTime: "",
                endTime: "",
                date: "",
                location: "",
                category: "",
            });
            setEditingId(null);
            setShowForm(false);
            fetchSchedules();
        } catch (err) {
            console.error("Error saving schedule:", err);
        }
    };

    //  handle edit schedule
    const handleEdit = (id) => {
        const schedule = schedules.find((s) => s._id === id);
        setForm(schedule);
        setEditingId(id);
        setShowForm(true);
    };


    // handle delete schedule
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/schedules/${id}`);
        fetchSchedules();
    };

    const todaySchedules = schedules.filter((s) => s.day === today);
    const totalClasses = schedules.length;
    const todaysClasses = todaySchedules.length;

    // next class calculation

    const getNextClass = () => {
        const now = new Date();
        const upcoming = todaySchedules.map((s) => ({ ...s, parsed: parse(s.startTime, "HH:mm", new Date()) }))
            .filter((s) => s.parsed > now)
            .sort((a, b) => a.parsed - b.parsed);
        return upcoming[0] || null;
    };

    const nextClass = getNextClass();

    // this week classes count
    const thisWeekClasses = schedules.filter((s) => {
        if (!s.date) return false;
        return isThisWeek(new Date(`${s.date}T00:00:00`));
    }).length;

    return (
        <div className="max-w-7xl mx-auto px-5 lg:px-1 my-5 md:my-10 space-y-6">
            {/* add class button */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-purple-600">Class Schedule</h1>
                    <p className="text-gray-500">Manage your weekly class timetable</p>
                </div>
                <button
                    onClick={() => {
                        // redirect if not logged in
                        if (!user) {
                            navigate("/login");
                        } else {
                            setShowForm(true);
                        }
                        // show modal if logged in
                    }}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow"
                >
                    + Add Class
                </button>
            </div>

            {/* --- Stats Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Total Classes</p>
                        <p className="text-2xl font-bold">{totalClasses}</p>
                    </div>
                    <span className="text-blue-500 text-2xl">📅</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Today's Classes</p>
                        <p className="text-2xl font-bold">{todaysClasses}</p>
                    </div>
                    <span className="text-green-500 text-2xl">⏰</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Next Class</p>
                        <p className="text-lg font-bold text-orange-500">
                            {nextClass ? `${nextClass.subject} ${nextClass.startTime}` : "None"}
                        </p>
                    </div>
                    <span className="text-orange-500 text-2xl">📍</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">This Week</p>
                        <p className="text-2xl font-bold">{thisWeekClasses}</p>
                    </div>
                    <span className="text-purple-500 text-2xl">🗓️</span>
                </div>
            </div>

            {/* Weekly Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {days.map((day) => {
                    const dayClasses = schedules.filter((s) => s.day === day);
                    return (
                        <div key={day} className="bg-white rounded-lg shadow p-4">
                            <h3 className="font-bold text-center mb-2">{day}</h3>
                            <p className="text-sm text-gray-500 mb-2">
                                {dayClasses.length} classes
                            </p>
                            {dayClasses.length > 0 ? (
                                dayClasses.map((s) => (
                                    <div
                                        key={s._id}
                                        className="border-l-4 border-purple-400 pl-2 mb-2"
                                    >
                                        <p className="font-semibold">{s.subject}</p>
                                        <p className="text-xs text-gray-600">
                                            {s.startTime} - {s.endTime}
                                        </p>
                                        <p className="text-xs text-gray-600">{s.instructor}</p>
                                        <p className="text-xs text-gray-600">{s.location}</p>
                                        <div className="flex gap-2 mt-1">
                                            <button
                                                onClick={() => handleEdit(s._id)}
                                                className="text-yellow-500 text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(s._id)}
                                                className="text-red-500 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 text-center">No classes</p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-bold mb-4">
                    📌 Today's Schedule ({today})
                </h2>
                {todaySchedules.length > 0 ? (
                    <div className="space-y-4">
                        {todaySchedules.map((s) => {
                            const style = categoryStyles[s.category] || categoryStyles.default;
                            return (
                                <div key={s._id} className={`p-4 rounded-lg ${style.card}`}>
                                    <h3 className={`text-xl font-bold ${style.subjectText}`}>
                                        {s.subject}
                                    </h3>
                                    <p className={`text-md mt-1 ${style.timeText}`}>
                                        {s.startTime} - {s.endTime}
                                    </p>
                                    <p className={`text-md mt-1 ${style.locationText}`}>
                                        {s.location}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500">No classes scheduled for today 🎉</p>
                )}
            </div>

            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-lg">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">
                                {editingId ? "Update Class" : "Add New Class"}
                            </h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="btn btn-sm btn-circle btn-ghost"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Instructor</label>
                                <input
                                    type="text"
                                    name="instructor"
                                    value={form.instructor}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Time</label>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={form.startTime}
                                        onChange={handleChange}
                                        required
                                        className="input input-bordered w-full"
                                    />
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={form.endTime}
                                        onChange={handleChange}
                                        required
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Room No</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                            >
                                {editingId ? "Update Class" : "Add Class"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Schedule;
