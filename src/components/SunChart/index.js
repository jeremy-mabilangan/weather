import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

function SunChart({ chartData }) {
  const sunSvg = `<?xml version="1.0" ?>
      <svg width="40px" height="40px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title/>
      <defs/>
      <g fill="none" fill-rule="evenodd" id="Icons new Arranged Names Color" stroke="none" stroke-width="1">
      <g fill="#f6a500" id="54 Sun">
      <path d="M20.9519917,20.9551655 C21.3452387,20.5619186 21.978647,20.5676073 22.3728301,20.9617903 L23.773794,22.3627543 C24.1740276,22.7629878 24.1709431,23.3930684 23.7804188,23.7835927 C23.3871719,24.1768396 22.7537635,24.1711509 22.3595805,23.7769678 L20.9586165,22.3760039 C20.558383,21.9757704 20.5614674,21.3456898 20.9519917,20.9551655 Z M20.9519917,11.0511821 C20.5587447,10.6579352 20.5644334,10.0245268 20.9586165,9.63034375 L22.3595805,8.22937981 C22.759814,7.82914626 23.3898945,7.83223071 23.7804188,8.222755 C24.1736658,8.61600196 24.1679771,9.2494103 23.773794,9.64359337 L22.3728301,11.0445573 C21.9725965,11.4447909 21.342516,11.4417064 20.9519917,11.0511821 Z M16,27.0063477 C15.4438648,27.0063477 15,26.5544378 15,25.9969788 L15,24.0157166 C15,23.4497008 15.4477153,23.0063477 16,23.0063477 C16.5561352,23.0063477 17,23.4582575 17,24.0157166 L17,25.9969788 C17,26.5629945 16.5522847,27.0063477 16,27.0063477 Z M16,9 C15.4438648,9 15,8.54809015 15,7.9906311 L15,6.0093689 C15,5.44335318 15.4477153,5 16,5 C16.5561352,5 17,5.45190985 17,6.0093689 L17,7.9906311 C17,8.55664682 16.5522847,9 16,9 Z M8.21958117,23.7835927 C7.82633422,23.3903457 7.83202291,22.7569374 8.22620598,22.3627543 L9.62716992,20.9617903 C10.0274035,20.5615568 10.657484,20.5646412 11.0480083,20.9551655 C11.4412553,21.3484125 11.4355666,21.9818208 11.0413835,22.3760039 L9.64041954,23.7769678 C9.24018599,24.1772014 8.61010546,24.1741169 8.21958117,23.7835927 Z M23.0031738,16.0031738 C23.0031738,15.4470387 23.4550837,15.0031738 24.0125427,15.0031738 L25.9938049,15.0031738 C26.5598207,15.0031738 27.0031738,15.4508891 27.0031738,16.0031738 C27.0031738,16.559309 26.551264,17.0031738 25.9938049,17.0031738 L24.0125427,17.0031738 C23.446527,17.0031738 23.0031738,16.5554586 23.0031738,16.0031738 Z M4.99682617,16.0031738 C4.99682617,15.4470387 5.44873602,15.0031738 6.00619507,15.0031738 L7.98745728,15.0031738 C8.553473,15.0031738 8.99682617,15.4508891 8.99682617,16.0031738 C8.99682617,16.559309 8.54491632,17.0031738 7.98745728,17.0031738 L6.00619507,17.0031738 C5.44017935,17.0031738 4.99682617,16.5554586 4.99682617,16.0031738 Z M16,22 C12.6862913,22 10,19.3137087 10,16 C10,12.6862913 12.6862913,10 16,10 C19.3137087,10 22,12.6862913 22,16 C22,19.3137087 19.3137087,22 16,22 Z M8.21958117,8.222755 C8.61282813,7.82950804 9.24623647,7.83519674 9.64041954,8.22937981 L11.0413835,9.63034375 C11.441617,10.0305773 11.4385326,10.6606578 11.0480083,11.0511821 C10.6547613,11.4444291 10.021353,11.4387404 9.62716992,11.0445573 L8.22620598,9.64359337 C7.82597243,9.24335982 7.82905688,8.61327929 8.21958117,8.222755 Z M8.21958117,8.222755" id="Oval 13"/>
      </g>
      </g>
  </svg>`;

  const options = {
    layout: {
      padding: {
        right: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: false,
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
      afterDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();

        const image = new Image();
        const sunIconBase64 = btoa(sunSvg);
        image.src = `data:image/svg+xml;base64,${sunIconBase64}`;

        const size = 40;

        const { x, y } = chart.getDatasetMeta(0).data[0].tooltipPosition();
        const xPos = x - size / 2;
        const yPos = y - size / 2;
        ctx.drawImage(image, xPos, yPos, size, size);

        ctx.font = 'normal 16px sans-serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText('5:50 Sunrise', 0, chart.chartArea.height);

        ctx.restore();

        ctx.font = 'normal 16px sans-serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'right';
        ctx.fillText('Sunset 20:47', chart.chartArea.width + 18, chart.chartArea.height);
      },
    },
  ];

  return (
    <div className="h-64">
      <Doughnut data={chartData} options={options} plugins={plugins} />
    </div>
  );
}

export default SunChart;