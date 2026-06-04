"use client";

import { ExpenseProvider } from "@/context/ExpenseContext";
import { ToastProvider } from "@/context/ToastContext";
import { Header } from "@/components/layout/Header";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ExpenseProvider>
      <ToastProvider>
        <div className="min-h-screen bg-slate-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </ToastProvider>
    </ExpenseProvider>
  );
}
