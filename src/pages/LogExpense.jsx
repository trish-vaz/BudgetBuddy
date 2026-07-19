import { useState } from 'react';
import { callBudgetBuddy } from '../api/budgetBuddy';
import { useActivity } from '../context/ActivityContext';
import PageHeader from '../components/PageHeader';
import ResultCard from '../components/ResultCard';
import WarningBanner from '../components/WarningBanner';
import ErrorMessage from '../components/ErrorMessage';
import LoadingDots from '../components/LoadingDots';
import './FormPage.css';

const PLACEHOLDER = 'e.g. "spent 450 on groceries" or "paid 1200 for electricity"';

function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

export default function LogExpense() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
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
      const data = await callBudgetBuddy('log_expense', message.trim());
      setResult(data);
      setStatus('success');

      addActivity({
        icon: '💸',
        title: `Logged: ${formatCurrency(data.logged.amount)} on ${data.logged.category}`,
        detail: message.trim(),
      });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="form-page">
      <PageHeader
        icon="💸"
        title="Log an Expense"
        subtitle="Describe what you spent in plain English — BudgetBuddy handles the rest."
      />

      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="expense-input" className="form-label">
              What did you spend?
            </label>
            <textarea
              id="expense-input"
              className="form-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={PLACEHOLDER}
              rows={3}
              disabled={status === 'loading'}
              aria-describedby="expense-hint"
            />
            <p id="expense-hint" className="form-hint">
              Include the amount and category. Examples: "₹300 on coffee", "paid 2000 for rent".
            </p>
          </div>

          <button
            id="log-expense-btn"
            type="submit"
            className="form-btn form-btn--primary"
            disabled={status === 'loading' || !message.trim()}
          >
            {status === 'loading' ? (
              <>Processing <LoadingDots /></>
            ) : (
              'Log Expense'
            )}
          </button>
        </form>

        {/* Success */}
        {status === 'success' && result?.logged && (
          <ResultCard>
            <p className="result-label">Expense Logged</p>
            <p>
              <strong>{formatCurrency(result.logged.amount)}</strong> added to{' '}
              <strong>{result.logged.category}</strong>.
            </p>
          </ResultCard>
        )}

        {/* Budget warning */}
        {status === 'success' && result?.warning && (
          <WarningBanner message={result.warning} />
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
          <li>"spent 200 on food"</li>
          <li>"bought medicine for 850"</li>
          <li>"paid 1500 cab fare to airport"</li>
          <li>"coffee and snacks 120"</li>
        </ul>
      </div>
    </div>
  );
}
