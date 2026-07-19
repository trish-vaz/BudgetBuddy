import { useEffect, useRef } from 'react';
import './ResultCard.css';

export default function ResultCard({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    // Trigger fade-in on mount
    requestAnimationFrame(() => {
      if (ref.current) ref.current.classList.add('result-card--visible');
    });
  }, []);

  return (
    <div ref={ref} className="result-card" role="status" aria-live="polite">
      <span className="result-card-check" aria-hidden="true">✓</span>
      <div className="result-card-body">{children}</div>
    </div>
  );
}
