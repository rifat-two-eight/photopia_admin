"use client"
import React, { useState, useEffect } from 'react';
import { AnalyticsStats } from './components/AnalyticsStats';
import { ServiceBreakdown } from './components/ServiceBreakdown';
import { RevenueTrendsChart } from './components/RevenueTrendsChart';
import { BookingStatusChart } from './components/BookingStatusChart';
import { ConversionChart } from './components/ConversionChart';
import { TopProviders } from './components/TopProviders';
import { GrowthServices } from './components/GrowthServices';
import { AnalyticsStat, ServiceData, ProviderPerformance, GrowthService, MonthData, AdvancedAnalyticsResponse } from './types';
import TopPerformingProviders from "./components/TopPerformingProviders";
import axiosInstance from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';

const AnalyticsPage = () => {
  const [data, setData] = useState<AdvancedAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/dashboard/advanced-analytics');
        setData(response.data.data);
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md min-h-screen">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <Skeleton className="h-[400px] w-full mt-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-md">
        <p className="text-red-500 font-medium">{error || 'No data available'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Mapping logic
  const stats: AnalyticsStat[] = [
    { 
      label: 'Total Bookings', 
      value: data.summary.totalBookings.count.toLocaleString(), 
      change: `${data.summary.totalBookings.percentageChange >= 0 ? '+' : ''}${data.summary.totalBookings.percentageChange}% vs last month`, 
      positive: data.summary.totalBookings.percentageChange >= 0, 
      icon: 'calendar' 
    },
    { 
      label: 'Gross Revenue', 
      value: `€${data.summary.grossRevenue.amount.toLocaleString()}`, 
      change: `${data.summary.grossRevenue.percentageChange >= 0 ? '+' : ''}${data.summary.grossRevenue.percentageChange}% vs last month`, 
      positive: data.summary.grossRevenue.percentageChange >= 0, 
      icon: 'dollar' 
    },
    { 
      label: 'Net Revenue', 
      value: `€${data.summary.netRevenue.amount.toLocaleString()}`, 
      change: `After €${data.summary.netRevenue.commission.toLocaleString()} commission`, 
      positive: true, 
      icon: 'trend' 
    },
    { 
      label: 'Conversion Rate', 
      value: `${data.summary.conversionRate.rate}%`, 
      change: `${data.summary.conversionRate.percentageChange >= 0 ? '+' : ''}${data.summary.conversionRate.percentageChange}% vs last month`, 
      positive: data.summary.conversionRate.percentageChange >= 0, 
      icon: 'target' 
    },
  ];

  const serviceData: ServiceData[] = data.breakdownByService.map(s => ({
    type: s.serviceType,
    bookings: s.bookings,
    avgPrice: `€${s.avgPrice.toLocaleString()}`,
    grossRevenue: `€${s.grossRevenue.toLocaleString()}`,
    commission: `€${s.commission.toLocaleString()}`,
    netRevenue: `€${s.netRevenue.toLocaleString()}`
  }));

  const revenueTrends: MonthData[] = data.revenueTrends.months.map((month, idx) => {
    const entry: MonthData = { month };
    data.revenueTrends.categories.forEach(cat => {
      entry[cat.name] = cat.data[idx];
    });
    return entry;
  });

  const topProviders: ProviderPerformance[] = data.topPerformingProviders.slice(0, 5).map(p => ({
    rank: p.rank,
    name: p.name,
    bookings: p.bookings,
    rating: p.rating,
    earnings: `€${p.revenue.toLocaleString()}`
  }));

  const growthServices: GrowthService[] = data.highestGrowthServices.map(s => ({
    name: s.name,
    bookings: s.bookings,
    growth: `${s.growthPercentage >= 0 ? '+' : ''}${s.growthPercentage}%`
  }));

  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 -mt-4">Advanced Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Detailed insights into bookings, revenue, and conversions
        </p>
      </div>

      <AnalyticsStats stats={stats} />
      
      <ServiceBreakdown data={serviceData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendsChart data={revenueTrends} />
        <BookingStatusChart data={data.bookingStatusDistribution} />
      </div>

      <div className="pt-6 border-t border-gray-200">
           <ConversionChart data={data.profileToBookingConversion} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProviders providers={topProviders} />
        <GrowthServices services={growthServices} />
      </div>

      <TopPerformingProviders providers={data.topPerformingProviders} />
    </div>
  );
};

export default AnalyticsPage;
