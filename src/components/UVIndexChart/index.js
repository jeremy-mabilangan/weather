import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

function UVIndex({ chartData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: 'white',
        font: {
          size: 16,
        },
      },
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-64">
      <h2 className="text-base my-3">UV Index</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default UVIndex;
