"use client"
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { SubscriptionStats } from './components/SubscriptionStats';
import { SubscriptionCharts } from './components/SubscriptionCharts';
import { PlanCard } from './components/PlanCard';
import { SubscriptionFilters } from './components/SubscriptionFilters';
import { SubscribersTable } from './components/SubscribersTable';
import { EditPlanForm } from './components/EditPlanForm';
import { SubscriptionStat, SubscriptionPlan, Subscriber, SubscriptionStatsApiResponse } from './types';
import LocationSelector from "@/components/dashboard/LocationSelector";

const SubscriptionsPage = () => {
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statsData, setStatsData] = useState<SubscriptionStatsApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/dashboard/subscription-stats');
        if (response.data.success) {
          setStatsData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching subscription stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats: SubscriptionStat[] = [
    { 
      label: 'Total Provider', 
      value: statsData?.totalProvider.count.toString() || '0', 
      change: statsData?.totalProvider.percentageChange.toString(), 
      subtext: 'this month', 
      icon: 'users' 
    },
    { 
      label: 'Monthly Revenue', 
      value: `€${(statsData?.monthlyRevenue.amount || 0).toLocaleString()}`, 
      change: statsData?.monthlyRevenue.percentageChange.toString(), 
      subtext: 'this month', 
      icon: 'dollar' 
    },
    { 
      label: 'Premium Subscribers', 
      value: statsData?.premiumSubscribers.count.toString() || '0', 
      subtext: `€${statsData?.premiumSubscribers.pricePerMonth || 0}/month each`, 
      icon: 'crown' 
    },
    { 
      label: 'No Subscribers', 
      value: statsData?.noSubscribers.count.toString() || '0', 
      icon: 'store' 
    }
  ];

  // Map active plan to existing mock structure for the Edit form if needed
  const plan: SubscriptionPlan = {
    id: 'premium-plan',
    name: statsData?.activePlan.name || 'Photopia Premium',
    price: statsData?.activePlan.price || 16,
    features: statsData?.activePlan.features.map((f, i) => ({ id: i.toString(), text: f })) || [],
    stats: {
        subscribers: statsData?.activePlan.subscribers || 0,
        monthlyRevenue: statsData?.activePlan.monthlyRevenue || 0
    }
  };

  const subscribers: Subscriber[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@example.com', plan: 'Premium', status: 'Active', startDate: '2024-06-15', nextBilling: '2025-01-15', totalRevenue: '€144' },
    { id: '2', name: 'Michael Chen', email: 'michael.c@example.com', plan: 'Premium', status: 'Active', startDate: '2024-08-01', nextBilling: '2025-01-01', totalRevenue: '€495' },
    { id: '3', name: 'Emma Wilson', email: 'emma.w@example.com', plan: 'Premium', status: 'Active', startDate: '2024-09-10', nextBilling: '2025-01-10', totalRevenue: '€64' },
    { id: '4', name: 'James Rodriguez', email: 'james.r@example.com', plan: 'Premium', status: 'Cancelled', startDate: '2024-07-05', nextBilling: 'N/A', totalRevenue: '€594' },
    { id: '5', name: 'Lisa Anderson', email: 'lisa.a@example.com', plan: 'Premium', status: 'Active', startDate: '2024-11-01', nextBilling: '2025-01-01', totalRevenue: '€32' },
  ];

  if (isEditingPlan) {
    return (
        <EditPlanForm 
            plan={plan} 
            onBack={() => setIsEditingPlan(false)}
            onSave={(updated) => {
                console.log('Saved:', updated);
                setIsEditingPlan(false);
            }}
        />
    );
  }

  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 -mt-4">Subscription Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage Premium and Studio subscriptions
          </p>
        </div>
        <div className="mb-1">
          <LocationSelector />
        </div>
      </div>

      <SubscriptionStats stats={stats} loading={isLoading} />
      <SubscriptionCharts 
        loading={isLoading} 
        growthData={statsData?.subscriberGrowth} 
        revenueDistribution={statsData?.revenueDistribution}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <PlanCard 
           plan={statsData?.activePlan} 
           loading={isLoading}
           onEdit={() => setIsEditingPlan(true)} 
         />
      </div>

      <div className="space-y-4">
        <SubscriptionFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <SubscribersTable subscribers={subscribers} />
      </div>
    </div>
  );
};

export default SubscriptionsPage;
