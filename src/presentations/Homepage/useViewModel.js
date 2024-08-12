import moment from "moment/moment";
import { createGradient, getUVColor } from "../../common/helpers";
import { useGetWeatherForecast } from "../../common/blhooks/useWeather";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWeatherForecastData } from "../../common/reducers/weather";
import _ from "lodash";

const ViewModel = () => {
  /**
   * Weather Redux
   */
  const weatherState = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const locationInputRef = useRef();

  /**
   * Hooks for showing error message.
   */
  const [showErrorMessage, setShowErrorMessage] = useState({
    show: false,
    message: "",
  });

  /**
   * Google Maps API Key
   */
  const MAPS_API_KEY = process.env.REACT_APP_G_API_KEY;

  /** ----------- START: Get weather forecast mutation ----------- */
  const { mutate: getWeatherForecastMutate, isLoading } = useGetWeatherForecast(
    {
      onSuccess: (data) => {
        if (showErrorMessage.show) {
          setShowErrorMessage({ show: false });
        }

        dispatch(
          setWeatherForecastData({
            ...data.data,
            searchedLocation: locationInputRef.current?.value,
          })
        );
      },
      onError: (error) => {
        setShowErrorMessage({
          show: true,
          message: error.response?.data.error.message || error.message,
        });
      },
    }
  );
  /** ----------- END: Get weather forecast mutation ----------- */

  const handleSubmit2 = _?.debounce((e) => {
    e.preventDefault();
    console.log("Value: ", e.target.value);
  }, 500);

  /**
   * Submit location to weather API
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    locationInputRef.current.blur();
    const value = locationInputRef.current?.value;

    if (value === "") {
      // Display error message
      setShowErrorMessage({
        show: true,
        message: "Please enter your location",
      });
    } else if (
      weatherState?.data?.searchedLocation !== value &&
      value &&
      !isLoading
    ) {
      // API Call
      getWeatherForecastMutate({
        q: value,
        days: 3,
      });
    }
  };

  /**
   * Formatting of raw data.
   *
   * @returns Formatted data of Current Weather, Forecast, Charts, and Google Maps component.
   */
  const reformatForecastData = () => {
    const locationData = weatherState?.data?.location;
    const currentData = weatherState?.data?.current;
    const forecastData = weatherState?.data?.forecast;
    const location = {
      lat: locationData.lat,
      lng: locationData.lon,
    };

    // Location from API
    const name = `${locationData.name},${locationData.name === locationData.region ? "" : " " + locationData.region + ","} ${locationData.country}`;

    // Current weather section
    const currentWeather = {
      day: moment(locationData.localtime).format("dddd, D MMM h:mm A"),
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

    // Forecast section
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

    /**
     * Rain chance chart data.
     */
    const rainChart = {
      labels: hourLabels,
      datasets: [
        {
          data: rcData,
          backgroundColor: rcData.reduce((acc, item) => {
            const color =
              item > 0 && item <= 20
                ? "#68d0fd"
                : item >= 21 && item <= 40
                  ? "#36c1fc"
                  : item >= 41 && item <= 60
                    ? "#04b1fb"
                    : item >= 61 && item <= 80
                      ? "#038ec9"
                      : "#026a97";
            acc.push(color);
            return acc;
          }, []),
          borderRadius: 15,
        },
      ],
    };

    /**
     * Temperature chart data.
     */
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

    /**
     * UV index chart data.
     */
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

  useEffect(() => {
    // Retaining of inputted location when mounted
    if (weatherState?.data && locationInputRef.current) {
      locationInputRef.current.value = weatherState?.data.searchedLocation;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: weatherState?.data ? reformatForecastData() : undefined,
    locationInputRef,
    handleSubmit,
    showErrorMessage,
    MAPS_API_KEY,
    isLoading,
    handleSubmit2,
  };
};

export default ViewModel;
