import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useActivity } from '../context/ActivityContext';
import './Dashboard.css';

const GREETING = (() => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
})();

const QUICK_ACTIONS = [
  {
    to: '/log',
    icon: '＋',
    iconBg: 'var(--color-primary)',
    title: 'Log an Expense',
    description: 'Tell BudgetBuddy what you spent in plain English.',
    example: '"spent 450 on groceries"',
  },
  {
    to: '/budget',
    icon: '◎',
    iconBg: 'var(--color-success)',
    title: 'Set a Budget',
    description: 'Define monthly limits for any spending category.',
    example: '"set my dining budget to 3000"',
  },
  {
    to: '/summary',
    icon: '≡',
    iconBg: '#8B5CF6',
    title: 'Get a Summary',
    description: 'Ask for an AI-generated snapshot of your spending.',
    example: '"how am I doing this month?"',
  },
];

function timeAgo(date) {
  const s = Math.floor((Date.now() - date) / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

export default function Dashboard() {
  const { activity } = useActivity();

  return (
    <div className="dashboard">
      {/* Hero */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-inner">
          <div className="dashboard-hero-text">
            <h1 className="dashboard-greeting">{GREETING} 👋</h1>
            <p className="dashboard-tagline">
              Your personal finance assistant is ready. What would you like to do?
            </p>
          </div>
          <div className="dashboard-hero-badge" aria-hidden="true">
            <span className="dashboard-hero-badge-dot" />
            Live
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">Quick Actions</h2>
        <div className="dashboard-actions-grid">
          {QUICK_ACTIONS.map(({ to, icon, iconBg, title, description, example }) => (
            <Link key={to} to={to} className="action-card" id={`action-card-${to.slice(1)}`}>
              <span
                className="action-card-icon"
                style={{ background: iconBg }}
                aria-hidden="true"
              >
                {icon}
              </span>
              <h3 className="action-card-title">{title}</h3>
              <p className="action-card-desc">{description}</p>
              <p className="action-card-example">{example}</p>
              <span className="action-card-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Activity Feed */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">
          Recent Activity
          {activity.length > 0 && (
            <span className="dashboard-activity-count">{activity.length}</span>
          )}
        </h2>

        {activity.length === 0 ? (
          <div className="dashboard-empty" id="activity-empty">
            <p className="dashboard-empty-icon" aria-hidden="true">🕐</p>
            <p className="dashboard-empty-text">No activity yet this session.</p>
            <p className="dashboard-empty-hint">
              Use the quick actions above to log expenses, set budgets, or get a summary.
            </p>
          </div>
        ) : (
          <ul className="activity-feed" aria-label="Recent activity">
            {activity.map((item) => (
              <li key={item.id} className="activity-item">
                <span className="activity-item-icon" aria-hidden="true">{item.icon}</span>
                <div className="activity-item-body">
                  <p className="activity-item-title">{item.title}</p>
                  <p className="activity-item-detail">{item.detail}</p>
                </div>
                <time className="activity-item-time" dateTime={item.timestamp.toISOString()}>
                  {timeAgo(item.timestamp)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
