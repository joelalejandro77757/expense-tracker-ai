import { Suspense } from "react";
import ExpensesPage from "./ExpensesPageContent";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading your expenses..." />}>
      <ExpensesPage />
    </Suspense>
  );
}
