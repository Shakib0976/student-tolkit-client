import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Budget = () => {
    const [transactions, setTransactions] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const navigate = useNavigate();

    // modal visibility
    const [showModal, setShowModal] = useState(false);

    // default form data
    const [formData, setFormData] = useState({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
    });

    const { user } = useContext(AuthContext);

    //fetch transactions data user wised
    const fetchTransactions = async () => {
        if (!user?.email) return;
        try {
            const res = await axios.get(`https://student-toolkit-balkend.vercel.app/transactions/${user.email}`);
            setTransactions(res.data);

            const totalIncome = res.data.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
            const totalExpense = res.data.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

            setIncome(totalIncome);
            setExpense(totalExpense);
        } catch (err) {
            console.error("Error fetching transactions:", err);
        }
    };


    // transactions fetch on user change
    useEffect(() => {
        fetchTransactions();
    }, [user]);

    // ✅ Add transaction
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://student-toolkit-balkend.vercel.app/transactions", {
                ...formData,
                amount: parseFloat(formData.amount),
                userEmail: user.email,
            });
            fetchTransactions();
            setShowModal(false);
            setFormData({
                type: "expense",
                amount: "",
                category: "",
                description: "",
                date: new Date().toISOString().slice(0, 10),
            });

            Swal.fire({
                icon: "success",
                title: "Transaction Added!",
                text: "Your transaction has been saved.",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error("Error adding transaction:", err);
            Swal.fire("Error!", "Could not add transaction.", "error");
        }
    };

    //  Delete transaction with confirmation
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://student-toolkit-balkend.vercel.app/transactions/${id}`);
                    fetchTransactions();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your transaction has been deleted.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                } catch (err) {
                    console.error("Error deleting transaction:", err);
                    Swal.fire("Error!", "Could not delete transaction.", "error");
                }
            }
        });
    };

    //  Spending by category
    const categories = {};
    transactions.filter((t) => t.type === "expense").forEach((t) => {
        if (!categories[t.category]) categories[t.category] = 0;
        categories[t.category] += t.amount;
    });

    const balance = income - expense;

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className=" text-2xl md:text-3xl font-bold text-purple-600">Budget Tracker</h1>
                    <p className="text-gray-500">Keep track of your income and expenses</p>
                </div>

                {/* this button budget added if user not available then navigate login page */}
                <button
                    className="bg-purple-600 text-white md:px-4 py-2 rounded hover:bg-purple-700"

                    onClick={() => {
                        // redirect if not logged in
                        if (!user) {
                            navigate("/login");
                        } else {
                            setShowModal(true);
                        }
                        // show modal if logged in
                    }}
                >
                    + Add Transaction
                </button>
            </div>

            {/* Add Transaction Modal */}
            {showModal && (
                <div className="modal pt-5 modal-open">
                    <div className="modal-box w-11/12 max-w-lg">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Add New Transaction</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn btn-sm btn-circle btn-ghost"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={(e) =>
                                        setFormData({ ...formData, type: e.target.value })
                                    }
                                    className="select select-bordered w-full"
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Amount ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={(e) =>
                                        setFormData({ ...formData, amount: e.target.value })
                                    }
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({ ...formData, date: e.target.value })
                                    }
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                            >
                                Add Transaction
                            </button>
                        </form>
                    </div>
                </div>
            )}


            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-500">Total Income</p>
                    <p className="text-green-500 text-2xl font-bold">${income.toFixed(2)}</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-500">Total Expenses</p>
                    <p className="text-red-500 text-2xl font-bold">${expense.toFixed(2)}</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-500">Remaining</p>
                    <p className="text-green-500 text-2xl font-bold">${balance.toFixed(2)}</p>
                    <div className="w-full bg-purple-200 h-2 rounded-full mt-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${(balance / income) * 100 || 0}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Spending by Category */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
                {Object.keys(categories).length === 0 && <p className="text-gray-500">No expenses yet</p>}
                {Object.entries(categories).map(([cat, amt]) => (
                    <div key={cat} className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2">
                            <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                {cat[0].toUpperCase()}
                            </span>
                            <p>{cat}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="font-semibold">${amt}</p>
                            <div className="w-24 h-2 bg-purple-200 rounded-full">
                                <div
                                    className="h-2 bg-purple-600 rounded-full"
                                    style={{ width: `${(amt / expense) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Transactions */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                <ul className="space-y-3">
                    {transactions.map((t) => (
                        <li key={t._id} className="flex justify-between items-center border-b pb-2">
                            <div>
                                <p className="font-medium">{t.category}</p>
                                <p className="text-gray-400 text-sm">
                                    {new Date(t.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p
                                    className={
                                        t.type === "income"
                                            ? "text-green-500 font-bold"
                                            : "text-red-500 font-bold"
                                    }
                                >
                                    {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                                </p>
                                {/* Delete button */}
                                <button
                                    onClick={() => handleDelete(t._id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete Transaction"
                                >
                                    ✕
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Budget;
