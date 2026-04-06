// components/dashboard/StatsGrid.tsx
import StatsCard from "./StatsCard";
import {
  DollarSign,
  FileText,
  TrendingUp,
  Percent,
  Users,
  Building2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { MainMetrics } from "@/types/dashboard";

interface StatsGridProps {
  metrics?: MainMetrics;
}

export default function StatsGrid({ metrics }: StatsGridProps) {
  const statsRow1 = [
    {
      title: "GMV (Gross Revenue)",
      value: metrics?.gmv ? `€${(metrics.gmv.amount || 0).toLocaleString()}` : "€0",
      icon: DollarSign,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      trend: `${metrics?.gmv?.change || 0}%`,
      trendUp: (metrics?.gmv?.change || 0) >= 0,
    },
    {
      title: "Total Bookings",
      value: metrics?.newBookings ? (metrics.newBookings.count || 0).toLocaleString() : "0",
      icon: FileText,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: `${metrics?.newBookings?.change || 0}%`,
      trendUp: (metrics?.newBookings?.change || 0) >= 0,
    },
    {
      title: "Net Revenue (After Fees)",
      value: metrics?.netRevenue ? `€${(metrics.netRevenue.amount || 0).toLocaleString()}` : "€0",
      icon: TrendingUp,
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
      trend: `${metrics?.netRevenue?.change || 0}%`,
      trendUp: (metrics?.netRevenue?.change || 0) >= 0,
    },
    {
      title: "Overall Conversion Rate",
      value: metrics?.conversionRate ? `${metrics.conversionRate.rate || 0}%` : "0%",
      icon: Percent,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      trend: `${metrics?.conversionRate?.change || 0}%`,
      trendUp: (metrics?.conversionRate?.change || 0) >= 0,
    },
  ];

  const statsRow2 = [
    {
      title: "Active Creators",
      value: metrics?.activeCreators ? (metrics.activeCreators.count || 0).toLocaleString() : "0",
      icon: Users,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: `${metrics?.activeCreators?.change || 0}%`,
      trendUp: (metrics?.activeCreators?.change || 0) >= 0,
    },
    {
      title: "Active Customers",
      value: metrics?.activeCustomers ? (metrics.activeCustomers.count || 0).toLocaleString() : "0",
      icon: Building2,
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      trend: `${metrics?.activeCustomers?.change || 0}%`,
      trendUp: (metrics?.activeCustomers?.change || 0) >= 0,
    },
    {
      title: "Pending Approval",
      value: "47",
      icon: Clock,
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      trend: "+8.7%",
      trendUp: true,
    },
    {
      title: "Avg Response Time",
      value: metrics?.avgResponseTime ? `${metrics.avgResponseTime.hours || 0}h` : "0h",
      icon: Clock,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      trend: `${metrics?.avgResponseTime?.change || 0}%`,
      trendUp: (metrics?.avgResponseTime?.change || 0) <= 0,
    },
  ];


  return (
    <div className="space-y-4">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsRow1.map((stat, index) => (
          <StatsCard key={index} {...stat} value={String(stat.value)} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsRow2.map((stat, index) => (
          <StatsCard key={index} {...stat} value={String(stat.value)} />
        ))}
      </div>
    </div>
  );
}
