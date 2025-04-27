import { CloudSnow, Sun, Thermometer, Umbrella, Wind } from "lucide-react";
import { useWeather } from "../context/weather.context";

const Recommendation = ({ unit }) => {
  const { weather } = useWeather();
  const getRecomendation = () => {
    const condition = weather.condition.toLowerCase() || "";
    const temp = parseFloat(weather.temperature);
    const windSpeed = parseFloat(weather.windSpeed);
    const humidity = parseFloat(weather.humidity);

    if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("shower")
    ) {
      if (windSpeed > 15) {
        return {
          icon: <Wind className="text-blue-500" size={24} />,
          title: "Bring an umbrella and raincoat",
          message:
            "It's rainy and windy outside. An umbrella might not be enough, consider a raincoat too.",
        };
      }

      return {
        icon: <Umbrella className="text-purple-500" size={24} />,
        title: "Bring an umbrella",
        message: "It's raining outside. An umbrella will make it safer.",
      };
    }

    if (
      condition.includes("snow") ||
      condition.includes("blizzard") ||
      condition.includes("sleet")
    ) {
      return {
        icon: <CloudSnow size={24} className="text-blue-500" />,
        title: "Dress warmly",
        message:
          "Snowy conditions expected. Wear warm clothes and waterproof boots.",
      };
    }

    if ((unit == "F" && temp > 85) || (unit == "C" && temp > 29)) {
      if (humidity > 70) {
        return {
          icon: <Thermometer className="text-red-500" size={24} />,
          title: "Stay Hydrated",
          message: "It's hot outside. Stay hydrated to avoid heatstroke.",
        };
      }

      return {
        icon: <Sun size={24} className="text-yellow-500" />,
        title: "Use sunscreen",
        message: "It's hot outside. Use sunscreen to protect your skin.",
      };
    }

    if ((unit == "F" && temp < 40) || (unit == "C" && temp < 4)) {
      return {
        icon: <Thermometer size={24} className="text-blue-400" />,
        title: "Bundle up",
        message: "It's cold outside. Dress appropriately and bundle up.",
      };
    }

    if (windSpeed > 20) {
      return {
        icon: <Wind className="text-gray-500" size={24} />,
        title: "Windy conditions",
        message:
          "It's windy outside. An umbrella might not be enough, consider a raincoat too.",
      };
    }

    return {
      icon: <Sun size={24} className="text-yellow-400" />,
      title: "Sunny day",
      message: "Weather conditions are favorable. Have a great day!",
    };
  };

  const recommendation = getRecomendation();

  return (
    <div className="flex flex-col p-3 w-full h-full">
      <h3 className="text-lg font-semibold mb-2">
        Today&apos;s Recommendation
      </h3>

      <div className="flex items-center gap-3 p-3">
        <div className="p-2 bg-theme-foreground">{recommendation.icon}</div>

        <div className="flex-1">
          <h4 className="font-medium text-base">{recommendation.title}</h4>
          <p className="text-sm opacity-80">{recommendation.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
