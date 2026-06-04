import { Expense } from "@/types/expense";
import { formatCurrency, formatDate } from "./format";

export function exportExpensesToCSV(expenses: Expense[]): void {
  if (expenses.length === 0) return;

  const headers = ["Date", "Amount", "Category", "Description"];
  const rows = expenses.map((e) => [
    formatDate(e.date),
    e.amount.toFixed(2),
    e.category,
    `"${e.description.replace(/"/g, '""')}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `expenses-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getExportSummary(expenses: Expense[]): string {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  return `${expenses.length} expenses totaling ${formatCurrency(total)}`;
}
