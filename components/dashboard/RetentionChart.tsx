import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const retentionData = [
  { period: "Week 1", retention: 90, usage: 8 },
  { period: "Week 2", retention: 80, usage: 6 },
  { period: "Week 3", retention: 75, usage: 4 },
  { period: "Week 4", retention: 70, usage: 3 },
  { period: "D+30", retention: 65, usage: 2 },
  { period: "D+90", retention: 58, usage: 1 },
]

export default function RetentionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">Retention & Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={retentionData}>
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
      </CardContent>
    </Card>
  )
}
