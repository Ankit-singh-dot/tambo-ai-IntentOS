"use client";

import { z } from "zod";
import { AlertCircle, TrendingUp, TrendingDown, Lightbulb } from "lucide-react";

export const expenseInsightSchema = z.object({
    title: z.string().describe("Short, punchy title for the insight (e.g. 'High Coffee Spend')"),
    content: z.string().describe("Detailed analysis or observation about the spending habits."),
    sentiment: z.enum(["positive", "negative", "neutral"]).describe("The sentiment of the insight."),
    recommendation: z.string().optional().describe("Actionable advice for the user."),
    severity: z.enum(["low", "medium", "high"]).optional().describe("How critical this insight is."),
});

export const ExpenseInsight = ({
    title,
    content,
    sentiment,
    recommendation,
    severity = "medium",
}: {
    title: string;
    content: string;
    sentiment: "positive" | "negative" | "neutral";
    recommendation?: string;
    severity?: "low" | "medium" | "high";
}) => {
    const getIcon = () => {
        switch (sentiment) {
            case "positive": return <TrendingUp className="w-5 h-5 text-green-500" />;
            case "negative": return <TrendingDown className="w-5 h-5 text-red-500" />;
            default: return <Lightbulb className="w-5 h-5 text-blue-500" />;
        }
    };

    const getBorderColor = () => {
        switch (sentiment) {
            case "positive": return "border-green-200 dark:border-green-900";
            case "negative": return "border-red-200 dark:border-red-900";
            default: return "border-blue-200 dark:border-blue-900";
        }
    };

    const getBgColor = () => {
        switch (sentiment) {
            case "positive": return "bg-green-50 dark:bg-green-900/10";
            case "negative": return "bg-red-50 dark:bg-red-900/10";
            default: return "bg-blue-50 dark:bg-blue-900/10";
        }
    };

    return (
        <div className={`p-5 rounded-xl border ${getBorderColor()} ${getBgColor()} shadow-sm animate-in fade-in zoom-in duration-300`}>
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-white dark:bg-black/20 shadow-sm`}>
                    {getIcon()}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">{title}</h4>
                        {severity === "high" && (
                            <span className="px-2 py-0.5 text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Critical
                            </span>
                        )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm leading-relaxed">{content}</p>

                    {recommendation && (
                        <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-white/5 flex gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-0.5">Tip:</span>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 italic">"{recommendation}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
