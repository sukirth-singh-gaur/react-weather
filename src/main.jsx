import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import WeatherData from "./context/weather.provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WeatherData>
      <App />
    </WeatherData>
  </StrictMode>
);
