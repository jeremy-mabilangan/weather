/**
 * - Provides the color of bar in Bar Chart
 *
 * @param uv - number
 * @returns Color of bar depending on UV index
 */
export const getUVColor = (uv) => {
  let color;

  if (uv <= 1) {
    color = "#4fb300";
  } else if (uv === 2) {
    color = "#d6e489";
  } else if (uv === 3) {
    color = "#ffd401";
  } else if (uv === 4) {
    color = "#f6a300";
  } else if (uv >= 5) {
    color = "#f56a01";
  }

  return color;
};

/**
 * - Generate a gradient linear for Line Chart
 *
 * @param ctx
 * @param chartArea
 * @param colors - 3 different colors (Hex Code)
 * @returns
 */
export const createGradient = (ctx, chartArea, colors) => {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, colors.first);
    gradient.addColorStop(0.5, colors.second);
    gradient.addColorStop(1, colors.third);
  }

  return gradient;
};
