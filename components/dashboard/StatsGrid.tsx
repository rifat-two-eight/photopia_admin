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
} from "lucide-react";

export default function StatsGrid() {
  const statsRow1 = [
    {
      title: "GMV (Gross Revenue)",
      value: "€642,900",
      icon: DollarSign,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      trend: "+25.8%",
      trendUp: true,
    },
    {
      title: "Total Bookings",
      value: "2,947",
      icon: FileText,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Net Revenue (After Fees)",
      value: "€57,432",
      icon: TrendingUp,
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
      trend: "+18.2%",
      trendUp: true,
    },
    {
      title: "Overall Conversion Rate",
      value: "3.8%",
      icon: Percent,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      trend: "+9.4%",
      trendUp: true,
    },
  ];

  const statsRow2 = [
    {
      title: "Active Creators",
      value: "810",
      icon: Users,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "+24.1%",
      trendUp: true,
    },
    {
      title: "Active Requesters (Clients)",
      value: "2,847",
      icon: Building2,
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      trend: "-3.2%",
      trendUp: false,
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
      value: "2.3h",
      icon: Clock,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      trend: "+9.2%",
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsRow1.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsRow2.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}