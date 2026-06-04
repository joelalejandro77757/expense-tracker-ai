"use client";

import { useState, useEffect } from "react";
import {
  Expense,
  ExpenseFormData,
  EXPENSE_CATEGORIES,
} from "@/types/expense";
import {
  validateExpenseForm,
  hasValidationErrors,
  ValidationErrors,
} from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Plus, Pencil } from "lucide-react";

interface ExpenseFormProps {
  editingExpense?: Expense | null;
  onSubmit: (data: ExpenseFormData) => void;
  onCancel?: () => void;
}

function getDefaultFormData(expense?: Expense | null): ExpenseFormData {
  if (expense) {
    return {
      date: expense.date,
      amount: expense.amount.toString(),
      category: expense.category,
      description: expense.description,
    };
  }
  return {
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "Food",
    description: "",
  };
}

export function ExpenseForm({
  editingExpense,
  onSubmit,
  onCancel,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>(() =>
    getDefaultFormData(editingExpense)
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const isEditing = !!editingExpense;

  useEffect(() => {
    setFormData(getDefaultFormData(editingExpense));
    setErrors({});
    setTouched({});
  }, [editingExpense]);

  const handleChange = (
    field: keyof ExpenseFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validateExpenseForm({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof ExpenseFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateExpenseForm(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateExpenseForm(formData);
    setErrors(validationErrors);
    setTouched({
      date: true,
      amount: true,
      category: true,
      description: true,
    });

    if (!hasValidationErrors(validationErrors)) {
      onSubmit(formData);
      if (!isEditing) {
        setFormData(getDefaultFormData());
        setErrors({});
        setTouched({});
      }
    }
  };

  const fieldClass = (field: keyof ExpenseFormData) =>
    `w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors ${
      touched[field] && errors[field]
        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
        : "border-slate-300"
    }`;

  return (
    <Card>
      <CardHeader
        title={isEditing ? "Edit Expense" : "Add New Expense"}
        description={
          isEditing
            ? "Update the details of this expense"
            : "Record a new expense transaction"
        }
      />
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              onBlur={() => handleBlur("date")}
              className={fieldClass("date")}
              max={new Date().toISOString().split("T")[0]}
            />
            {touched.date && errors.date && (
              <p className="text-xs text-red-600 mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Amount ($)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              onBlur={() => handleBlur("amount")}
              className={fieldClass("amount")}
            />
            {touched.amount && errors.amount && (
              <p className="text-xs text-red-600 mt-1">{errors.amount}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
            onBlur={() => handleBlur("category")}
            className={fieldClass("category")}
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {touched.category && errors.category && (
            <p className="text-xs text-red-600 mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="What was this expense for?"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            onBlur={() => handleBlur("description")}
            className={fieldClass("description")}
            maxLength={200}
          />
          {touched.description && errors.description && (
            <p className="text-xs text-red-600 mt-1">{errors.description}</p>
          )}
          <p className="text-xs text-slate-400 mt-1 text-right">
            {formData.description.length}/200
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit">
            {isEditing ? (
              <>
                <Pencil className="w-4 h-4" />
                Update Expense
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Expense
              </>
            )}
          </Button>
          {isEditing && onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
