"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const IncomeChart = ({ currentView, chartData = [] }) => {
  const getSpacing = () => {
    switch (currentView) {
      case "mobile":
        return "mb-6";
      case "tablet":
        return "mb-8";
      case "desktop":
        return "mb-10";
      default:
        return "mb-6";
    }
  };

  const CustomLegend = (props) => {
    return (
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#A743EF] rounded-sm"></div>
          <span className="text-sm font-semibold text-[#A743EF]">income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[#8F3938] rounded-full"></div>
            <div className="w-4 h-0.5 bg-[#8F3938]"></div>
          </div>
          <span className="text-sm font-semibold text-[#8F3938]">
            momGrowth
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={getSpacing()}>
      <div className="border-2 border-[#F2F2F2] rounded-2xl p-6 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-[#6B7280] text-[14px] font-[500]">
            Income Trend
          </h3>
        </div>
        <p className="text-[#6B7280] text-[14px] font-[400] mb-4">
          Your monthly income and growth for the last 6 months.
        </p>

        <div className="cursor-pointer">
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 5, left: 5, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="0"
                  stroke="#e5e7eb"
                  strokeWidth={0.5}
                  horizontal={true}
                  vertical={true}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                  interval={0}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  axisLine={{ stroke: "#A743EF", strokeWidth: 2 }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                  domain={[0, "dataMax + 1000"]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={{ stroke: "#7F1E1D", strokeWidth: 2 }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                  tickFormatter={(value) => `${value}%`}
                  domain={[-100, 100]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="income"
                  fill="#A743EF"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="momGrowth"
                  stroke="#7F1E1D"
                  strokeWidth={2}
                  dot={{ fill: "#7F1E1D", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#7F1E1D" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <CustomLegend />
        </div>
      </div>
    </div>
  );
};

export default IncomeChart;
