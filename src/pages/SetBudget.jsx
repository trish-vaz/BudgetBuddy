import { useState } from 'react';
import { callBudgetBuddy } from '../api/budgetBuddy';
import { useActivity } from '../context/ActivityContext';
import PageHeader from '../components/PageHeader';
import ResultCard from '../components/ResultCard';
import ErrorMessage from '../components/ErrorMessage';
import LoadingDots from '../components/LoadingDots';
import './FormPage.css';

const PLACEHOLDER = 'e.g. "set my food budget to 3000" or "dining limit 2500 per month"';

function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

export default function SetBudget() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const { addActivity } = useActivity();

  function reset() {
    setStatus('idle');
    setResult(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');
    setResult(null);

    try {
      const data = await callBudgetBuddy('set_budget', message.trim());
      setResult(data);
      setStatus('success');

      addActivity({
        icon: '🎯',
        title: `Budget set: ${data.budget_set.category} → ${formatCurrency(data.budget_set.monthly_limit)}/mo`,
        detail: message.trim(),
      });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="form-page">
      <PageHeader
        icon="🎯"
        title="Set a Budget"
        subtitle="Define a monthly spending limit for any category — BudgetBuddy will warn you when you're getting close."
      />

      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="budget-input" className="form-label">
              What budget would you like to set?
            </label>
            <textarea
              id="budget-input"
              className="form-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={PLACEHOLDER}
              rows={3}
              disabled={status === 'loading'}
              aria-describedby="budget-hint"
            />
            <p id="budget-hint" className="form-hint">
              Mention the category and monthly amount. BudgetBuddy will extract both automatically.
            </p>
          </div>

          <button
            id="set-budget-btn"
            type="submit"
            className="form-btn form-btn--success"
            disabled={status === 'loading' || !message.trim()}
          >
            {status === 'loading' ? (
              <>Saving <LoadingDots /></>
            ) : (
              'Set Budget'
            )}
          </button>
        </form>

        {/* Success */}
        {status === 'success' && result?.budget_set && (
          <ResultCard>
            <p className="result-label">Budget Saved</p>
            <p>
              <strong>{result.budget_set.category}</strong> budget set to{' '}
              <strong>{formatCurrency(result.budget_set.monthly_limit)}</strong> per month.
            </p>
          </ResultCard>
        )}

        {/* Error */}
        {status === 'error' && (
          <ErrorMessage onRetry={reset} />
        )}
      </div>

      {/* Tips */}
      <div className="form-tips">
        <p className="form-tips-title">💡 Try saying…</p>
        <ul className="form-tips-list">
          <li>"set my food budget to 5000"</li>
          <li>"travel budget is 8000 a month"</li>
          <li>"limit entertainment to 2000"</li>
          <li>"my shopping allowance is 3500"</li>
        </ul>
      </div>
    </div>
  );
}
