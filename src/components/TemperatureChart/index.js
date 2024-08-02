import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

function TemperatureChart({ chartData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: function (value) {
          return value.y;
        },
        color: "black",
        font: {
          size: 12,
        },
        padding: 6,
        align: "end",
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
        beginAtZero: true,
        grace: 2,
        max: 60,
      },
    },
  };

  return (
    <div className="h-64">
      <h2 className="flex text-2xl font-bold mb-3">
        Temperature <p className="font-sans pl-1">&#8451;</p>
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default TemperatureChart;
