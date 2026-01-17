// components/dashboard/MostViewedPages.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mostViewedPages = [
  { name: "Search/Browse", views: "89,223 views", bounce: "32% bounce" },
  { name: "Creator Profiles", views: "76,543 views", bounce: "28% bounce" },
  { name: "Pricing", views: "65,432 views", bounce: "45% bounce" },
  { name: "Help & Support", views: "54,221 views", bounce: "18% bounce" },
  { name: "Portfolio Gallery", views: "45,882 views", bounce: "15% bounce" },
];

export default function MostViewedPages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-gray-900 font-medium">Most Viewed Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {mostViewedPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">{index + 1}.</span>
                <span className="text-sm font-medium text-gray-900">{page.name}</span>
              </div>
              <div className="text-right flex justify-center items-center gap-5">
                <p className="text-sm text-gray-900">{page.views}</p>
                <p className="text-xs text-red-600">{page.bounce}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}