import './LoadingDots.css';

export default function LoadingDots({ label = 'Processing…' }) {
  return (
    <span className="loading-dots" aria-label={label}>
      <span className="loading-dots-dot" />
      <span className="loading-dots-dot" />
      <span className="loading-dots-dot" />
    </span>
  );
}
