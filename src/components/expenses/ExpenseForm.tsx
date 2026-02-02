"use client";

import { useExpenses } from "@/context/ExpenseContext";
import { useState } from "react";
import { z } from "zod";
import { Plus, DollarSign, Tag, FileText } from "lucide-react";

export const expenseFormSchema = z.object({
    defaultCategory: z.string().optional().describe("Pre-selected category for the expense form"),
    suggestedAmount: z.number().optional().describe("Suggested amount for the expense"),
});

export const ExpenseForm = ({
    defaultCategory = "Food",
    suggestedAmount,
}: {
    defaultCategory?: string;
    suggestedAmount?: number;
}) => {
    const { addExpense } = useExpenses();
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(suggestedAmount?.toString() || "");
    const [category, setCategory] = useState(defaultCategory);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !category) return;

        addExpense({
            description,
            amount: parseFloat(amount),
            category,
        });

        setDescription("");
        setAmount("");
    };

    return (
        <div className="group relative overflow-hidden p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 transition-all hover:shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />

            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                    New Expense
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Description
                    </label>
                    <div className="relative group/input">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within/input:text-blue-500">
                            <FileText className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                            placeholder="What did you spend on?"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Amount
                        </label>
                        <div className="relative group/input">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within/input:text-green-500">
                                <DollarSign className="w-4 h-4" />
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Category
                        </label>
                        <div className="relative group/input">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within/input:text-purple-500">
                                <Tag className="w-4 h-4" />
                            </div>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none cursor-pointer"
                            >
                                {["Food", "Transport", "Entertainment", "Utilities", "Shopping", "Other"].map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full relative overflow-hidden group/btn bg-gray-900 dark:bg-white text-white dark:text-black py-3 px-4 rounded-xl font-medium transition-transform active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Expense
                    </span>
                </button>
            </form>
        </div>
    );
};
