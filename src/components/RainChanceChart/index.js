import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import SunSVG from "../../../src/common/assets/colored-sun.js";

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

function RainChanceChart({ chartData }) {
  // const rainDropSVG = ({
  //   h,
  //   w,
  //   c,
  // }) => `<svg height="${h}" width="${w}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
  // <g id="SVGRepo_bgCarrier" stroke-width="0"/>
  // <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
  // <g id="SVGRepo_iconCarrier"> <path style="fill:${c};" d="M256,512c-29.229,0-57.067-5.947-82.373-16.699C68.517,450.643,32.298,319.574,97.79,226.014L256,0 l158.21,226.014c65.491,93.56,29.274,224.629-75.837,269.286C313.067,506.053,285.229,512,256,512z"/> <path style="fill:${c};" d="M414.21,226.014L256,0v512c29.229,0,57.067-5.947,82.373-16.699 C443.483,450.643,479.702,319.574,414.21,226.014z"/> </g>
  // </svg>`;

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
          size: 12,
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

  const plugins = [
    {
      id: "rain-drop",
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
            const pointY = point.y - 25;
            ctx.drawImage(img, pointX, pointY);
            ctx.restore();

            // Rain drop
            //   const rc1 = dataPoint <= 50;
            //   const rc2 = dataPoint >= 51 && dataPoint <= 75;

            //   // Resizing and coloring of raindrop svg
            //   if (dataPoint > 0) {
            //     const getRainDropSVG = () => {
            //       return rc1
            //         ? rainDropSVG({
            //             // Small
            //             h: "10px",
            //             w: "10px",
            //             c: "#9ae0fe",
            //           })
            //         : rc2
            //           ? rainDropSVG({
            //               // Medium
            //               h: "15px",
            //               w: "15px",
            //               c: "#7AB9E8",
            //             })
            //           : rainDropSVG({
            //               // Large
            //               h: "20px",
            //               w: "20px",
            //               c: "#02b2fd",
            //             });
            //     };

            //     const point = chart.getDatasetMeta(datasetIndex).data[i];
            //     const rainDropIconBase64 = btoa(getRainDropSVG());
            //     const img = new Image();
            //     img.src = `data:image/svg+xml;base64,${rainDropIconBase64}`;

            //     // Positioning of raindrop svg in chart
            //     const pointX = rc1
            //       ? point.x - 5
            //       : rc2
            //         ? point.x - 8
            //         : point.x - 10;
            //     const pointY = point.y - 8;
            //     ctx.drawImage(img, pointX, pointY);
            //     ctx.restore();
            //   }
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
}

export default RainChanceChart;
