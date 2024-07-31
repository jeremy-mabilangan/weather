const ViewModel = () => {
  function getGradient(ctx, chartArea) {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, '#4fb300');
      gradient.addColorStop(0.5, '#ffd401');
      gradient.addColorStop(1, '#f56a01');
    }

    return gradient;
  }

  const temperatureChartData = {
    labels: [
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
      '24:00',
      '2:00',
      '4:00',
      '6:00',
      '8:00',
    ],
    datasets: [
      {
        label: 'Temperature',
        data: [
          {
            x: '10:00',
            y: 26,
          },
          {
            x: '14:00',
            y: 29,
          },
          {
            x: '4:00',
            y: 15,
          },
          {
            x: '8:00',
            y: 21,
          },
        ],
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 3,
        tension: 0.3,
        borderColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
      },
    ],
  };

  const uvIndexChartData = {
    labels: [
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ],
    datasets: [
      {
        data: [1, 2, 3, 3, 4, 5, 5, 4, 4, 3, 2, 1],
        backgroundColor: [
          '#4fb300',
          '#d6e489',
          '#ffd401',
          '#ffd401',
          '#f6a300',
          '#f56a01',
          '#f56a01',
          '#f6a300',
          '#f6a300',
          '#ffd401',
          '#d6e489',
          '#4fb300',
        ],
      },
    ],
  };

  const rainChanceChartData = {
    labels: [
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
      '24:00',
      '2:00',
      '4:00',
      '6:00',
      '8:00',
    ],
    datasets: [
      {
        data: [36, 20, 1, 15, 20, 67, 70, 78, 100, 73, 22, 10],
        backgroundColor: 'transparent',
      },
    ],
  };

  const sunChartData = {
    datasets: [
      {
        data: [30, 10],
        backgroundColor: ['#f6a500', '#ffdd99'],
        cutout: '98%',
        circumference: 120,
        rotation: 300,
      },
    ],
  };

  return {
    temperatureChartData,
    uvIndexChartData,
    rainChanceChartData,
    sunChartData,
  };
};

export default ViewModel;
