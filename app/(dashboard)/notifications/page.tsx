"use client";
import React, { useState, useEffect } from 'react';
import { NotificationList } from './components/NotificationList';
import { NotificationItem } from './types';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { useSocket } from '@/context/SocketContext';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { socket, setUnreadNotifications } = useSocket();

    const fetchNotifications = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/notifications/my");
            if (response.data.success) {
                const mappedData: NotificationItem[] = response.data.data.map((item: { _id: string; title: string; content: string; createdAt: string; type: string; isRead: boolean }) => ({
                    id: item._id,
                    title: item.title,
                    description: item.content,
                    time: new Date(item.createdAt).toLocaleString(),
                    type: item.type === 'NEW_MESSAGE' ? 'user' : (item.type || 'alert').toLowerCase(),
                    isUnread: !item.isRead
                }));
                setNotifications(mappedData);
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || "Failed to fetch notifications");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            fetchNotifications();
            // Reset unread count when visiting the page
            setUnreadNotifications(0);
            try {
                await axiosInstance.patch("/notifications/read-all");
            } catch (error) {
                console.error("Failed to mark notifications as read", error);
            }
        }, 0);
    }, [fetchNotifications, setUnreadNotifications]);

    useEffect(() => {
        if (!socket) return;

        const handleNewNotification = (payload: { type: string; data: { _id: string; title: string; content: string; createdAt: string; type: string } }) => {
            if (payload.type === 'NEW_NOTIFICATION') {
                const newItem: NotificationItem = {
                    id: payload.data._id,
                    title: payload.data.title,
                    description: payload.data.content,
                    time: new Date(payload.data.createdAt).toLocaleString(),
                    type: payload.data.type === 'NEW_MESSAGE' ? 'user' : (payload.data.type || 'alert').toLowerCase(),
                    isUnread: true
                };
                setNotifications(prev => [newItem, ...prev]);
            }
        };

        socket.on('notification', handleNewNotification);
        return () => {
            socket.off('notification', handleNewNotification);
        };
    }, [socket]);

    return (
        <div className="bg-white p-6 lg:p-10 rounded-2xl shadow-sm border border-gray-100 min-h-[calc(100vh-140px)]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Notifications</h1>
                    <p className="text-sm text-gray-500 mt-1">Stay updated with your latest alerts and messages.</p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col space-y-4">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 animate-pulse">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No notifications yet</h3>
                    <p className="text-gray-500 mt-1">When you get notifications, they'll show up here.</p>
                </div>
            ) : (
                <NotificationList notifications={notifications} />
            )}
        </div>
    );
};

export default NotificationsPage;
