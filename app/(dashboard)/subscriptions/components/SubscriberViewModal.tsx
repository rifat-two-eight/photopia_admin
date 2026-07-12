import React from 'react';
import { X, Calendar, DollarSign, Mail, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Subscriber } from '../types';

interface SubscriberViewModalProps {
  subscriber: Subscriber;
  onClose: () => void;
}

export const SubscriberViewModal: React.FC<SubscriberViewModalProps> = ({ subscriber, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Subscriber Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-bold border border-blue-100">
              {subscriber.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{subscriber.name}</h3>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{subscriber.email}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Crown className="w-4 h-4" />
                <span className="text-xs font-medium">Plan</span>
              </div>
              <p className="text-base font-semibold text-gray-900">{subscriber.plan}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium">Status</span>
              </div>
              <Badge variant="secondary" className={
                subscriber.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                subscriber.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800'
              }>
                {subscriber.status}
              </Badge>
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-gray-100">
             <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Start Date</span>
                </div>
                <span className="font-medium text-gray-900">{subscriber.startDate}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Next Billing</span>
                </div>
                <span className="font-medium text-gray-900">{subscriber.nextBilling}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <DollarSign className="w-4 h-4" />
                  <span>Total Revenue</span>
                </div>
                <span className="font-medium text-gray-900 text-base">{subscriber.totalRevenue}</span>
             </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <Button onClick={onClose} className="bg-[#1C1C1E] text-white hover:bg-gray-800">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
