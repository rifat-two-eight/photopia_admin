"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NotificationList } from './components/NotificationList';
import { NotificationStats } from './components/NotificationStats';
import { NotificationItem, NotificationStat } from './types';

const NotificationsPage = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
        id: '1',
        title: 'New User Registration',
        description: 'Sarah Johnson registered as a provider',
        time: '5 minutes ago',
        type: 'user',
        isUnread: true
    },
    {
        id: '2',
        title: 'New Content Report',
        description: 'Emma Wilson reported inappropriate content',
        time: '12 minutes ago',
        type: 'report',
        isUnread: true
    },
    {
        id: '3',
        title: 'Payment Dispute',
        description: 'Michael Chen disputed a charge of €249.00',
        time: '1 hour ago',
        type: 'alert', // Alert for dispute
        isUnread: true
    },
    {
        id: '4',
        title: 'New Premium Subscription',
        description: 'Lisa Anderson upgraded to Premium plan',
        time: '2 hours ago',
        type: 'subscription',
        isUnread: false // Visual distinction shown in screenshot (no dot) but style is subtle
    },
    {
        id: '5',
        title: 'Report Resolved',
        description: 'Content moderation case #1234 has been resolved',
        time: '6 hours ago',
        type: 'success',
        isUnread: false
    },
    {
        id: '6',
        title: 'Subscription Cancelled',
        description: 'Tom Brown cancelled their Premium subscription',
        time: '8 hours ago',
        type: 'user', // Using general icon or could be subscription type
        isUnread: false
    },
     {
        id: '7',
        title: 'Suspicious Activity Detected',
        description: 'Multiple login attempts detected for user@example.com',
        time: '10 hours ago',
        type: 'alert',
        isUnread: true
    },
    {
        id: '8',
        title: 'Payment Successful',
        description: 'Commission payment of €459.50 processed successfully',
        time: '12 hours ago',
        type: 'success',
        isUnread: false
    },
     {
        id: '9',
        title: 'Profile Update',
        description: 'Jennifer Lee updated their portfolio',
        time: '1 day ago',
        type: 'user',
        isUnread: false
    },
    {
        id: '10',
        title: 'Multiple Reports',
        description: '3 new reports for the same provider need review',
        time: '1 day ago',
        type: 'report',
        isUnread: true
    },
    {
        id: '11',
        title: 'Failed Payment',
        description: 'Payment failed for subscription renewal - Card declined',
        time: '2 days ago',
        type: 'alert', // Could also be payment type with Alert color, but 'alert' type handles red
        isUnread: false
    },
  ]);

  const stats: NotificationStat[] = [
    { label: 'User', value: 4, icon: 'user' },
    { label: 'Reports', value: 3, icon: 'flag' },
    { label: 'Payments', value: 4, icon: 'card' },
    { label: 'Subscriptions', value: 3, icon: 'crown' },
  ];

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return n.isUnread;
    if (filter === 'read') return !n.isUnread;
    return true;
  });

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  return (
    <div className="bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md min-h-screen">
       <div className="flex justify-between items-start mb-6 -mt-4">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-500 mt-1">
                    {notifications.filter(n => n.isUnread).length} unread notifications
                </p>
            </div>
            <Button 
                variant="ghost" 
                className="text-sm text-gray-500 hover:text-gray-900 font-medium"
                onClick={markAllRead}
            >
                Mark all as read
            </Button>
       </div>

       <div className="flex gap-2 mb-6">
            <Button 
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                className={`rounded-lg ${filter === 'all' ? 'bg-[#1C1C1E] text-white hover:bg-gray-800' : 'bg-white text-gray-700 border-gray-200'}`}
                onClick={() => setFilter('all')}
            >
                All ({notifications.length})
            </Button>
            <Button 
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                className={`rounded-lg ${filter === 'unread' ? 'bg-[#1C1C1E] text-white hover:bg-gray-800' : 'bg-white text-gray-700 border-gray-200'}`}
                onClick={() => setFilter('unread')}
            >
                Unread ({notifications.filter(n => n.isUnread).length})
            </Button>
             <Button 
                variant={filter === 'read' ? 'default' : 'outline'}
                size="sm"
                className={`rounded-lg ${filter === 'read' ? 'bg-[#1C1C1E] text-white hover:bg-gray-800' : 'bg-white text-gray-700 border-gray-200'}`}
                onClick={() => setFilter('read')}
            >
                Read ({notifications.filter(n => !n.isUnread).length})
            </Button>
       </div>

       <NotificationList notifications={filteredNotifications} onDelete={handleDelete} />
       
       <NotificationStats stats={stats} />
    </div>
  );
};

export default NotificationsPage;
