import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, User, Calendar, FileText, Download, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionDetailApiResponse } from '../types';
import axiosInstance from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';
import Swal from 'sweetalert2';

interface PaymentDetailProps {
  transactionId: string;
  onBack: () => void;
}

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export const PaymentDetail: React.FC<PaymentDetailProps> = ({ transactionId, onBack }) => {
  const [data, setData] = useState<TransactionDetailApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefunding, setIsRefunding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse<TransactionDetailApiResponse>>(`/dashboard/recent-transactions/${transactionId}`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch transaction details');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while fetching details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [transactionId]);

  const handleRefund = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You are about to issue a full refund for this transaction. This action cannot be reversed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E7000B',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, issue refund',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        setIsRefunding(true);
        const response = await axiosInstance.post(`/payment/${transactionId}/refund`);
        if (response.data.success) {
          Swal.fire({
            title: 'Refunded!',
            text: response.data.message || 'The refund has been processed successfully.',
            icon: 'success',
            confirmButtonColor: '#1E1E1E'
          });
          fetchDetails(); // Refresh to show new status
        }
      } catch (err: any) {
        Swal.fire({
          title: 'Error!',
          text: err.response?.data?.message || 'Failed to process refund. Please try again.',
          icon: 'error',
          confirmButtonColor: '#1E1E1E'
        });
      } finally {
        setIsRefunding(false);
      }
    }
  };

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

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-md p-10">
        <p className="text-red-500 font-medium mb-4">{error || 'No data found'}</p>
        <Button onClick={onBack} variant="outline">Back to Payments</Button>
      </div>
    );
  }

  const { transaction, paymentHistory, commissionSummary, serviceDetails } = data;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-gray-600 hover:text-gray-900 -ml-2 hover:bg-transparent px-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Payments
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Details Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-semibold text-gray-900">Transaction Details</CardTitle>
              <Badge className={`border-0 text-sm font-normal px-3 py-1 ${
                transaction.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                transaction.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                transaction.status === 'Refunded' ? 'bg-blue-50 text-blue-700' : 
                'bg-red-50 text-red-700'
              }`}>
                {transaction.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-8">
                <div>
                  <p className="text-xs text-slate-500 mb-1">ID:</p>
                  <p className="text-sm font-medium text-slate-900">{transaction.transactionId}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Transaction Date</p>
                  <p className="text-sm font-medium text-slate-900">{formatDate(transaction.date)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Transaction Type</p>
                  <p className="text-sm font-medium text-slate-900">{transaction.type}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 mb-1">Payment Method</p>
                  <p className="text-sm font-medium text-slate-900">{transaction.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">User</p>
                  <p className="text-sm font-medium text-slate-900">{transaction.user.name}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="font-medium text-gray-900 mb-4">Payment Breakdown</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Base Amount</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(transaction.baseAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Commission</span>
                    <span className="font-medium text-emerald-600">{formatCurrency(transaction.commission)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between text-base">
                    <span className="font-medium text-gray-900">Provider Receives</span>
                    <span className="font-bold text-gray-900">{formatCurrency(transaction.providerReceives)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-2 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
                {paymentHistory.map((item, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-5 h-5 bg-white border-2 border-green-500 rounded-full z-10 box-content -ml-[3.5px]">
                      <div className="w-2 h-2 bg-green-500 rounded-full m-1.5" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.status}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Amount: {formatCurrency(item.amount)}</p>
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(item.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Service Type</p>
                <p className="text-sm font-medium text-gray-900">{serviceDetails.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Service Date</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(serviceDetails.date)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="text-sm font-medium text-gray-900">{serviceDetails.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <p className="text-sm font-medium text-gray-900">{serviceDetails.duration}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Actions */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-[#1C1C1E] hover:bg-gray-800 text-white">
                Generate Invoice
              </Button>
              <Button variant="outline" className="w-full bg-white border-gray-200 text-gray-700">
                View User Profile
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRefund}
                disabled={isRefunding || transaction.status === 'Refunded'}
                className="w-full bg-white border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 disabled:opacity-50"
              >
                {isRefunding ? 'Processing...' : 'Issue Refund'}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="text-sm text-gray-900">{transaction.paymentMethod}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Cardholder</p>
                  <p className="text-sm text-gray-900">{transaction.cardholderName}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Expiry</p>
                  <p className="text-sm text-gray-900">{transaction.expiryDate}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Invoice Number</p>
                  <p className="text-sm text-gray-900">{transaction.invoiceNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Summary */}
          <Card className="border-blue-100 bg-blue-50/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Commission Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Platform Fee</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(commissionSummary.platformFee)}</span>
              </div>
              <div className="pt-2 border-t border-blue-200/50 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">Your Earnings</span>
                <span className="text-sm font-bold text-emerald-600">{formatCurrency(commissionSummary.earnings)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

