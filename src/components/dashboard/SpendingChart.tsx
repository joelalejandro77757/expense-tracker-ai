"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/format";

interface SpendingChartProps {
  data: { month: string; total: number }[];
}

export function SpendingChart({ data }: SpendingChartProps) {
  const hasData = data.some((d) => d.total > 0);

  if (!hasData) {
    return (
      <Card className="h-full">
        <CardHeader
          title="Monthly Trend"
          description="Spending over the last 6 months"
        />
        <div className="flex items-center justify-center h-64 text-slate-400">
          <p className="text-sm">No expense data to display</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader
        title="Monthly Trend"
        description="Spending over the last 6 months"
      />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(Number(value)), "Spending"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Bar
            dataKey="total"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
