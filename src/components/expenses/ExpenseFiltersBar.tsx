"use client";

import { ExpenseFilters, EXPENSE_CATEGORIES } from "@/types/expense";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ExpenseFiltersBarProps {
  filters: ExpenseFilters;
  onChange: (filters: ExpenseFilters) => void;
  resultCount: number;
  totalCount: number;
}

export function ExpenseFiltersBar({
  filters,
  onChange,
  resultCount,
  totalCount,
}: ExpenseFiltersBarProps) {
  const hasActiveFilters =
    filters.search ||
    filters.category !== "All" ||
    filters.startDate ||
    filters.endDate;

  const update = (partial: Partial<ExpenseFilters>) => {
    onChange({ ...filters, ...partial });
  };

  const clearFilters = () => {
    onChange({
      search: "",
      category: "All",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by description, category, or amount..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={filters.category}
            onChange={(e) =>
              update({
                category: e.target.value as ExpenseFilters["category"],
              })
            }
            className="px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="All">All Categories</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-sm text-slate-500">From:</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => update({ startDate: e.target.value })}
            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          />
          <label className="text-sm text-slate-500 ml-2">To:</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => update({ endDate: e.target.value })}
            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="text-sm text-slate-500">
            Showing {resultCount} of {totalCount}
          </span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
