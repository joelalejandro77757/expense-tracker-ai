"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { CategorySummary } from "@/types/expense";
import { CATEGORY_COLORS } from "@/lib/constants";
import { formatCurrency } from "@/lib/format";
import { Card, CardHeader } from "@/components/ui/Card";

interface CategoryChartProps {
  data: CategorySummary[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  if (data.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader
          title="Spending by Category"
          description="Distribution of expenses across categories"
        />
        <div className="flex items-center justify-center h-64 text-slate-400">
          <p className="text-sm">No expense data to display</p>
        </div>
      </Card>
    );
  }

  const chartData = data.map((d) => ({
    name: d.category,
    value: d.total,
  }));

  return (
    <Card className="h-full">
      <CardHeader
        title="Spending by Category"
        description="Distribution of expenses across categories"
      />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-slate-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
