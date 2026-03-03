"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NotificationList } from './components/NotificationList';
import { NotificationItem } from './types';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';

const NotificationsPage = () => {
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/notifications");
            if (response.data.success) {
                const mappedData: NotificationItem[] = response.data.data.map((item: any) => ({
                    id: item._id,
                    title: item.title,
                    description: item.content,
                    time: new Date(item.createdAt).toLocaleString(),
                    type: item.type === 'NEW_MESSAGE' ? 'user' : 'alert',
                    isUnread: !item.isRead
                }));
                setNotifications(mappedData);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch notifications");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);


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
        </div>
    );
};

export default NotificationsPage;
