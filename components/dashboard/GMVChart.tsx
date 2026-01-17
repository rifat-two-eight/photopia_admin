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

const gmvData = [
  { month: "Jan", "GMV (€)": 600000 },
  { month: "Feb", "GMV (€)": 980000 },
  { month: "Mar", "GMV (€)": 620000 },
  { month: "Apr", "GMV (€)": 950000 },
  { month: "May", "GMV (€)": 780000 },
  { month: "Jun", "GMV (€)": 850000 },
];

export default function GMVChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">
          GMV Trending
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={gmvData}
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
              horizontalPoints={[0, 250000, 500000, 750000, 1000000]}
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
              domain={[0, 1000000]}
              ticks={[0, 250000, 500000, 750000, 1000000]}
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
              dataKey="GMV (€)"
              stroke="#10b981"
              fill="url(#colorGmv)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
