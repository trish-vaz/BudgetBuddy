import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NAV_LINKS = [
  { to: '/',        label: 'Dashboard', icon: '⬡' },
  { to: '/log',     label: 'Log Expense', icon: '＋' },
  { to: '/budget',  label: 'Set Budget',  icon: '◎' },
  { to: '/summary', label: 'Summary',     icon: '≡' },
];

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span className="navbar-logo-mark">BB</span>
          <span className="navbar-logo-text">BudgetBuddy</span>
        </NavLink>

        <nav className="navbar-links" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                ['navbar-link', isActive ? 'navbar-link--active' : ''].join(' ').trim()
              }
            >
              <span className="navbar-link-icon" aria-hidden="true">{icon}</span>
              <span className="navbar-link-label">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
