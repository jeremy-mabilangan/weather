import moment from "moment/moment";
import { createGradient, getUVColor } from "../../common/helpers";
import { useGetWeatherForecast } from "../../common/blhooks/useWeather";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWeatherForecastData } from "../../common/reducers/weather";

const ViewModel = () => {
  const weatherState = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const locationInput = useRef();
  const [showErrorMessage, setShowErrorMessage] = useState({
    show: false,
    message: "",
  });

  const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  /** ----------- Get weather forecast mutation ----------- */
  const { mutate: getWeatherForecastMutate } = useGetWeatherForecast({
    onSuccess: (data) => {
      if (showErrorMessage.show) {
        setShowErrorMessage({ show: false });
      }

      dispatch(setWeatherForecastData(data.data));
    },
    onError: (error) => {
      setShowErrorMessage({
        show: true,
        message: error.response?.data.error.message || error.message,
      });
    },
  });

  /**
   * Submit location to weather API
   */
  const handleSubmit = (e) => {
    locationInput.current.blur();
    const value = locationInput.current?.value;

    if (value) {
      getWeatherForecastMutate({
        q: value,
        days: 3,
      });
    }

    e.preventDefault();
  };

  const reformatForecastData = () => {
    const locationData = weatherState?.data?.location;
    const currentData = weatherState?.data?.current;
    const forecastData = weatherState?.data?.forecast;
    const location = {
      lat: locationData.lat,
      lng: locationData.lon,
    };

    const name = `${locationData.name}, ${locationData.name === locationData.region ? "" : locationData.region + ","} ${locationData.country}`;
    const currentWeather = {
      day: moment(locationData.localtime).format("dddd, D MMM h:m A"),
      condition: {
        label: currentData.condition.text,
        icon: currentData.condition.icon,
      },
      degree: currentData.temp_c,
      rain_chance: forecastData.forecastday[0].day.daily_chance_of_rain,
      uv: currentData.uv,
      wind: currentData.wind_kph,
      humidity: currentData.humidity,
    };

    const forecast = forecastData.forecastday.reduce((acc, item) => {
      acc.push({
        label: item.day.condition.text,
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

    // [50, 20, 5, 76, 78, 60, 100, 100, 88, 12, 50, 20];
    const rcData = forecastData.forecastday[0].hour.reduce((acc, item) => {
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
    }, []);

    const rainChart = {
      labels: hourLabels,
      datasets: [
        {
          data: rcData,
          backgroundColor: rcData.reduce((acc, item) => {
            const color =
              item > 0 && item <= 50
                ? "#9ae0fe"
                : item >= 51 && item <= 75
                  ? "#35c1fd"
                  : "#028eca";
            acc.push(color);
            return acc;
          }, []),
          borderRadius: 15,
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
          borderColor: (context) => {
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
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              return;
            }
            return createGradient(ctx, chartArea, {
              first: "rgba(79, 179, 0, 0.5)",
              second: "rgba(255, 212, 1, 0.5)",
              third: "rgb(245, 106, 1, 0.5)",
            });
          },
          fill: true,
          // pointBackgroundColor: "current",
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
      name,
      currentWeather,
      forecast,
      rainChart,
      temperatureChart,
      uvIndexChart,
      location,
    };
  };

  return {
    data: weatherState?.data ? reformatForecastData() : undefined,
    locationInput,
    handleSubmit,
    showErrorMessage,
    MAPS_API_KEY,
  };
};

export default ViewModel;
