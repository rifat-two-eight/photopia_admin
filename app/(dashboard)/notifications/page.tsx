"use client";
import React, { useState, useEffect } from 'react';
import { NotificationList } from './components/NotificationList';
import { NotificationItem } from './types';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';

const NotificationsPage = () => {
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

    return (
        <div className="bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md min-h-screen">
            <div className="flex justify-between items-start mb-6 -mt-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
                </div>
            </div>

            <NotificationList notifications={notifications} />
        </div>
    );
};

export default NotificationsPage;
