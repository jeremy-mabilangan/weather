import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(CategoryScale);
Chart.register(ChartDataLabels); // Plugin label.

/**
 * A bar chart component which displays the UV index.
 *
 * @param chartData - Consists of labels and datasets to populate chart.
 *
 * @returns Bar chart component.
 */
const UVIndex = ({ chartData }) => {
  /**
   * Configuration of Line Chart JS.
   */
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "white",
        font: {
          size: 16,
          weight: "bold",
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
        grace: 1,
      },
    },
  };

  return (
    <div className="h-64">
      <h2 className="text-2xl font-bold mb-3">UV Index</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default UVIndex;
