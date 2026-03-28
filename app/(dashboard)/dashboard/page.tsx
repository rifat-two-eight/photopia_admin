// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { ApiResponse, DetailedDashboardStats } from "@/types/dashboard";
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

const SkeletonPlaceholder = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

export default function DashboardPage() {
  const [data, setData] = useState<DetailedDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("Fetching dashboard stats...");
        setLoading(true);
        const response = await axiosInstance.get<ApiResponse<DetailedDashboardStats>>(
          "/dashboard/detailed-stats"
        );
        console.log("API Response received:", response.data);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch dashboard stats");
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message || "An error occurred while fetching stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md min-h-screen">
        <SkeletonPlaceholder className="h-10 w-48 mb-4" />
        <SkeletonPlaceholder className="h-4 w-64 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonPlaceholder key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonPlaceholder className="h-[400px] w-full rounded-xl" />
          <SkeletonPlaceholder className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
      <StatsGrid metrics={data?.mainMetrics} />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GMVChart data={data?.gmvTrending} />
        <CommissionChart data={data?.netRevenueTrending} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AcquisitionChannel />
        <RetentionChart />
      </div>

      {/* Geographic Performance */}
      <GeographicPerformance data={data?.geographicPerformance} />

      {/* Bottom Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketplaceHealth data={data?.marketplaceHealth} />
        <MostViewedPages />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Country Ranking */}
      <CountryRanking data={data?.countryRanking} />
    </div>
  );
}