import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

function TemperatureChart({ chartData }) {
  const options = {
    resizeDelay: 2,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: function (value) {
          return value.y;
        },
        color: 'black',
        font: {
          size: 16,
        },
        padding: 6,
        align: 'end',
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
        grace: 5,
      },
    },
  };

  return (
    <div className="h-64">
      <h2 className="text-base my-3">Temperature, &#8451;</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default TemperatureChart;
