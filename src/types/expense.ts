export const EXPENSE_CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  date: string;
  amount: string;
  category: ExpenseCategory;
  description: string;
}

export interface ExpenseFilters {
  search: string;
  category: ExpenseCategory | "All";
  startDate: string;
  endDate: string;
}

export interface CategorySummary {
  category: ExpenseCategory;
  total: number;
  count: number;
  percentage: number;
}
