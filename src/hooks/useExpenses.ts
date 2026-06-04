"use client";

import { useState, useEffect, useCallback } from "react";
import { Expense, ExpenseFormData } from "@/types/expense";
import { STORAGE_KEY } from "@/lib/constants";

function loadExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setExpenses(loadExpenses());
    } catch {
      setError("Failed to load expenses from storage");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = useCallback((updated: Expense[]) => {
    try {
      saveExpenses(updated);
      setExpenses(updated);
      setError(null);
    } catch {
      setError("Failed to save expenses");
    }
  }, []);

  const addExpense = useCallback(
    (data: ExpenseFormData) => {
      const now = new Date().toISOString();
      const newExpense: Expense = {
        id: crypto.randomUUID(),
        date: data.date,
        amount: parseFloat(data.amount),
        category: data.category,
        description: data.description.trim(),
        createdAt: now,
        updatedAt: now,
      };
      persist([...expenses, newExpense]);
      return newExpense;
    },
    [expenses, persist]
  );

  const updateExpense = useCallback(
    (id: string, data: ExpenseFormData) => {
      const updated = expenses.map((e) =>
        e.id === id
          ? {
              ...e,
              date: data.date,
              amount: parseFloat(data.amount),
              category: data.category,
              description: data.description.trim(),
              updatedAt: new Date().toISOString(),
            }
          : e
      );
      persist(updated);
    },
    [expenses, persist]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      persist(expenses.filter((e) => e.id !== id));
    },
    [expenses, persist]
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    expenses,
    isLoading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    clearError,
  };
}
