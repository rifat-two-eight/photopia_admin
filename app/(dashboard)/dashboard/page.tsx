// app/dashboard/page.tsx
"use client";

import AcquisitionChannel from "@/components/dashboard/AcquisitionChannel";
import CommissionChart from "@/components/dashboard/CommissionChart";
import GeographicPerformance from "@/components/dashboard/GeographicPerformance";
import GMVChart from "@/components/dashboard/GMVChart";
import MarketplaceHealth from "@/components/dashboard/MarketplaceHealth";
import MostViewedPages from "@/components/dashboard/MostViewedPages";
import QuickActions from "@/components/dashboard/QuickActions";
import RetentionChart from "@/components/dashboard/RetentionChart";
import StatsGrid from "@/components/dashboard/StatsGrid";
import LocationSelector from "@/components/dashboard/LocationSelector";
import CountryRanking from "@/components/dashboard/CountryRanking";


export default function DashboardPage() {
  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-medium text-gray-900 -mt-4">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Platform health and key performance metrics
          </p>
        </div>
        <div className="mb-1">
          <LocationSelector />
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GMVChart />
        <CommissionChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AcquisitionChannel />
        <RetentionChart />
      </div>

      {/* Geographic Performance */}
      <GeographicPerformance />

      {/* Bottom Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketplaceHealth />
        <MostViewedPages />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Country Ranking */}
      <CountryRanking />
    </div>
  );
}