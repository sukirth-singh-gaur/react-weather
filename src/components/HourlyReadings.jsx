import { useWeather } from "../context/weather.context";

const HourlyReadings = ({ unit }) => {
  const { hourlyWeather } = useWeather();
  return (
    <div className="w-full max-md:h-full">
      <p className="p-2 font-semibold">Past 6 Hours</p>

      <div className="relative flex items-center overflow-x-auto gap-2 p-2">
        {hourlyWeather.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-3 min-w-[70px] rounded-xl bg-theme border border-theme"
          >
            <p className="text-sm font-medium">{hour.time}</p>
            <img className="w-8 h-8" src={hour.icon} alt="" />
            <p className="text-lg font-semibold">
              {unit == "C" ? hour.temp_c : hour.temp_f}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyReadings;
