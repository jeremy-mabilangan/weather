import { useMutation } from "react-query";
import { getWeatherForecast } from "../api/weather";

/**
 * Custom hook for get weather forecast
 */
export const useGetWeatherForecast = ({ onSuccess, onError }) => {
  const res = useMutation({
    mutationFn: async (ref) => getWeatherForecast(ref),
    onError: (value) => {
      onError?.(value);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  return {
    ...res,
    loading: res.isLoading,
    status: res.status,
  };
};
