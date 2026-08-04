import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { RetentionEngagement } from "@/types/dashboard"

interface RetentionChartProps {
  data?: RetentionEngagement
}

export default function RetentionChart({ data }: RetentionChartProps) {
  const hasData = Boolean(data?.intervals?.length);

  const formattedData = hasData && data
    ? data.intervals.map((interval, index) => ({
        period: interval,
        retention: data.retentionRate[index] ?? 0,
        usage: data.usageFrequency[index] ?? 0,
      }))
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">
          Retention & Engagement
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex items-center justify-center h-[250px] border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <p className="text-gray-400 text-sm font-medium">No retention data yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip labelStyle={{
                  color: "#000",
                  fontWeight: 500,
                }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="retention"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Retention Rate (%)"
                dot={{ fill: "#3b82f6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Usage Frequency"
                dot={{ fill: "#8b5cf6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
