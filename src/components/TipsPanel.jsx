import './TipsPanel.css';

export default function TipsPanel({ latestTip }) {
  const tipText = latestTip?.trim() || "No tips yet — check back after logging a few more expenses.";

  return (
    <div className="tips-panel-card">
      <div className="tips-panel-header">
        <span className="tips-panel-badge-icon" aria-hidden="true">💡</span>
        <h3 className="tips-panel-title">Insight of the Day</h3>
      </div>
      <p className="tips-panel-content">{tipText}</p>
    </div>
  );
}
