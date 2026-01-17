import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MarketplaceHealth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">Marketplace Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Creator-Customer Ratio - Light Blue */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Creator-Customer Ratio</p>
            <p className="text-3xl font-medium text-gray-900">1:3.5</p>
          </div>

          {/* Match Rate - Light Green */}
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Match Rate</p>
            <p className="text-3xl font-medium text-gray-900">78.5%</p>
          </div>

          {/* Avg Project Value - Light Purple */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Avg Project Value</p>
            <p className="text-3xl font-medium text-gray-900">€676</p>
          </div>

          {/* Completion Rate - Light Orange */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Completion Rate</p>
            <p className="text-3xl font-medium text-gray-900">94.2%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
