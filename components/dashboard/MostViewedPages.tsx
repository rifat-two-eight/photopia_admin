// components/dashboard/MostViewedPages.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MostViewedItem } from "@/types/dashboard";

interface MostViewedPagesProps {
  data?: MostViewedItem[];
}

export default function MostViewedPages({ data }: MostViewedPagesProps) {
  const pages = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-gray-900 font-medium">Most Viewed Services</CardTitle>
      </CardHeader>
      <CardContent>
        {pages.length === 0 ? (
          <div className="flex items-center justify-center h-[160px] border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <p className="text-gray-400 text-sm font-medium">No view data yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            {pages.map((page, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">{index + 1}.</span>
                  <span className="text-sm font-medium text-gray-900">{page.name}</span>
                </div>
                <div className="text-right flex justify-center items-center gap-5">
                  <p className="text-sm text-gray-900">{page.views.toLocaleString()} views</p>
                  {page.bounceRate != null && (
                    <p className="text-xs text-red-600">{page.bounceRate}% bounce</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
