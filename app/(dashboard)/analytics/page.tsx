"use client"
import React from 'react';
import { AnalyticsStats } from './components/AnalyticsStats';
import { ServiceBreakdown } from './components/ServiceBreakdown';
import { RevenueTrendsChart } from './components/RevenueTrendsChart';
import { BookingStatusChart } from './components/BookingStatusChart';
import { ConversionChart } from './components/ConversionChart';
import { TopProviders } from './components/TopProviders';
import { GrowthServices } from './components/GrowthServices';
import { AnalyticsStat, ServiceData, ProviderPerformance, GrowthService, MonthData } from './types';
import TopPerformingProviders from "./components/TopPerformingProviders";

const AnalyticsPage = () => {
  const stats: AnalyticsStat[] = [
    { label: 'Total Bookings', value: '1,623', change: '+18.2% vs last month', positive: true, icon: 'calendar' },
    { label: 'Gross Revenue', value: '€343,140', change: '+12.5% vs last month', positive: true, icon: 'dollar' },
    { label: 'Net Revenue', value: '€328,283', change: 'After €14,857 commission', positive: true, icon: 'trend' },
    { label: 'Conversion Rate', value: '13.0%', change: '+2.3% vs last month', positive: true, icon: 'target' },
  ];

  const serviceData: ServiceData[] = [
    { type: 'Wedding Photography', bookings: 234, avgPrice: '€250', grossRevenue: '€58,500', commission: '€2,925', netRevenue: '€55,575' },
    { type: 'Portrait Photography', bookings: 456, avgPrice: '€100', grossRevenue: '€45,600', commission: '€2,280', netRevenue: '€43,320' },
    { type: 'Event Photography', bookings: 189, avgPrice: '€380', grossRevenue: '€71,820', commission: '€3,591', netRevenue: '€68,229' },
    { type: 'Commercial Photography', bookings: 145, avgPrice: '€600', grossRevenue: '€87,000', commission: '€2,610', netRevenue: '€84,390' },
    { type: 'Product Photography', bookings: 321, avgPrice: '€120', grossRevenue: '€38,520', commission: '€1,666', netRevenue: '€36,854' },
    { type: 'Real Estate', bookings: 278, avgPrice: '€150', grossRevenue: '€41,700', commission: '€1,785', netRevenue: '€39,915' },
  ];

  const revenueTrends: MonthData[] = [
    { month: 'Jan', Wedding: 45000, Portrait: 35000, Event: 58000, Commercial: 70000 },
    { month: 'Feb', Wedding: 50000, Portrait: 38000, Event: 62000, Commercial: 72000 },
    { month: 'Mar', Wedding: 52000, Portrait: 40000, Event: 65000, Commercial: 75000 },
    { month: 'Apr', Wedding: 55000, Portrait: 42000, Event: 67000, Commercial: 78000 },
    { month: 'May', Wedding: 58000, Portrait: 44000, Event: 70000, Commercial: 82000 },
    { month: 'Jun', Wedding: 60000, Portrait: 45000, Event: 72000, Commercial: 85000 },
  ];

  const topProviders: ProviderPerformance[] = [
    { rank: 1, name: 'Sarah Johnson', bookings: 47, rating: 4.9, earnings: '€12,450' },
    { rank: 2, name: 'Michael Chen', bookings: 42, rating: 4.8, earnings: '€11,800' },
    { rank: 3, name: 'Emma Wilson', bookings: 38, rating: 4.9, earnings: '€10,540' },
    { rank: 4, name: 'James Rodriguez', bookings: 35, rating: 4.7, earnings: '€9,870' },
    { rank: 5, name: 'Lisa Anderson', bookings: 32, rating: 4.8, earnings: '€8,920' },
  ];

  const growthServices: GrowthService[] = [
    { name: 'Commercial Photography', bookings: 145, growth: '+28.5%' },
    { name: 'Event Photography', bookings: 189, growth: '+22.3%' },
    { name: 'Wedding Photography', bookings: 234, growth: '+18.7%' },
    { name: 'Portrait Photography', bookings: 456, growth: '+15.2%' },
    { name: 'Product Photography', bookings: 321, growth: '+12.8%' },
  ];

  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 -mt-4">Advanced Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Detailed insights into bookings, revenue, and conversions
        </p>
      </div>

      {/* Part 1: Top Section */}
      <AnalyticsStats stats={stats} />
      
      <ServiceBreakdown data={serviceData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendsChart data={revenueTrends} />
        <BookingStatusChart />
      </div>

      {/* Part 2: Bottom Section */}
      <div className="pt-6 border-t border-gray-200">
           <ConversionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProviders providers={topProviders} />
        <GrowthServices services={growthServices} />
      </div>

      <TopPerformingProviders />
    </div>
  );
};

export default AnalyticsPage;
