import { useEffect, useRef, useState } from "react";
import { WeatherContext } from "./weather.context";

function WeatherData({ children }) {
  const [weather, setWeather] = useState({
    location: "unavailable",
    temperature: "__",
    condition: "weather unavailable",
    high: "__",
    low: "__",
    humidity: "__",
    windSpeed: "__",
    forecast: [
      {
        day: "_",
        temp: "__",
        condition: "unavailable",
      },
      {
        day: "_",
        temp: "__",
        condition: "unavailable",
      },
      {
        day: "_",
        temp: "__",
        condition: "unavailable",
      },
      {
        day: "_",
        temp: "__",
        condition: "unavailable",
      },
      {
        day: "_",
        temp: "__",
        condition: "unavailable",
      },
      {
        day: "_",
        temp: "__",
        condition: "unavailable",
      },
      {
        day: "_",
        temp: "__",
        condition: "unavailable",
      },
    ],
  });
  const [forecast, setForecast] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [weatherTrend, setWeatherTrend] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
  const API_KEY = import.meta.env.VITE_API_KEY;
  const DEFAULT_CITY = "Rio";
  const HOURS_BACK = 6;

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchWeather = async (query) => {
      if (hasFetched.current) return;

      hasFetched.current = true;

      try {
        const response = await fetch(
          `${BASE_URL}?key=${API_KEY}&days=2&query=${query}&alerts=no&aqi=no`
        );

        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();
        // console.log(data);
        const currentWeather = {
          location: data.location.name,
          temperature: data.current.temp_f,
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          high: data.forecast.forecastday[0].day.maxtemp_f,
          low: data.forecast.forecastday[0].day.mintemp_f,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_mph,
        };

        const forecastHrs = data.forecast.forecastday[1].hour;

        const forecastTomorrow = forecastHrs
          .filter((hours) => {
            return new Date(hours.time).getHours() % 3 === 0;
          })
          .map((hours) => ({
            time: new Date(hours.time).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            }),
            temp_f: hours.temp_f,
            temp_c: hours.temp_c,
            condition: hours.condition.text,
            icon: hours.condition.icon,
          }));

        const forecastToday = data.forecast.forecastday[0].hour;
        const currentHour = new Date().getHours();

        const hourlyWeather = forecastToday
          .filter((hour) => {
            const forecastHour = new Date(hour.time).getHours();
            return (
              forecastHour > currentHour - HOURS_BACK &&
              forecastHour <= currentHour
            );
          })
          .map((data) => ({
            time: new Date(data.time).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            }),
            temp: 0,
            temp_f: data.temp_f,
            temp_c: data.temp_c,
            condition: data.condition.text,
            icon: data.condition.icon,
          }));

        const weatherTrend = forecastToday
          .filter((hours) => {
            const hour = new Date(hours.time).getHours();

            return hour > currentHour && hour <= currentHour + HOURS_BACK;
          })
          .map((data) => ({
            time: new Date(data.time).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            }),
            temp: 0,
            temp_f: data.temp_f,
            temp_c: data.temp_c,
            condition: data.condition.text,
            icon: data.condition.icon,
          }));

        setWeather(currentWeather);
        setForecast(forecastTomorrow);
        setHourlyWeather(hourlyWeather);
        setWeatherTrend(weatherTrend);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(`${latitude}, ${longitude}`);
          },
          () => {
            console.warn("Geolocation denied, using default city");
            fetchWeather(DEFAULT_CITY);
          }
        );
      } else {
        console.warn("Geolocation not supported, using default city");
        fetchWeather(DEFAULT_CITY);
      }
    };

    getLocation();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        hourlyWeather,
        weatherTrend,
      }}
    >
      {loading && (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
          <div className="w-5 h-10 border-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherData;
