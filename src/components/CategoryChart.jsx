import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './CategoryChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Pull computed CSS token values at runtime so the chart matches the design system
function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function CategoryChart({ categories }) {
  const labels = categories.map((c) => c.name.charAt(0).toUpperCase() + c.name.slice(1));
  const spentData = categories.map((c) => c.spent);
  const budgetData = categories.map((c) => c.budget);

  const primary = '#4F46E5';
  const success = '#059669';
  const border  = '#E2E8F0';

  const data = {
    labels,
    datasets: [
      {
        label: 'Spent (₹)',
        data: spentData,
        backgroundColor: `${primary}CC`,
        borderColor: primary,
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Budget (₹)',
        data: budgetData,
        backgroundColor: `${success}33`,
        borderColor: `${success}88`,
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: { family: 'Inter, sans-serif', size: 12, weight: '500' },
          color: '#475569',
          boxWidth: 12,
          boxHeight: 12,
          borderRadius: 3,
          useBorderRadius: true,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Inter, sans-serif', size: 12, weight: '600' },
        bodyFont:  { family: 'Inter, sans-serif', size: 12 },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => ` ₹${ctx.parsed.y.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          font: { family: 'Inter, sans-serif', size: 12, weight: '500' },
          color: '#475569',
        },
      },
      y: {
        grid: { color: border, lineWidth: 1 },
        border: { display: false, dash: [4, 4] },
        ticks: {
          font: { family: 'Inter, sans-serif', size: 11 },
          color: '#94A3B8',
          callback: (v) => `₹${v.toLocaleString('en-IN')}`,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="category-chart-card">
      <h3 className="category-chart-title">Spending vs Budget</h3>
      <div className="category-chart-wrap">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
