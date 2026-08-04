import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { NetRevenueTrendingItem } from "@/types/dashboard"

interface CommissionChartProps {
  data?: NetRevenueTrendingItem[];
}

export default function CommissionChart({ data }: CommissionChartProps) {
  const hasData = data && data.length > 0;
  const chartData = hasData
    ? data.map((item) => ({
        month: item.month,
        providerCommission: item.providerCommission ?? 0,
        userCommission: item.userCommission ?? 0,
        value:
          item.value ??
          (item.providerCommission ?? 0) + (item.userCommission ?? 0),
      }))
    : [];

  const hasBreakdown = hasData && data.some(
    (item) => item.providerCommission != null || item.userCommission != null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">
          Net Revenue (Commissions)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#666" }} axisLine={{ stroke: "#e5e7eb" }} />
              <YAxis tick={{ fontSize: 12, fill: "#666" }} axisLine={{ stroke: "#e5e7eb" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "4px" }} labelStyle={{
                  color: "#000",
                  fontWeight: 500,
                }} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              {hasBreakdown ? (
                <>
                  <Bar dataKey="providerCommission" name="Provider Commission" stackId="a" fill="#8B5CF6" />
                  <Bar dataKey="userCommission" name="Client Commission" stackId="a" fill="#C4B5FD" />
                </>
              ) : (
                <Bar dataKey="value" name="Net Revenue" fill="#8B5CF6" />
              )}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <p className="text-gray-400 text-sm font-medium">No commission data yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
