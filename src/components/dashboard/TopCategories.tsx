"use client";

import { CategorySummary } from "@/types/expense";
import { CATEGORY_BG_CLASSES, CATEGORY_COLORS } from "@/lib/constants";
import { formatCurrency } from "@/lib/format";
import { Card, CardHeader } from "@/components/ui/Card";

interface TopCategoriesProps {
  categories: CategorySummary[];
}

export function TopCategories({ categories }: TopCategoriesProps) {
  return (
    <Card className="h-full">
      <CardHeader
        title="Top Categories"
        description="Your highest spending categories"
      />
      {categories.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-slate-400">
          <p className="text-sm">No expense data to display</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat, index) => (
            <div key={cat.category} className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-400 w-5">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_BG_CLASSES[cat.category]}`}
                  >
                    {cat.category}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {formatCurrency(cat.total)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: CATEGORY_COLORS[cat.category],
                    }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {cat.count} expense{cat.count !== 1 ? "s" : ""} ·{" "}
                  {cat.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
