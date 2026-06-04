"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useExpenseContext } from "@/context/ExpenseContext";
import { useToastContext } from "@/context/ToastContext";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { ExpenseList } from "@/components/expenses/ExpenseList";
import { ExpenseFiltersBar } from "@/components/expenses/ExpenseFiltersBar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Expense, ExpenseFormData, ExpenseFilters } from "@/types/expense";
import {
  filterExpenses,
  getDefaultFilters,
  getTotalSpending,
  sortExpensesByDate,
} from "@/lib/expense-utils";
import { exportExpensesToCSV } from "@/lib/csv-export";
import { Download } from "lucide-react";

export default function ExpensesPageContent() {
  const { expenses, isLoading, error, addExpense, updateExpense, deleteExpense } =
    useExpenseContext();
  const { showToast } = useToastContext();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ExpenseFilters>(getDefaultFilters());
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && expenses.length > 0) {
      const expense = expenses.find((e) => e.id === editId);
      if (expense) {
        setEditingExpense(expense);
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchParams, expenses]);

  const filteredExpenses = useMemo(() => {
    const filtered = filterExpenses(expenses, filters);
    return sortExpensesByDate(filtered);
  }, [expenses, filters]);

  const filteredTotal = useMemo(
    () => getTotalSpending(filteredExpenses),
    [filteredExpenses]
  );

  const handleSubmit = (data: ExpenseFormData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, data);
      showToast("Expense updated successfully");
      setEditingExpense(null);
    } else {
      addExpense(data);
      showToast("Expense added successfully");
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
    showToast("Expense deleted");
    if (editingExpense?.id === id) {
      setEditingExpense(null);
    }
  };

  const handleExport = () => {
    const toExport =
      filteredExpenses.length > 0 ? filteredExpenses : expenses;
    if (toExport.length === 0) {
      showToast("No expenses to export", "info");
      return;
    }
    exportExpensesToCSV(toExport);
    showToast(`Exported ${toExport.length} expenses to CSV`);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading your expenses..." />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Expenses</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, filter, and export your expense transactions
          </p>
        </div>
        <Button variant="secondary" onClick={handleExport}>
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div ref={formRef}>
        <ExpenseForm
          editingExpense={editingExpense}
          onSubmit={handleSubmit}
          onCancel={() => setEditingExpense(null)}
        />
      </div>

      <ExpenseFiltersBar
        filters={filters}
        onChange={setFilters}
        resultCount={filteredExpenses.length}
        totalCount={expenses.length}
      />

      <ExpenseList
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filteredTotal={filteredTotal}
      />
    </div>
  );
}
