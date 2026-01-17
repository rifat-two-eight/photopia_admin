import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const commissionData = [
  { month: "Jan", "Provider Commission (3-5%)": 5000, "User Commission (6-15%)": 48000 },
  { month: "Feb", "Provider Commission (3-5%)": 4500, "User Commission (6-15%)": 52000 },
  { month: "Mar", "Provider Commission (3-5%)": 4800, "User Commission (6-15%)": 55000 },
  { month: "Apr", "Provider Commission (3-5%)": 5200, "User Commission (6-15%)": 58000 },
  { month: "May", "Provider Commission (3-5%)": 5500, "User Commission (6-15%)": 62000 },
  { month: "Jun", "Provider Commission (3-5%)": 5800, "User Commission (6-15%)": 65000 },
]

export default function CommissionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">Net Revenue (Commissions)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={commissionData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#666" }} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis tick={{ fontSize: 12, fill: "#666" }} axisLine={{ stroke: "#e5e7eb" }} domain={[0, 80000]} />
            <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "4px" }} labelStyle={{
                color: "#000",
                fontWeight: 500,
              }} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="Provider Commission (3-5%)" fill="#8B5CF6" />
            <Bar dataKey="User Commission (6-15%)" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
