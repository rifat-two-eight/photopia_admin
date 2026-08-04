// components/dashboard/GeographicPerformance.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeographicPerformanceItem } from "@/types/dashboard";

interface GeographicPerformanceProps {
  data?: GeographicPerformanceItem[];
}

export default function GeographicPerformance({ data }: GeographicPerformanceProps) {
  const tableData = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-gray-900 font-medium">
          Geographic Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tableData.length === 0 ? (
          <div className="flex items-center justify-center h-[160px] border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <p className="text-gray-400 text-sm font-medium">No geographic data yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    City
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Bookings
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Revenue
                  </th>
                  <th className="text-left py-3 flex justify-self-end px-4 text-sm font-medium text-gray-500">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((city, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {city.city}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{city.bookings}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {typeof city.revenue === "number" ? `€${city.revenue.toLocaleString()}` : city.revenue}
                    </td>
                    <td className="py-3 px-4 flex justify-self-end">
                      <span className="text-sm text-green-600 font-medium">
                        {typeof city.growth === "number" ? `${city.growth >= 0 ? "+" : ""}${city.growth}%` : city.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
