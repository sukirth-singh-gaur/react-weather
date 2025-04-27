import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
} from "recharts";

const Graph = ({ unit, data, mini }) => {
  const graphData = data.map((data) => {
    return {
      ...data,
      temp: unit == "C" ? data.temp_c : data.temp_f,
    };
  });
  return (
    <div className="absolute p-4 pb-8 bg-theme-foreground w-full h-full rounded-xl">
      <h2 className="text-base font-semibold mb-2">
        {mini
          ? "Weather Trends (Past 6 Hours)"
          : "Weather Trends (Next 6 Hours)"}
      </h2>

      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" opacity={"45%"} />
          <XAxis dataKey="time" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E293B",
              border: "1px solid #94A3B8",
              color: "#F8FAFC",
            }}
            wrapperStyle={{
              borderRadius: "12px",
            }}
            labelStyle={{
              color: "#fff",
              fontWeight: "bold",
            }}
          />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
