"use client";

import { useExpenseContext } from "@/context/ExpenseContext";
import { useToastContext } from "@/context/ToastContext";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TopCategories } from "@/components/dashboard/TopCategories";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  getTotalSpending,
  getMonthlySpending,
  getCategorySummaries,
  getTopCategories,
  getMonthlyTrend,
} from "@/lib/expense-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Plus, ArrowRight } from "lucide-react";
import { ExpenseList } from "@/components/expenses/ExpenseList";
import { sortExpensesByDate } from "@/lib/expense-utils";
import { Expense } from "@/types/expense";

export default function DashboardPage() {
  const router = useRouter();
  const { expenses, isLoading, deleteExpense } = useExpenseContext();
  const { showToast } = useToastContext();

  const handleEdit = (expense: Expense) => {
    router.push(`/expenses?edit=${expense.id}`);
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
    showToast("Expense deleted");
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  const totalSpending = getTotalSpending(expenses);
  const monthlySpending = getMonthlySpending(expenses);
  const categorySummaries = getCategorySummaries(expenses);
  const topCategories = getTopCategories(expenses);
  const monthlyTrend = getMonthlyTrend(expenses);
  const recentExpenses = sortExpensesByDate(expenses).slice(0, 5);
  const topCategoryName = topCategories[0]?.category ?? null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of your spending and financial activity
          </p>
        </div>
        <Link href="/expenses">
          <Button>
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        </Link>
      </div>

      <SummaryCards
        totalSpending={totalSpending}
        monthlySpending={monthlySpending}
        expenseCount={expenses.length}
        topCategory={topCategoryName}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart data={monthlyTrend} />
        <CategoryChart data={categorySummaries} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TopCategories categories={topCategories} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Expenses
            </h2>
            {expenses.length > 5 && (
              <Link
                href="/expenses"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          <ExpenseList
            expenses={recentExpenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
