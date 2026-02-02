"use client";

import { useExpenses } from "@/context/ExpenseContext";
import { z } from "zod";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { PieChart as PieIcon, BarChart as BarChartIcon } from "lucide-react";

export const expenseChartSchema = z.object({
    type: z.enum(["pie", "bar"]).optional().describe("Type of chart to display"),
    title: z.string().optional().describe("Title of the chart"),
});

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EC4899", "#6B7280"];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3 rounded-xl shadow-xl">
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{label || payload[0].name}</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].color || payload[0].fill }} />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        ${payload[0].value.toFixed(2)}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export const ExpenseChart = ({
    type = "pie",
    title = "Spending Breakdown",
}: {
    type?: "pie" | "bar";
    title?: string;
}) => {
    const { expenses } = useExpenses();

    const data = expenses.reduce((acc, curr) => {
        const existing = acc.find((item) => item.name === curr.category);
        if (existing) {
            existing.value += curr.amount;
        } else {
            acc.push({ name: curr.category, value: curr.amount });
        }
        return acc;
    }, [] as { name: string; value: number }[]);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-6 flex flex-col h-[400px]">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                    {type === 'pie' ? <PieIcon className="w-5 h-5" /> : <BarChartIcon className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>

            <div className="flex-1 w-full min-h-0 relative">
                {data.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-zinc-600">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            <PieIcon className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="font-medium">No data to visualize</p>
                        <p className="text-sm opacity-70 mt-1">Add some expenses to see insights</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        {type === "pie" ? (
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    strokeWidth={2}
                                    stroke="transparent"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value) => <span className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-1">{value}</span>}
                                />
                            </PieChart>
                        ) : (
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.3} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={60}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};
