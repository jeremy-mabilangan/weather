import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

function RainChanceChart({ chartData }) {
  const rainDropSVG = ({
    h,
    w,
    c,
  }) => `<svg height="${h}" width="${w}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
  <g id="SVGRepo_iconCarrier"> <path style="fill:${c};" d="M256,512c-29.229,0-57.067-5.947-82.373-16.699C68.517,450.643,32.298,319.574,97.79,226.014L256,0 l158.21,226.014c65.491,93.56,29.274,224.629-75.837,269.286C313.067,506.053,285.229,512,256,512z"/> <path style="fill:${c};" d="M414.21,226.014L256,0v512c29.229,0,57.067-5.947,82.373-16.699 C443.483,450.643,479.702,319.574,414.21,226.014z"/> </g>
  </svg>`;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: function (value, context) {
          const hNumber = Math.max(...context.dataset.data);
          const hNumberIndex = context.dataset.data.findIndex((n) => n === hNumber);

          return hNumberIndex === context.dataIndex || context.dataIndex % 2 ? value : '';
        },
        color: 'black',
        font: {
          size: 13,
        },
        'rain-drop': {
          type: 'bar',
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

  const plugins = [
    {
      id: 'rain-drop',
      afterDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
        chart.data.datasets?.forEach((dataset, datasetIndex) => {
          dataset.data?.forEach((dataPoint, i) => {
            const rc1 = dataPoint <= 50;
            const rc2 = dataPoint >= 51 && dataPoint <= 75;

            // Resizing and coloring of raindrop svg
            if (dataPoint > 0) {
              const getRainDropSVG = () => {
                return rc1
                  ? rainDropSVG({
                      // Small
                      h: '10px',
                      w: '10px',
                      c: '#9ae0fe',
                    })
                  : rc2
                    ? rainDropSVG({
                        // Medium
                        h: '15px',
                        w: '15px',
                        c: '#7AB9E8',
                      })
                    : rainDropSVG({
                        // Large
                        h: '20px',
                        w: '20px',
                        c: '#02b2fd',
                      });
              };

              const point = chart.getDatasetMeta(datasetIndex).data[i];
              const rainDropIconBase64 = btoa(getRainDropSVG());
              const img = new Image();
              img.src = `data:image/svg+xml;base64,${rainDropIconBase64}`;

              // Positioning of raindrop svg in chart
              const pointX = rc1 ? point.x - 5 : rc2 ? point.x - 8 : point.x - 10;
              const pointY = point.y + 7 + point.height / 2;
              ctx.drawImage(img, pointX, pointY);
              ctx.restore();
            }
          });
        });
      },
    },
  ];

  return (
    <div className="h-60">
      <h2 className="text-base my-3">Rain Chance, %</h2>
      <Bar data={chartData} options={options} plugins={plugins} />
    </div>
  );
}

export default RainChanceChart;
