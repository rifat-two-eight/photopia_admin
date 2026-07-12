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
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (country) params.append("country", country);
        if (city) params.append("city", city);
        const queryString = params.toString() ? `?${params.toString()}` : '';

        const [statsResponse, subscribersResponse] = await Promise.all([
          axiosInstance.get(`/dashboard/subscription-stats${queryString}`),
          axiosInstance.get(`/dashboard/subscribers${queryString}`)
        ]);

        if (statsResponse.data.success) {
          setStatsData(statsResponse.data.data);
        }
        if (subscribersResponse.data.success) {
          setSubscribers(subscribersResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching subscription stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [country, city]);

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
    name: statsData?.activePlan.name || 'Photopya Premium',
    price: statsData?.activePlan.price || 16,
    features: statsData?.activePlan.features.map((f, i) => ({ id: i.toString(), text: f })) || [],
    stats: {
      subscribers: statsData?.activePlan.subscribers || 0,
      monthlyRevenue: statsData?.activePlan.monthlyRevenue || 0
    }
  };

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
          <LocationSelector 
            selectedCountry={country}
            selectedCity={city}
            onLocationChange={(country, city) => {
              setCountry(country);
              setCity(city);
            }} 
          />
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
