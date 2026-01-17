import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const acquisitionChannels = [
  { channel: "Social Media", users: "456 users", cac: "CAC: €12.5", color: "bg-blue-500" },
  { channel: "SEO/Organic", users: "892 users", cac: "CAC: €4.2", color: "bg-teal-500" },
  { channel: "Partnerships", users: "234 users", cac: "CAC: €18.3", color: "bg-purple-500" },
  { channel: "Paid Ads", users: "378 users", cac: "CAC: €22.8", color: "bg-yellow-500" },
  { channel: "Referrals", users: "567 users", cac: "CAC: €6.7", color: "bg-pink-500" },
]

export default function AcquisitionChannel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-900">Acquisition by Channel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {acquisitionChannels.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm font-medium text-gray-700">{item.channel}</span>
              </div>
              <div className="flex gap-6 text-right">
                <span className="text-sm text-gray-600">{item.users}</span>
                <span className="text-sm text-gray-600">{item.cac}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
