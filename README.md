# 💰 BudgetBuddy

A personal expense-tracking assistant with an AI-powered backend. Log expenses, set budgets, and get smart spending summaries — all in plain English.

## Features

- 📝 **Log expenses** — describe what you spent in natural language
- 🎯 **Set budgets** — define monthly limits per category
- 📊 **AI summaries** — get a spending overview powered by AI
- ⚠️ **Budget alerts** — automatic warnings when you hit 80%+ of a budget
- 🔄 **Live activity feed** — session history across all pages

## Tech Stack

- **Frontend**: React 18 + Vite + React Router v6
- **Backend**: n8n webhook workflow (AI classification, budget math, Google Sheets storage)
- **Styling**: Vanilla CSS with design tokens

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── api/              # Webhook fetch wrapper
├── context/          # Shared activity feed (React Context)
├── components/       # NavBar, ResultCard, WarningBanner, ErrorMessage, LoadingDots
└── pages/            # Dashboard, LogExpense, SetBudget, Summary
```

## Backend

All AI logic runs on an n8n workflow at a single endpoint:

```
POST https://trisha5523.app.n8n.cloud/webhook/budgetbuddy
```

Actions: `log_expense` · `set_budget` · `get_summary`
