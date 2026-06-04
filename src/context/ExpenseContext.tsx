"use client";

import { createContext, useContext, ReactNode } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { Expense, ExpenseFormData } from "@/types/expense";

interface ExpenseContextValue {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  addExpense: (data: ExpenseFormData) => Expense;
  updateExpense: (id: string, data: ExpenseFormData) => void;
  deleteExpense: (id: string) => void;
  clearError: () => void;
}

const ExpenseContext = createContext<ExpenseContextValue | null>(null);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const value = useExpenses();
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within ExpenseProvider");
  }
  return context;
}
