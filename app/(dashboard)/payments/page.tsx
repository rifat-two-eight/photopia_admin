"use client"
import React, { useState } from 'react';
import { PaymentStats } from './components/PaymentStats';
import { PaymentCharts } from './components/PaymentCharts';
import { PaymentsFilters } from './components/PaymentsFilters';
import { TransactionsTable } from './components/TransactionsTable';
import { PaymentsPagination } from './components/PaymentsPagination';
import { PaymentDetail } from './components/PaymentDetail';
import { Transaction, PaymentStat } from './types';

const PaymentsPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const stats: PaymentStat[] = [
    { 
      label: 'Total Revenue', 
      value: '€62,000', 
      change: '+12.3%', 
      subtext: 'from last month',
      chartData: [{value: 40}, {value: 45}, {value: 30}, {value: 50}, {value: 60}, {value: 55}, {value: 70}]
    },
    { 
      label: 'Commissions Earned', 
      value: '€3,100', 
      change: '5%', 
      subtext: 'average rate',
      chartData: [{value: 20}, {value: 20}, {value: 20}, {value: 20}, {value: 20}] // flat line logic
    },
    { 
      label: 'Subscriptions', 
      value: '€20,544', 
      change: '1,284', 
      subtext: 'active subscribers',
      chartData: [{value: 30}, {value: 40}, {value: 45}, {value: 50}, {value: 48}, {value: 60}]
    },
    { 
      label: 'Refunds', 
      value: '€840', 
      change: '8', 
      subtext: 'refund requests',
      chartData: [{value: 50}, {value: 40}, {value: 30}, {value: 60}, {value: 20}, {value: 10}]
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 'TXN-001',
      user: 'Sarah Johnson',
      type: 'Payment',
      amount: '€249.00',
      commission: '€12.45',
      date: '2024-12-20 15:30',
      status: 'Completed',
      paymentMethod: 'Visa ****4242',
      cardHolder: 'Sarah Johnson',
      expiry: '12/2026',
      invoiceNumber: 'INV-TXN-001',
      breakdown: { baseAmount: '€249.00', commissionRate: '5.0%', commissionAmount: '€12.45', providerReceives: '€229.33' },
      history: [
        { status: 'Payment initiated', date: '2024-12-20 15:30', amount: '€249.00' },
        { status: 'Payment processing', date: '2024-12-20 15:30', amount: '€249.00' },
        { status: 'Payment completed', date: '2024-12-20 15:30', amount: '€249.00' }
      ],
      serviceDetails: { type: 'Wedding Photography', date: 'January 15, 2025', location: 'Paris, France', duration: '8 hours' }
    },
    { 
      id: 'TXN-002', user: 'Michael Chen', type: 'Subscription', amount: '€16.00', commission: '€16.00', date: '2024-12-20 14:15', status: 'Completed',
      paymentMethod: 'Mastercard ****8899', breakdown: { baseAmount: '€16.00', commissionRate: '100%', commissionAmount: '€16.00', providerReceives: '€0.00' }
    },
    { 
      id: 'TXN-003', user: 'Emma Wilson', type: 'Payment', amount: '€120.00', commission: '€6.00', date: '2024-12-20 11:45', status: 'Completed',
      paymentMethod: 'Visa ****1234', breakdown: { baseAmount: '€120.00', commissionRate: '5.0%', commissionAmount: '€6.00', providerReceives: '€114.00' }
    },
    { 
      id: 'TXN-004', user: 'James Rodriguez', type: 'Refund', amount: '€-89.00', commission: '€-4.45', date: '2024-12-20 10:20', status: 'Completed',
      paymentMethod: 'Visa ****4242'
    },
    { 
      id: 'TXN-005', user: 'Sophie Martin', type: 'Payment', amount: '€380.00', commission: '€19.00', date: '2024-12-19 16:50', status: 'Completed',
      paymentMethod: 'Amex ****0001' 
    },
    { 
      id: 'TXN-006', user: 'Lisa Anderson', type: 'Subscription', amount: '€16.00', commission: '€16.00', date: '2024-12-19 14:30', status: 'Completed',
      paymentMethod: 'Visa ****9999' 
    },
    { 
      id: 'TXN-007', user: 'Robert Taylor', type: 'Payment', amount: '€195.00', commission: '€9.75', date: '2024-12-19 12:10', status: 'Pending',
      paymentMethod: 'Mastercard ****2222' 
    },
    { 
      id: 'TXN-008', user: 'David Kim', type: 'Payment', amount: '€450.00', commission: '€22.50', date: '2024-12-18 09:25', status: 'Completed',
      paymentMethod: 'Visa ****1111' 
    }
  ];

  if (selectedTransaction) {
    return <PaymentDetail transaction={selectedTransaction} onBack={() => setSelectedTransaction(null)} />;
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
      <PaymentCharts />
      
      <div className="space-y-4">
        <PaymentsFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <TransactionsTable 
          transactions={transactions} 
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
