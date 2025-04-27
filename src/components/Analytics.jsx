import {
  Activity,
  Sun,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Umbrella,
} from "lucide-react";
import { useWeather } from "../context/weather.context";

const Analytics = ({ unit }) => {
  const { weather, weatherTrend, hourlyWeather } = useWeather();

  const calculateTempChange = () => {
    if (hourlyWeather.length < 2)
      return {
        value: 0,
        trend: "stable",
      };

    const oldestTemp =
      unit == "C" ? hourlyWeather[0]?.temp_c : hourlyWeather[0]?.temp_f;

    const newestTemp =
      unit == "C"
        ? hourlyWeather[hourlyWeather.length - 1]?.temp_c
        : hourlyWeather[hourlyWeather.length - 1]?.temp_f;

    const difference = newestTemp - oldestTemp;

    return {
      value: Math.abs(difference).toFixed(1),
      trend: difference > 0 ? "rising" : difference < 0 ? "falling" : "stable",
    };
  };

  const calculateUpcomingTrend = () => {
    if (weatherTrend.length < 2)
      return {
        value: 0,
        trend: "stable",
      };

    const firstTemp =
      unit == "C" ? weatherTrend[0]?.temp_c : weatherTrend[0]?.temp_f;

    const lastTemp =
      unit == "C"
        ? weatherTrend[weatherTrend.length - 1]?.temp_c
        : weatherTrend[weatherTrend.length - 1]?.temp_f;

    const difference = lastTemp - firstTemp;

    return {
      value: Math.abs(difference).toFixed(1),
      trend: difference > 0 ? "rising" : difference < 0 ? "falling" : "stable",
    };
  };

  const calculateComfortLevel = () => {
    const temp = parseFloat(unit == "C" ? weather.temp_c : weather.temp_f);
    const humidity = parseFloat(weather.humidity);

    if (isNaN(temp) || isNaN(humidity)) {
      return "Unknown";
    }

    if ((temp > 80 && unit == "F") || (temp > 27 && unit == "C")) {
      if (humidity > 60) return "Uncomfortable";
      if (humidity > 40) return "Moderate";
      return "Comfortable";
    }

    if ((temp < 50 && unit == "F") || (temp < 10 && unit == "C")) {
      return "Cold";
    }

    return "Comfortable";
  };

  const tempChange = calculateTempChange();
  const upcomingTrend = calculateUpcomingTrend();
  const comfortLevel = calculateComfortLevel();

  return (
    <div className="flex flex-1 flex-col w-full h-full p-3">
      <h3 className="text-lg font-semibold mb-2">Weather Analytics</h3>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 p-2">
          {tempChange.trend == "rising" ? (
            <TrendingUp size={18} className="text-red-400" />
          ) : tempChange.trend == "falling" ? (
            <TrendingDown size={18} className="text-blue-400" />
          ) : (
            <Activity size={18} className="text-blue-400" />
          )}
          <div>
            <p className="opacity-70">Recent Trend</p>
            <p className="font-medium">
              {tempChange.value} {tempChange.trend}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2">
          {upcomingTrend.trend == "rising" ? (
            <TrendingUp size={18} className="text-red-400" />
          ) : upcomingTrend.trend == "falling" ? (
            <TrendingDown size={18} className="text-blue-400" />
          ) : (
            <Activity size={18} className="text-gray-400" />
          )}

          <div>
            <p className="opacity-70">Upcoming</p>
            <p className="font-medium">
              {upcomingTrend.value} {upcomingTrend.trend}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2">
          <Thermometer size={18} className="text-orange-400" />
          <div>
            <p className="opacity-70">Feels Like</p>
            <p className="font-medium">{comfortLevel}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2">
          <Sun size={18} className="text-yellow-400" />
          <div>
            <p className="opacity-70">UV Index</p>
            <p className="font-medium">
              {weather.condition.toLowerCase().includes("cloud")
                ? "Low"
                : "Moderate"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2">
          <Umbrella size={18} className="text-purple-400" />

          <div className="w-full">
            <p className="opacity-70">Precipitation Chance</p>

            <div className="w-full bg-gray-200 h-2 rounded-full mt-1 dark:bg-gray-700">
              <div
                className="bg-blue-400 h-2 rounded-full"
                style={{
                  width: `${
                    weather.condition.toLowerCase().includes("rain")
                      ? "70"
                      : "15"
                  }%`,
                }}
              ></div>
            </div>

            <p className="text-xs mt-1">
              {weather.condition.toLowerCase().includes("rain")
                ? "High"
                : "Low"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
