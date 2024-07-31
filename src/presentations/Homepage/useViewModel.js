import manilaJSON from "../../common/dummy/manila.json";
import moment from "moment/moment";
import { createGradient, getUVColor } from "../../common/helpers";

const ViewModel = () => {
  const reformatForecastData = () => {
    const locationData = manilaJSON.location;
    const currentData = manilaJSON.current;
    const forecastData = manilaJSON.forecast;

    const currentWeather = {
      day: moment(locationData.localtime).format("dddd, h:mm A"),
      condition: {
        label: currentData.condition.text,
        icon: currentData.condition.icon,
      },
      degree: currentData.dewpoint_c,
      rain_chance: forecastData.forecastday[0].day.daily_chance_of_rain,
      uv: currentData.uv,
      wind: currentData.wind_kph,
      humidity: currentData.humidity,
    };

    const forecast = forecastData.forecastday.reduce((acc, item) => {
      acc.push({
        icon: item.day.condition.icon,
        min_temp: item.day.mintemp_c,
        max_temp: item.day.maxtemp_c,
        day: moment(item.date).format("D"),
        md: moment(item.date).format("MMM, dddd"),
      });

      return acc;
    }, []);

    const hourLabels = forecastData.forecastday[0].hour.reduce((acc, item) => {
      const isEven = moment(item.time).format("h")
        ? Number(moment(item.time).format("h")) % 2
          ? false
          : true
        : false;
      if (isEven) {
        acc.push(moment(item.time).format("h A"));
        return acc;
      } else {
        return acc;
      }
    }, []);

    const rainChart = {
      labels: hourLabels,
      datasets: [
        {
          data: forecastData.forecastday[0].hour.reduce((acc, item) => {
            const isEven = moment(item.time).format("h")
              ? Number(moment(item.time).format("h")) % 2
                ? false
                : true
              : false;
            if (isEven) {
              acc.push(Number(item.chance_of_rain));
              return acc;
            } else {
              return acc;
            }
          }, []),
          backgroundColor: "transparent",
        },
      ],
    };

    const temperatureChart = {
      labels: hourLabels,
      datasets: [
        {
          data: forecastData.forecastday[0].hour.reduce((acc, item) => {
            const isEven = moment(item.time).format("h")
              ? Number(moment(item.time).format("h")) % 2
                ? false
                : true
              : false;
            if (isEven) {
              acc.push({
                x: moment(item.time).format("h A"),
                y: item.temp_c,
              });
              return acc;
            } else {
              return acc;
            }
          }, []),
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
            return createGradient(ctx, chartArea, {
              first: "#4fb300",
              second: "#ffd401",
              third: "#f56a01",
            });
          },
        },
      ],
    };

    const uvList = forecastData.forecastday[0].hour.reduce((acc, item) => {
      const isEven = moment(item.time).format("h")
        ? Number(moment(item.time).format("h")) % 2
          ? false
          : true
        : false;
      if (isEven) {
        acc.push(item.uv);
        return acc;
      } else {
        return acc;
      }
    }, []);

    const uvIndexChart = {
      labels: hourLabels,
      datasets: [
        {
          data: uvList,
          backgroundColor: uvList.map((uv) => getUVColor(uv)),
        },
      ],
    };

    return {
      currentWeather,
      forecast,
      rainChart,
      temperatureChart,
      uvIndexChart,
    };
  };

  return {
    data: reformatForecastData(),
  };
};

export default ViewModel;
