import { ExpenseCategory } from "@/types/expense";

export const STORAGE_KEY = "expense-tracker-data";

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: "#f97316",
  Transportation: "#3b82f6",
  Entertainment: "#a855f7",
  Shopping: "#ec4899",
  Bills: "#ef4444",
  Other: "#64748b",
};

export const CATEGORY_BG_CLASSES: Record<ExpenseCategory, string> = {
  Food: "bg-orange-100 text-orange-700",
  Transportation: "bg-blue-100 text-blue-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Shopping: "bg-pink-100 text-pink-700",
  Bills: "bg-red-100 text-red-700",
  Other: "bg-slate-100 text-slate-700",
};
