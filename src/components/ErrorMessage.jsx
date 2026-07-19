import './ErrorMessage.css';

export default function ErrorMessage({ onRetry }) {
  return (
    <div className="error-message" role="alert">
      <span className="error-message-icon" aria-hidden="true">✕</span>
      <div className="error-message-body">
        <p className="error-message-title">Something went wrong</p>
        <p className="error-message-detail">
          We couldn't reach BudgetBuddy right now. Check your connection and try again.
        </p>
        {onRetry && (
          <button
            id="retry-btn"
            className="error-message-retry"
            onClick={onRetry}
            type="button"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
