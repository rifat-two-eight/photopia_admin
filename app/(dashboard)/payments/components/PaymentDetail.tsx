import React from 'react';
import { ArrowLeft, CreditCard, User, Calendar, FileText, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '../types';

interface PaymentDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

export const PaymentDetail: React.FC<PaymentDetailProps> = ({ transaction, onBack }) => {
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
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 text-sm font-normal px-3 py-1">
                Completed
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-8">
                <div>
                  <p className="text-xs text-slate-500 mb-1">ID:</p>
                  <p className="text-sm font-medium text-slate-900">{transaction.id}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Transaction Date</p>
                  <p className="text-sm font-medium text-slate-900">{transaction.date}</p>
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
                  <p className="text-sm font-medium text-slate-900">{transaction.user}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="font-medium text-gray-900 mb-4">Payment Breakdown</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Base Amount</span>
                    <span className="font-semibold text-gray-900">{transaction.breakdown?.baseAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Commission ({transaction.breakdown?.commissionRate})</span>
                    <span className="font-medium text-emerald-600">{transaction.breakdown?.commissionAmount}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between text-base">
                    <span className="font-medium text-gray-900">Provider Receives</span>
                    <span className="font-bold text-gray-900">{transaction.breakdown?.providerReceives}</span>
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
                {transaction.history?.map((item, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-5 h-5 bg-white border-2 border-green-500 rounded-full z-10 box-content -ml-[3.5px]">
                      <div className="w-2 h-2 bg-green-500 rounded-full m-1.5" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.status}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Amount: {item.amount}</p>
                      </div>
                      <span className="text-xs text-gray-400">{item.date}</span>
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
                <p className="text-sm font-medium text-gray-900">{transaction.serviceDetails?.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Service Date</p>
                <p className="text-sm font-medium text-gray-900">{transaction.serviceDetails?.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="text-sm font-medium text-gray-900">{transaction.serviceDetails?.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <p className="text-sm font-medium text-gray-900">{transaction.serviceDetails?.duration}</p>
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
              <Button variant="outline" className="w-full bg-white border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300">
                Issue Refund
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
                  <p className="text-sm text-gray-900">{transaction.cardHolder}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Expiry</p>
                  <p className="text-sm text-gray-900">{transaction.expiry}</p>
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
                <span className="text-sm font-medium text-gray-900">{transaction.commission}</span>
              </div>
              <div className="pt-2 border-t border-blue-200/50 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">Your Earnings</span>
                <span className="text-sm font-bold text-emerald-600">{transaction.commission}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
