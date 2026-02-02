"use client";

import { useExpenses } from "@/context/ExpenseContext";
import { z } from "zod";
import { Trash2, Calendar, CreditCard, Tag } from "lucide-react";

export const expenseTableSchema = z.object({
    limit: z.number().optional().describe("Maximum number of expenses to show"),
    filterCategory: z.string().optional().describe("Filter expenses by category"),
});

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        Food: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        Transport: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        Entertainment: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        Utilities: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        Shopping: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
        Other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    };
    return colors[category] || colors.Other;
};

export const ExpenseTable = ({
    limit = 10,
    filterCategory,
}: {
    limit?: number;
    filterCategory?: string;
}) => {
    const { expenses, removeExpense } = useExpenses();

    const filteredExpenses = expenses
        .filter((e) => (filterCategory ? e.category === filterCategory : true))
        .slice(0, limit);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-900/50">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-500" />
                        Recent Transactions
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {filterCategory ? `Showing ${filterCategory} expenses` : "Your latest spending activity"}
                    </p>
                </div>
                {filterCategory && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full">
                        {filterCategory}
                    </span>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
                    <thead className="bg-gray-50 dark:bg-zinc-800/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-50 dark:divide-zinc-800">
                        {filteredExpenses.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-zinc-600">
                                        <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-3">
                                            <Tag className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm font-medium">No expenses found</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredExpenses.map((expense) => (
                                <tr key={expense.id} className="group hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {expense.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(expense.category)}`}>
                                            {expense.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                                            {new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                                            ${expense.amount.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => removeExpense(expense.id)}
                                            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100"
                                            title="Delete expense"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
