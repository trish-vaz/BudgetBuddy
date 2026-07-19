import './BudgetProgressBar.css';

function getBarColor(spent, budget) {
  if (budget === 0) return 'var(--color-text-tertiary)'; // no budget set (gray)
  const pct = spent / budget;
  if (pct < 0.5) return 'var(--color-success)'; // green
  if (pct < 0.8) return 'var(--color-warning)'; // yellow/amber
  return 'var(--color-error)'; // red
}

export default function BudgetProgressBar({ category, spent, budget }) {
  const percentage = budget > 0 ? Math.round((spent / budget) * 100) : 0;
  const barWidth = Math.min(percentage, 100);
  const barColor = getBarColor(spent, budget);

  const formattedSpent = `₹${Number(spent).toLocaleString('en-IN')}`;
  const formattedBudget = budget > 0 ? `₹${Number(budget).toLocaleString('en-IN')}` : 'No budget';

  return (
    <div className="budget-progress-bar-container">
      <div className="budget-progress-header">
        <span className="budget-progress-category">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
        <span className="budget-progress-amounts">
          <strong>{formattedSpent}</strong> / {formattedBudget}
          {budget > 0 && <span className="budget-progress-pct-text"> ({percentage}%)</span>}
        </span>
      </div>
      <div className="budget-progress-track">
        <div 
          className="budget-progress-fill" 
          style={{ 
            width: `${budget > 0 ? barWidth : 100}%`, 
            backgroundColor: barColor 
          }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}
