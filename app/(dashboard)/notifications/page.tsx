"use client";
import React, { useState, useEffect } from 'react';
import { NotificationList } from './components/NotificationList';
import { NotificationItem } from './types';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { useSocket } from '@/context/SocketContext';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const { socket, setUnreadNotifications } = useSocket();

    const fetchNotifications = React.useCallback(async () => {
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
