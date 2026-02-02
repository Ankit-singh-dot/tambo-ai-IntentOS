"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
};

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id" | "date">) => void;
  removeExpense: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Groceries",
      amount: 120,
      category: "Food",
      date: new Date().toISOString(),
    },
    {
      id: "2",
      description: "Uber",
      amount: 45,
      category: "Transport",
      date: new Date().toISOString(),
    },
  ]);

  const addExpense = (expense: Omit<Expense, "id" | "date">) => {
    const newExpense = {
      ...expense,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, removeExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
}
