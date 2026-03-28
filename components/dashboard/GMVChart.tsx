// components/dashboard/GMVChart.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingItem } from "@/types/dashboard";

interface GMVChartProps {
  data?: TrendingItem[];
}

export default function GMVChart({ data }: GMVChartProps) {
  const hasData = data && data.length > 0;
  const chartData = hasData ? data : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">
          GMV Trending {!hasData && "(No data)"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={true}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#666" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#666" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                }}
                labelStyle={{
                  color: "#000",
                  fontWeight: 500,
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
              <Area
                type="monotone"
                dataKey="value"
                name="GMV (€)"
                stroke="#10b981"
                fill="url(#colorGmv)"
                strokeWidth={2}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <p className="text-gray-400 text-sm font-medium">Coming soon</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


