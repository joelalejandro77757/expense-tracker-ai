import { ExpenseFormData, EXPENSE_CATEGORIES } from "@/types/expense";

export interface ValidationErrors {
  date?: string;
  amount?: string;
  category?: string;
  description?: string;
}

export function validateExpenseForm(data: ExpenseFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.date) {
    errors.date = "Date is required";
  } else {
    const date = new Date(data.date + "T00:00:00");
    if (isNaN(date.getTime())) {
      errors.date = "Invalid date";
    }
  }

  if (!data.amount.trim()) {
    errors.amount = "Amount is required";
  } else {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      errors.amount = "Amount must be a positive number";
    } else if (amount > 9999999) {
      errors.amount = "Amount is too large";
    }
  }

  if (!EXPENSE_CATEGORIES.includes(data.category)) {
    errors.category = "Please select a valid category";
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
  } else if (data.description.trim().length > 200) {
    errors.description = "Description must be 200 characters or less";
  }

  return errors;
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
