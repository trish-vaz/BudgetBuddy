import './PageHeader.css';

export default function PageHeader({ icon, title, subtitle }) {
  return (
    <div className="page-header">
      {icon && <span className="page-header-icon" aria-hidden="true">{icon}</span>}
      <div>
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
