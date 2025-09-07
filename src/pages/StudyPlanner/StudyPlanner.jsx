import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



const StudyPlanner = () => {
    const [tasks, setTasks] = useState([]);
    console.log(tasks);
    const [filter, setFilter] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const MySwal = withReactContent(Swal);
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
            const res = await axios.get(`http://localhost:5000/tasks/${userEmail}`);
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
            const res = await axios.post("http://localhost:5000/tasks", newTask);
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


    // Delete Task
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
                await axios.delete(`http://localhost:5000/tasks/${id}`);
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
            await axios.put(`http://localhost:5000/tasks/${id}`, { completed: true });

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
        <div className="p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-purple-600">Study Planner</h1>
                    <p className="text-gray-500">Break down your study goals into manageable tasks</p>
                </div>
                <button
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    onClick={() => setShowModal(true)}
                >
                    + Add Task
                </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500">Total Tasks</p>
                    <p className="text-2xl font-bold">{totalTasks}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-500">{completedTasks}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-yellow-500">{pendingTasks}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-500">Study Hours</p>
                    <p className="text-2xl font-bold text-blue-500">{studyHours}h</p>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4">
                {["All", "Pending", "Completed"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1 rounded ${filter === f ? "bg-purple-600 text-white" : "bg-white border"}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Task List */}
            <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p className="text-lg font-semibold">No tasks here!</p>
                        <p className="text-gray-500">Add a new task to get started.</p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <div
                            key={task._id}
                            className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
                        >
                            <div className="flex flex-col">
                                <h3 className={`font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
                                    {task.title}
                                </h3>
                                <p className="text-gray-500">{task.description}</p>
                                <div className="flex gap-2 mt-1 text-sm">
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">{task.category}</span>
                                    <span className={`px-2 py-0.5 rounded ${task.priority === "high" ? "bg-red-100 text-red-800" : task.priority === "medium" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}`}>
                                        {task.priority}
                                    </span>
                                    {calculateOverdue(task.date) && (
                                        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded">{calculateOverdue(task.date)}</span>
                                    )}
                                </div>
                                <div className="flex gap-4 mt-1 text-gray-400 text-sm">
                                    <span>{new Date(task.date).toLocaleDateString()}</span>
                                    <span>{task.estimatedHours}h estimated</span>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                                <button
                                    onClick={() => markComplete(task._id)}
                                    disabled={task.completed}
                                    className={`px-3 py-1 rounded ${task.completed ? "border-green-500 border   text-green-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"}`}
                                >
                                    {task.completed ? "Completed" : "Complete"}
                                </button>
                                <button

                                    onClick={() => handleDelete(task._id)}
                                    className="text-red-500 cursor-pointer hover:text-red-700 px-3 py-1 rounded border border-red-500 hover:bg-red-100"
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
                    <div className="modal-box w-11/12 max-w-lg">
                        <button className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800" onClick={() => setShowModal(false)}>
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Study Task</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Task Title *</label>
                                <input type="text" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.taskTitle} onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject *</label>
                                <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required>
                                    <option value="" disabled>Select subject</option>
                                    {subjects.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Priority Level</label>
                                <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deadline *</label>
                                <input type="date" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Estimated Hours</label>
                                <input type="number" min="1" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" value={formData.estimatedHours} onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })} />
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
