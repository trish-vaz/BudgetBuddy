import { useEffect, useRef } from 'react';
import './WarningBanner.css';

export default function WarningBanner({ message }) {
  const ref = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (ref.current) ref.current.classList.add('warning-banner--visible');
    });
  }, []);

  return (
    <div ref={ref} className="warning-banner" role="alert" aria-live="assertive">
      <span className="warning-banner-icon" aria-hidden="true">⚠</span>
      <div className="warning-banner-body">
        <p className="warning-banner-label">Budget Alert</p>
        <p className="warning-banner-message">{message}</p>
      </div>
    </div>
  );
}
