"use client";

import { Expense } from "@/types/expense";
import { ExpenseItem } from "./ExpenseItem";
import { Card, CardHeader } from "@/components/ui/Card";
import { Receipt } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  filteredTotal?: number;
}

export function ExpenseList({
  expenses,
  onEdit,
  onDelete,
  filteredTotal,
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Receipt className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-sm font-medium text-slate-900 mb-1">
            No expenses found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Try adjusting your filters or add a new expense to get started.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="sm">
      <CardHeader
        title="Expense List"
        description={
          filteredTotal !== undefined
            ? `Filtered total: ${formatCurrency(filteredTotal)}`
            : undefined
        }
      />
      <div className="divide-y divide-slate-100 -mx-2">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  );
}
