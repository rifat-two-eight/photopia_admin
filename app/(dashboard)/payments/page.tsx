"use client"
import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '@/lib/axios';
import { PaymentStats } from './components/PaymentStats';
import { PaymentCharts } from './components/PaymentCharts';
import { PaymentsFilters } from './components/PaymentsFilters';
import { TransactionsTable } from './components/TransactionsTable';
import { PaymentsPagination } from './components/PaymentsPagination';
import { PaymentDetail } from './components/PaymentDetail';
import { RecentTransactionItem, PaymentStat, PaymentStatsApiResponse, TransactionsResponse } from './types';
import { Skeleton } from '@/components/ui/skeleton';

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

const PaymentsPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<RecentTransactionItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiData, setApiData] = useState<PaymentStatsApiResponse | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch Stats once
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const statsRes = await axiosInstance.get<ApiResponse<PaymentStatsApiResponse>>('/dashboard/payment-stats');
        if (statsRes.data.success) {
          setApiData(statsRes.data.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred while fetching payment data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Fetch all transactions (no pagination)
  useEffect(() => {
    const fetchTransactions = async () => {
        try {
            setLoadingTransactions(true);
            const params = new URLSearchParams({
                searchTerm: debouncedSearch,
                limit: '100' // Show a large number of transactions vertically
            });
            const txnsRes = await axiosInstance.get<ApiResponse<RecentTransactionItem[]>>(`/dashboard/recent-transactions?${params.toString()}`);
            if (txnsRes.data.success) {
                setRecentTransactions(txnsRes.data.data);
            }
        } catch (err: any) {
            console.error("Failed to fetch transactions:", err);
            setRecentTransactions([]);
        } finally {
            setLoadingTransactions(false);
        }
    };
    fetchTransactions();
  }, [debouncedSearch]);

  const stats: PaymentStat[] = useMemo(() => {
    // ... stats mapping ...
    if (!apiData) return [
      { label: 'Total Revenue', value: '€0', change: '0%', subtext: 'from last month' },
      { label: 'Commissions Earned', value: '€0', change: '0%', subtext: 'average rate' },
      { label: 'Subscriptions', value: '€0', change: '0', subtext: 'active subscribers' },
      { label: 'Refunds', value: '€0', change: '0', subtext: 'refund requests' }
    ];

    return [
      { 
        label: 'Total Revenue', 
        value: `€${apiData.totalRevenue.amount.toLocaleString()}`, 
        change: `${apiData.totalRevenue.percentageChange >= 0 ? '+' : ''}${apiData.totalRevenue.percentageChange}%`, 
        subtext: 'from last month',
        trend: apiData.totalRevenue.percentageChange >= 0 ? 'up' : 'down'
      },
      { 
        label: 'Commissions Earned', 
        value: `€${apiData.commissionsEarned.amount.toLocaleString()}`, 
        change: `${apiData.commissionsEarned.averageRate}%`, 
        subtext: 'average rate',
        trend: 'neutral'
      },
      { 
        label: 'Subscriptions', 
        value: `€${apiData.subscriptions.amount.toLocaleString()}`, 
        change: apiData.subscriptions.activeSubscribers.toLocaleString(), 
        subtext: 'active subscribers',
        trend: 'up'
      },
      { 
        label: 'Refunds', 
        value: `€${apiData.refunds.amount.toLocaleString()}`, 
        change: apiData.refunds.refundRequests.toLocaleString(), 
        subtext: 'refund requests',
        trend: 'down'
      }
    ];
  }, [apiData]);

  const trendData = useMemo(() => {
    if (!apiData?.trends) return [];
    return apiData.trends.months.map((month, i) => ({
      month,
      commissions: apiData.trends.commissions[i] || 0,
      transactions: apiData.trends.totalTransactions[i] || 0,
    }));
  }, [apiData]);

  const categoryData = useMemo(() => {
    if (!apiData?.categories) return [];
    return apiData.categories.map(cat => ({
      name: cat.category,
      value: cat.amount
    }));
  }, [apiData]);

  if (selectedTransaction) {
    return <PaymentDetail transactionId={selectedTransaction.id} onBack={() => setSelectedTransaction(null)} />;
  }

  if (loading) {
    return (
      <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md min-h-screen">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[350px] w-full rounded-xl" />
          <Skeleton className="h-[350px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-md p-10">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 -mt-4">Payments & Commissions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track transactions, commissions, and financial metrics
        </p>
      </div>

      <PaymentStats stats={stats} />
      <PaymentCharts trendData={trendData} categoryData={categoryData} />
      
      <div className="space-y-4">
        <PaymentsFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <span className="text-sm text-gray-500">{recentTransactions.length} items total</span>
        </div>

        <TransactionsTable 
          transactions={recentTransactions} 
          onViewDetails={setSelectedTransaction}
          loading={loadingTransactions}
        />
      </div>
    </div>
  );
};

export default PaymentsPage;


