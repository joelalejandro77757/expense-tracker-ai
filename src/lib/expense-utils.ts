import {
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
  format,
} from "date-fns";
import {
  Expense,
  ExpenseFilters,
  CategorySummary,
  EXPENSE_CATEGORIES,
  ExpenseCategory,
} from "@/types/expense";

export function filterExpenses(
  expenses: Expense[],
  filters: ExpenseFilters
): Expense[] {
  return expenses.filter((expense) => {
    if (filters.category !== "All" && expense.category !== filters.category) {
      return false;
    }

    if (filters.startDate && expense.date < filters.startDate) {
      return false;
    }

    if (filters.endDate && expense.date > filters.endDate) {
      return false;
    }

    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      const matchesDescription = expense.description
        .toLowerCase()
        .includes(query);
      const matchesCategory = expense.category.toLowerCase().includes(query);
      const matchesAmount = expense.amount.toString().includes(query);
      if (!matchesDescription && !matchesCategory && !matchesAmount) {
        return false;
      }
    }

    return true;
  });
}

export function getTotalSpending(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function getMonthlySpending(
  expenses: Expense[],
  referenceDate: Date = new Date()
): number {
  const start = startOfMonth(referenceDate);
  const end = endOfMonth(referenceDate);

  return expenses
    .filter((e) => {
      const date = parseISO(e.date);
      return isWithinInterval(date, { start, end });
    })
    .reduce((sum, e) => sum + e.amount, 0);
}

export function getCategorySummaries(expenses: Expense[]): CategorySummary[] {
  const total = getTotalSpending(expenses);
  const totals: Record<ExpenseCategory, { total: number; count: number }> =
    EXPENSE_CATEGORIES.reduce(
      (acc, cat) => {
        acc[cat] = { total: 0, count: 0 };
        return acc;
      },
      {} as Record<ExpenseCategory, { total: number; count: number }>
    );

  expenses.forEach((e) => {
    totals[e.category].total += e.amount;
    totals[e.category].count += 1;
  });

  return EXPENSE_CATEGORIES.map((category) => ({
    category,
    total: totals[category].total,
    count: totals[category].count,
    percentage: total > 0 ? (totals[category].total / total) * 100 : 0,
  }))
    .filter((s) => s.total > 0)
    .sort((a, b) => b.total - a.total);
}

export function getTopCategories(
  expenses: Expense[],
  limit = 3
): CategorySummary[] {
  return getCategorySummaries(expenses).slice(0, limit);
}

export function getMonthlyTrend(expenses: Expense[], months = 6) {
  const now = new Date();
  const result: { month: string; total: number }[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = format(date, "MMM yyyy");
    const total = getMonthlySpending(expenses, date);
    result.push({ month: monthLabel, total });
  }

  return result;
}

export function getDefaultFilters(): ExpenseFilters {
  return {
    search: "",
    category: "All",
    startDate: "",
    endDate: "",
  };
}

export function sortExpensesByDate(expenses: Expense[]): Expense[] {
  return [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
