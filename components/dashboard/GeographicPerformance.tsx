// components/dashboard/GeographicPerformance.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GeographicPerformanceItem } from "@/types/dashboard";

const demoGeographicData = [
  { city: "Berlin", bookings: 425, revenue: "€285,600", growth: "+12.3%" },
  { city: "Lagos", bookings: 198, revenue: "€153,800", growth: "+8.7%" },
  { city: "Marseille", bookings: 187, revenue: "€89,500", growth: "+9.5%" },
  { city: "Tuluose", bookings: 145, revenue: "€87,300", growth: "+14.1%" },
  { city: "Nice", bookings: 126, revenue: "€76,400", growth: "+12.3%" },
];

interface GeographicPerformanceProps {
  data?: GeographicPerformanceItem[];
}

export default function GeographicPerformance({ data }: GeographicPerformanceProps) {
  const isDemo = !data || data.length === 0;
  const tableData = !isDemo ? data : demoGeographicData;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-gray-900 font-medium">
          Geographic Performance {isDemo && "(demo)"}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}