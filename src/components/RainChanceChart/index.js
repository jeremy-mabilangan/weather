import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import SunSVG from "../../../src/common/assets/colored-sun.js";

Chart.register(CategoryScale);
Chart.register(ChartDataLabels); // Plugin label

/**
 * A bar chart component which shows the chance of rain.
 *
 * @param chartData - Consists of labels and datasets to populate chart.
 *
 * @returns Bar chart component.
 */
const RainChanceChart = React.memo(({ chartData }) => {
  /**
   * Configuration of Bar Chart JS.
   */
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    barPercentage: 0.5,
    plugins: {
      datalabels: {
        formatter: function (value) {
          return value === 0 ? "" : value;
        },
        color: "black",
        font: {
          size: 13,
          weight: "bold",
          family: `"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
        },
        anchor: "end",
        align: "top",
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
        ticks: {
          font: {
            family: `"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
          },
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
        max: 115,
      },
    },
  };

  const plugins = [
    {
      // Displaying of sun icon if 0% rain chance.
      afterDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
        chart.data.datasets?.forEach((dataset, datasetIndex) => {
          dataset.data?.forEach((dataPoint, i) => {
            const displaySun = dataPoint === 0;

            if (!displaySun) {
              ctx.restore();
              return;
            }

            const point = chart.getDatasetMeta(datasetIndex).data[i];

            const sunSVGBase64 = btoa(SunSVG);
            const img = new Image();
            img.src = `data:image/svg+xml;base64,${sunSVGBase64}`;

            // Positioning of colored sun svg in chart
            const pointX = point.x - 12.5;
            ctx.drawImage(img, pointX, 0);
            ctx.restore();
          });
        });
      },
    },
  ];

  return (
    <div className="h-60">
      <h2 className="text-2xl font-bold mb-3">Rain Chance %</h2>
      <Bar data={chartData} options={options} plugins={plugins} />
    </div>
  );
});

export default RainChanceChart;
