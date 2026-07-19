import BudgetProgressBar from './BudgetProgressBar';
import './BudgetProgressList.css';

export default function BudgetProgressList({ categories }) {
  return (
    <div className="budget-progress-list-card">
      <h3 className="budget-progress-list-title">Budget Allocation</h3>
      <div className="budget-progress-list-items">
        {categories.map((c) => (
          <BudgetProgressBar
            key={c.name}
            category={c.name}
            spent={c.spent}
            budget={c.budget}
          />
        ))}
      </div>
    </div>
  );
}
