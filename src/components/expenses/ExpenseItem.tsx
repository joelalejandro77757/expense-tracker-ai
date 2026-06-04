"use client";

import { Expense } from "@/types/expense";
import { CATEGORY_BG_CLASSES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/format";
import { Pencil, Trash2 } from "lucide-react";

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  const handleDelete = () => {
    if (
      window.confirm(
        `Delete "${expense.description}" (${formatCurrency(expense.amount)})?`
      )
    ) {
      onDelete(expense.id);
    }
  };

  return (
    <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-slate-50 transition-colors group">
      <div className="hidden sm:block w-24 shrink-0">
        <p className="text-sm text-slate-500">{formatDate(expense.date)}</p>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-slate-900 truncate">
            {expense.description}
          </p>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${CATEGORY_BG_CLASSES[expense.category]}`}
          >
            {expense.category}
          </span>
        </div>
        <p className="text-xs text-slate-400 sm:hidden mt-0.5">
          {formatDate(expense.date)}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-slate-900">
          {formatCurrency(expense.amount)}
        </p>
      </div>

      <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={() => onEdit(expense)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          aria-label="Edit expense"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          aria-label="Delete expense"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
