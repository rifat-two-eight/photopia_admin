"use client"
import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '@/lib/axios';
import { PaymentStats } from './components/PaymentStats';
import { PaymentCharts } from './components/PaymentCharts';
import { PaymentsFilters } from './components/PaymentsFilters';
import { TransactionsTable } from './components/TransactionsTable';
import { PaymentsPagination } from './components/PaymentsPagination';
import { PaymentDetail } from './components/PaymentDetail';
import { RecentTransactionItem, PaymentStat, PaymentStatsApiResponse } from './types';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [apiData, setApiData] = useState<PaymentStatsApiResponse | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [statsRes, txnsRes] = await Promise.all([
          axiosInstance.get<ApiResponse<PaymentStatsApiResponse>>('/dashboard/payment-stats'),
          axiosInstance.get<ApiResponse<RecentTransactionItem[]>>('/dashboard/recent-transactions')
        ]);

        if (statsRes.data.success) {
          setApiData(statsRes.data.data);
        }
        if (txnsRes.data.success) {
          setRecentTransactions(txnsRes.data.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred while fetching payment data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const stats: PaymentStat[] = useMemo(() => {
    // ... same mapping logic as before ...
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
        
        <TransactionsTable 
          transactions={recentTransactions} 
          onViewDetails={setSelectedTransaction}
        />
        
        <PaymentsPagination 
          currentPage={currentPage}
          totalPages={3}
          totalItems={24}
          showingFrom={1}
          showingTo={8}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PaymentsPage;


