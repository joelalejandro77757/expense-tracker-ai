"use client";

import {
  DollarSign,
  Calendar,
  Receipt,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface SummaryCardsProps {
  totalSpending: number;
  monthlySpending: number;
  expenseCount: number;
  topCategory: string | null;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

export function SummaryCards({
  totalSpending,
  monthlySpending,
  expenseCount,
  topCategory,
}: SummaryCardsProps) {
  const now = new Date();
  const monthName = now.toLocaleString("en-US", { month: "long" });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Spending"
        value={formatCurrency(totalSpending)}
        subtitle={`Across ${expenseCount} expenses`}
        icon={DollarSign}
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
      />
      <StatCard
        title={`${monthName} Spending`}
        value={formatCurrency(monthlySpending)}
        subtitle="Current month"
        icon={Calendar}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
      />
      <StatCard
        title="Total Expenses"
        value={expenseCount.toString()}
        subtitle="Recorded transactions"
        icon={Receipt}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
      />
      <StatCard
        title="Top Category"
        value={topCategory ?? "—"}
        subtitle={topCategory ? "Highest spending" : "No data yet"}
        icon={TrendingUp}
        iconBg="bg-purple-100"
        iconColor="text-purple-600"
      />
    </div>
  );
}
