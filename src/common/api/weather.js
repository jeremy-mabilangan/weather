import instance from "../app/axios";

/**
 * @param params {
 *     q {string}: location;
 *     days {number}: forecast days;
 * }
 *
 * @returns The Forecast data of inputted location.
 */
export const getWeatherForecast = async (params) => {
  const formattedParams = new URLSearchParams({
    key: process.env.REACT_APP_API_KEY,
    ...params,
  });
  return instance.get(`/forecast.json?${formattedParams}`);
};
