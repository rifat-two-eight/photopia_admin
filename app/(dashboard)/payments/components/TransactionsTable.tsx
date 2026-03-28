import React from 'react';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RecentTransactionItem, TransactionStatus } from '../types';
import { Skeleton } from '@/components/ui/skeleton';

interface TransactionsTableProps {
  transactions: RecentTransactionItem[];
  onViewDetails: (transaction: RecentTransactionItem) => void;
  loading?: boolean;
}


const getStatusBadgeStyle = (status: TransactionStatus) => {
  switch (status) {
    case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50';
    case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-50';
    case 'Failed': return 'bg-red-50 text-red-700 border-red-100 hover:bg-red-50';
    default: return '';
  }
};

const getTypeStyle = (type: RecentTransactionItem['type']) => {
  switch (type) {
    case 'Payment': return 'bg-blue-50 text-blue-700 hover:bg-blue-50';
    case 'Subscription': return 'bg-purple-50 text-purple-700 hover:bg-purple-50';
    case 'Refund': return 'bg-red-50 text-red-700 hover:bg-red-50';
    default: return '';
  }
};

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onViewDetails }) => {
  const formatCurrency = (amt: number) => `€${amt.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`;
  const formatDate = (isoStr: string) => {
    try {
      return new Date(isoStr).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <Card className="shadow-sm overflow-hidden py-0 border border-gray-100">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 h-16 text-sm font-medium text-gray-900">
                    {txn.transactionId}
                  </td>
                  <td className="px-6 h-16 text-sm text-gray-900">
                    {txn.user.name}
                  </td>
                  <td className="px-6 h-16">
                    <Badge variant="secondary" className={`font-medium border-0 ${getTypeStyle(txn.type)}`}>
                      {txn.type}
                    </Badge>
                  </td>
                  <td className="px-6 h-16 text-sm font-medium text-gray-900">
                    {formatCurrency(txn.amount)}
                  </td>
                  <td className={`px-6 h-16 text-sm font-medium ${
                    txn.commission < 0 ? 'text-red-600' : 'text-emerald-600'
                  }`}>
                    {formatCurrency(txn.commission)}
                  </td>
                  <td className="px-6 h-16 text-sm text-gray-500">
                    {formatDate(txn.date)}
                  </td>
                  <td className="px-6 h-16">
                    <Badge variant="secondary" className={`font-normal ${getStatusBadgeStyle(txn.status)}`}>
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="px-6 h-16 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(txn)}
                      className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

