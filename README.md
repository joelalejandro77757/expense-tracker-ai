# ExpenseTracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Add, edit, and delete expenses** with date, amount, category, and description
- **Dashboard** with spending summaries, monthly trends, and category breakdowns
- **Filter and search** expenses by date range, category, and text
- **Charts and analytics** — pie chart by category, bar chart for monthly trends
- **CSV export** for filtered or all expenses
- **localStorage persistence** for demo data storage
- **Form validation** with real-time feedback
- **Responsive design** for desktop and mobile

## Categories

Food, Transportation, Entertainment, Shopping, Bills, Other

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Testing Features

### Dashboard (`/`)
1. View summary cards: total spending, monthly spending, expense count, top category
2. Review the monthly trend bar chart (last 6 months)
3. Check the category pie chart
4. See top categories with progress bars
5. Browse recent expenses (latest 5)

### Expenses (`/expenses`)
1. **Add expense**: Fill in date, amount, category, description → click "Add Expense"
2. **Validation**: Submit empty form to see validation errors
3. **Edit**: Hover over an expense → click pencil icon → update form → "Update Expense"
4. **Delete**: Hover over an expense → click trash icon → confirm deletion
5. **Search**: Type in the search box to filter by description, category, or amount
6. **Filter by category**: Use the category dropdown
7. **Filter by date range**: Set From/To dates
8. **Clear filters**: Click "Clear filters" when filters are active
9. **Export CSV**: Click "Export CSV" to download filtered (or all) expenses

### Data Persistence
- Expenses are saved to `localStorage` under key `expense-tracker-data`
- Refresh the page to verify data persists
- Clear browser storage to reset all data

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (charts)
- Lucide React (icons)
- date-fns (date utilities)

## Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
│   ├── dashboard/    # Charts and summary cards
│   ├── expenses/     # Form, list, filters
│   ├── layout/       # Header, providers
│   └── ui/           # Reusable UI components
├── context/          # React context providers
├── hooks/            # Custom hooks
├── lib/              # Utilities and helpers
└── types/            # TypeScript types
```
