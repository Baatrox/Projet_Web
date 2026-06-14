'use client';

import { useEffect, useRef, useState } from 'react';

export default function StudentChart({ students }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    async function initChart() {
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      if (!canvasRef.current) return;

      const colors = ['#457b9d', '#6c63ff', '#2a9d8f', '#e63946', '#f4a261', '#264653'];

      chartRef.current = new Chart(canvasRef.current, {
        type: chartType,
        data: {
          labels: students.map(s => s.nom),
          datasets: [
            {
              label: 'Moyenne',
              data: students.map(s => s.moyenne),
              backgroundColor: colors.slice(0, students.length),
              borderColor: colors.slice(0, students.length),
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Moyenne des étudiants du Master RSI',
              font: { size: 16, weight: 'bold' },
              color: '#1d3557',
            },
            legend: { display: false },
          },
          scales: {
            y: {
              min: 0,
              max: 20,
              grid: { color: '#dee2e6' },
              ticks: { stepSize: 5 },
            },
            x: {
              grid: { display: false },
            },
          },
        },
      });
    }

    initChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [students, chartType]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setChartType(t => t === 'bar' ? 'line' : 'bar')}
          className="text-sm text-secondary hover:text-primary font-medium underline transition-colors"
        >
          Basculer en {chartType === 'bar' ? 'courbe' : 'barres'}
        </button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}
