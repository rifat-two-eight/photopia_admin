// components/dashboard/MarketplaceHealth.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MarketplaceHealth as MarketplaceHealthType } from "@/types/dashboard"

interface MarketplaceHealthProps {
  data?: MarketplaceHealthType;
}

export default function MarketplaceHealth({ data }: MarketplaceHealthProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">
          Marketplace Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!data ? (
          <div className="flex items-center justify-center h-[160px] border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <p className="text-gray-400 text-sm font-medium">No marketplace data yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Creator-Customer Ratio</p>
              <p className="text-3xl font-medium text-gray-900">
                {data.creatorCustomerRatio}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Match Rate</p>
              <p className="text-3xl font-medium text-gray-900">
                {data.matchRate}%
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Avg Project Value</p>
              <p className="text-3xl font-medium text-gray-900">
                €{data.avgProjectValue.toLocaleString()}
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Completion Rate</p>
              <p className="text-3xl font-medium text-gray-900">
                {data.completionRate}%
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
