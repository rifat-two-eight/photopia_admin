import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AcquisitionChannelItem } from "@/types/dashboard"

interface AcquisitionChannelProps {
  data?: AcquisitionChannelItem[]
}

const channelColors: Record<string, string> = {
  "Social Media": "bg-blue-500",
  "SEO/Organic": "bg-teal-500",
  "Partnerships": "bg-purple-500",
  "Paid Ads": "bg-yellow-500",
  "Referrals": "bg-pink-500",
}

export default function AcquisitionChannel({ data }: AcquisitionChannelProps) {
  const displayData = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">
          Acquisition by Channel
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayData.length === 0 ? (
          <div className="flex items-center justify-center h-[200px] border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <p className="text-gray-400 text-sm font-medium">No acquisition data yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayData.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${channelColors[item.channel] || 'bg-gray-400'}`} />
                  <span className="text-sm font-medium text-gray-700">{item.channel}</span>
                </div>
                <div className="flex gap-6 text-right">
                  <span className="text-sm text-gray-600">{item.users} users</span>
                  <span className="text-sm text-gray-600">CAC: €{item.cac}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
