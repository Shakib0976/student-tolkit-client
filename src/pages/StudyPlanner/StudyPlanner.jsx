import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";
import { CalendarDays, Timer } from "lucide-react";



const StudyPlanner = () => {
    const [tasks, setTasks] = useState([]);
    console.log(tasks);
    const [filter, setFilter] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        taskTitle: "",
        subject: "",
        description: "",
        priority: "Low",
        deadline: "",
        estimatedHours: 1,
    });

    // subject
    const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];

    // get user
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;

    // Fetch Tasks
    const fetchTasks = async () => {
        if (!userEmail) return;
        try {
            const res = await axios.get(`https://student-toolkit-balkend.vercel.app/tasks/${userEmail}`);
            setTasks(res.data);
        } catch (err) {
            console.error("Fetch tasks error:", err);
        }
    };


    // Initial fetch
    useEffect(() => {
        fetchTasks();
    }, [tasks.length, userEmail]);

    // Add Task
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            email: userEmail,
            title: formData.taskTitle,
            description: formData.description,
            category: formData.subject,
            priority: formData.priority.toLowerCase(),
            date: formData.deadline,
            estimatedHours: Number(formData.estimatedHours),
            completed: false,
        };

        try {
            const res = await axios.post("https://student-toolkit-balkend.vercel.app/tasks", newTask);
            setTasks((prev) => [...prev, res.data.insertedId ? { ...newTask, _id: res.data.insertedId } : res.data]);
            setShowModal(false);
            setFormData({
                taskTitle: "",
                subject: "",
                description: "",
                priority: "Low",
                deadline: "",
                estimatedHours: 1,
            });
            MySwal.fire({
                title: 'Task Added!',
                text: 'Successfully task added .',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        } catch (err) {
            console.error("Add task error:", err);
            toast.error("Failed to add task.");
        }
    };


    // Delete Task with confirmation  sweet alert 2
    const handleDelete = async (id) => {
        try {
            if (!id) return;

            const result = await MySwal.fire({
                title: <p className="text-lg font-semibold">Are you sure?</p>,
                html: "<span class='text-gray-700'>This action cannot be undone!</span>",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                buttonsStyling: true,
                customClass: {
                    popup: 'rounded-lg shadow-xl p-6',
                    confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg',
                    cancelButton: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg'
                }
            });

            if (result.isConfirmed) {
                await axios.delete(`https://student-toolkit-balkend.vercel.app/tasks/${id}`);
                setTasks(tasks.filter((task) => task._id !== id));
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'Your task has been deleted.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
            }
        } catch (err) {
            console.error("Delete error:", err);
            MySwal.fire({
                title: 'Error!',
                text: 'Failed to delete the task.',
                icon: 'error',
                timer: 2000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            });
        }
    };



    //    mark complete is complete or not
    const markComplete = async (id) => {
        try {
            await axios.put(`https://student-toolkit-balkend.vercel.app/tasks/${id}`, { completed: true });

        } catch (err) {
            console.error("Error marking complete:", err);
            // Reload the page
            window.location.reload();
        }
    };






    // Filter Tasks
    const filteredTasks = tasks.filter((task) => {
        if (filter === "Pending") return !task.completed;
        if (filter === "Completed") return task.completed;
        return true;
    });

    const totalTasks = tasks.length;
    // filter completed  tasks
    const completedTasks = tasks.filter((t) => t.completed).length;
    // filter pending tasks
    const pendingTasks = totalTasks - completedTasks;
    const studyHours = tasks.reduce((acc, t) => acc + t.estimatedHours, 0);


    // Calculate overdue
    const calculateOverdue = (date) => {
        const now = new Date();
        const taskDate = new Date(date);
        const diff = Math.floor((now - taskDate) / (1000 * 60 * 60 * 24));
        return diff > 0 ? `${diff} days overdue` : "";
    };

    return (
        <div className="p-6  min-h-screen max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-purple-600">Study Planner</h1>
                    <p className="text-gray-500 dark:text-gray-400">Break down your study goals into manageable tasks</p>
                </div>
                <button
                    className="bg-purple-600 text-white w-30 h-10  md:px-4 md:py-2 rounded hover:bg-purple-700"
                    onClick={() => {
                        // redirect if not logged in
                        if (!user) {
                            navigate("/login", { state: "/planner" });;
                        } else {
                            setShowModal(true)

                        }
                        // show modal if logged in
                    }}
                >
                    + Add Task
                </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-900 p-4 rounded shadow">
                    <p className="text-gray-500 dark:text-gray-100">Total Tasks</p>
                    <p className="text-2xl font-bold">{totalTasks}</p>
                </div>
                <div className="bg-white p-4 dark:bg-slate-900 rounded shadow">
                    <p className="text-gray-500 dark:text-gray-100">Completed</p>
                    <p className="text-2xl font-bold text-green-500">{completedTasks}</p>
                </div>
                <div className="bg-white p-4 dark:bg-slate-900 rounded shadow">
                    <p className="text-gray-500 dark:text-gray-100">Pending</p>
                    <p className="text-2xl font-bold text-yellow-500">{pendingTasks}</p>
                </div>
                <div className="bg-white p-4 dark:bg-slate-900 rounded shadow">
                    <p className="text-gray-500 dark:text-gray-100">Study Hours</p>
                    <p className="text-2xl font-bold text-blue-500">{studyHours}h</p>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4">
                {["All", "Pending", "Completed"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1 rounded ${filter === f ? "bg-purple-600 text-white" : "bg-white dark:bg-slate-600 border"}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Task List */}
            <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 px-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-inner">

                        {/* Illustration */}
                        <div className="bg-white dark:bg-slate-800 rounded-full p-6 shadow-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-20 w-20 text-purple-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.6}
                                    d="M9 12h6m2 4H7m10-8H7m-4 8V6a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>

                        {/* Heading */}
                        <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
                            No Study Tasks Yet
                        </h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md text-center">
                            Organize your learning goals and track progress effectively.
                            Start by adding your first task to your study planner.
                        </p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <div
                            key={task._id}
                            className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-lg transition-all"
                        >
                            {/* Left Section */}
                            <div className="flex flex-col flex-1 space-y-2">
                                {/* Title */}
                                <h3
                                    className={`text-lg font-semibold break-words ${task.completed
                                        ? "line-through text-gray-400"
                                        : "text-gray-800 dark:text-gray-200"
                                        }`}
                                >
                                    {task.title}
                                </h3>

                                {/* Description */}
                                {task.description && (
                                    <p className="text-gray-500 dark:text-gray-400 text-sm break-words">
                                        {task.description}
                                    </p>
                                )}

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                                    <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-0.5 rounded-full font-medium">
                                        {task.category}
                                    </span>
                                    <span
                                        className={`px-2 py-0.5 rounded-full font-medium ${task.priority === "high"
                                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                            : task.priority === "medium"
                                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                                                : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                            }`}
                                    >
                                        {task.priority}
                                    </span>
                                    {calculateOverdue(task.date) && (
                                        <span className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded-full font-medium">
                                            {calculateOverdue(task.date)}
                                        </span>
                                    )}
                                </div>

                                {/* Metadata */}
                                <div className="flex flex-wrap gap-4 mt-2 text-gray-400 text-xs font-medium">
                                    <span className="flex items-center gap-1">
                                        <CalendarDays className="w-4 h-4 text-gray-400" />
                                        {new Date(task.date).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Timer className="w-4 h-4 text-gray-400" />
                                        {task.estimatedHours}h estimated
                                    </span>
                                </div>
                            </div>

                            {/* Right Section (Actions) */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <button
                                    onClick={() => markComplete(task._id)}
                                    disabled={task.completed}
                                    className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium shadow-sm transition text-center ${task.completed
                                        ? "border border-green-500 text-green-600 dark:text-green-400 cursor-not-allowed bg-green-50 dark:bg-slate-800"
                                        : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                >
                                    {task.completed ? "Completed" : "Mark Complete"}
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition text-center"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                    ))
                )}
            </div>

            {/* Add Task Modal */}
            {showModal && (
                <div className="modal modal-open pt-5">
                    <div className="modal-box w-11/12 max-w-lg dark:bg-slate-900">
                        <button className="absolute top-3 right-3 text-2xl  text-gray-500 hover:text-gray-800" onClick={() => setShowModal(false)}>
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100 text-gray-800">Add New Study Task</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">Task Title *</label>
                                <input
                                    type="text"
                                    placeholder="type task title"
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.taskTitle} onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">Subject *</label>
                                <select
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required>
                                    <option value="" disabled>Select subject</option>
                                    {subjects.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">Description</label>
                                <textarea
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" rows="3"
                                    placeholder="type task description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">Priority Level</label>
                                <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">Deadline *</label>
                                <input type="date"
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700">Estimated Hours</label>
                                <input type="number" min="1"
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.estimatedHours} onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Add Task</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyPlanner;
