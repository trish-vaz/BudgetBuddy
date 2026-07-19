import { useState } from 'react';
import { callBudgetBuddy } from '../api/budgetBuddy';
import { useActivity } from '../context/ActivityContext';
import PageHeader from '../components/PageHeader';
import ErrorMessage from '../components/ErrorMessage';
import LoadingDots from '../components/LoadingDots';
import './FormPage.css';
import './Summary.css';

const DEFAULT_PROMPT = 'how am I doing this month';

export default function Summary() {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('idle');
  const [summaryText, setSummaryText] = useState('');
  const { addActivity } = useActivity();

  function reset() {
    setStatus('idle');
    setSummaryText('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setSummaryText('');

    try {
      const message = prompt.trim() || DEFAULT_PROMPT;
      const data = await callBudgetBuddy('get_summary', message);
      setSummaryText(data.summary || 'No summary available.');
      setStatus('success');

      addActivity({
        icon: '📊',
        title: 'Spending summary generated',
        detail: (data.summary || '').slice(0, 80) + '…',
      });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="form-page">
      <PageHeader
        icon="📊"
        title="Spending Summary"
        subtitle="Get an AI-generated overview of your spending — ask in your own words."
      />

      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="summary-prompt" className="form-label">
              What would you like to know? <span className="form-label-optional">(optional)</span>
            </label>
            <input
              id="summary-prompt"
              type="text"
              className="form-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Default: "${DEFAULT_PROMPT}"`}
              disabled={status === 'loading'}
            />
            <p className="form-hint">
              Leave blank for a general monthly summary, or ask something specific.
            </p>
          </div>

          <button
            id="get-summary-btn"
            type="submit"
            className="form-btn form-btn--purple"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>Generating summary <LoadingDots /></>
            ) : (
              'Get Summary'
            )}
          </button>
        </form>

        {/* Error */}
        {status === 'error' && <ErrorMessage onRetry={reset} />}
      </div>

      {/* Summary output */}
      {status === 'success' && summaryText && (
        <div className="summary-result" role="region" aria-label="Spending summary">
          <div className="summary-result-header">
            <span className="summary-result-icon" aria-hidden="true">✦</span>
            <p className="summary-result-label">AI Summary</p>
          </div>
          <p className="summary-result-text">{summaryText}</p>
          <button
            id="new-summary-btn"
            className="summary-result-reset"
            onClick={reset}
            type="button"
          >
            Ask something else
          </button>
        </div>
      )}

      {/* Prompt ideas */}
      {status === 'idle' && (
        <div className="form-tips">
          <p className="form-tips-title">💡 Try asking…</p>
          <ul className="form-tips-list">
            <li>"how am I doing this month?"</li>
            <li>"which category did I overspend on?"</li>
            <li>"show me a breakdown of my expenses"</li>
            <li>"am I on track with my budget?"</li>
          </ul>
        </div>
      )}
    </div>
  );
}
