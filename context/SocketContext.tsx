"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { decodeToken } from '@/lib/auth';
import { toast } from 'sonner';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  userId: string | null;
  unreadNotifications: number;
  setUnreadNotifications: React.Dispatch<React.SetStateAction<number>>;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  userId: null,
  unreadNotifications: 0,
  setUnreadNotifications: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Initialize and watch for token changes
  useEffect(() => {
    const initializeUser = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        const decoded = decodeToken(token);
        if (decoded) {
          // Check common ID fields
          const extractedId = decoded.id || decoded._id || decoded.userId || decoded.sub;
          if (extractedId) {
            console.log('Socket: User ID identified:', extractedId);
            setUserId(extractedId);
          } else {
            console.warn('Socket: Token decoded but no ID found. Fields:', Object.keys(decoded));
          }
        }
      }
    };

    initializeUser();

    // Listen for storage changes (handle login/logout in other tabs)
    window.addEventListener('storage', initializeUser);
    return () => window.removeEventListener('storage', initializeUser);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const socketUrl = apiUrl.replace('/api/v1', '');
    
    console.log('Socket: Attempting connection to:', socketUrl);

    const newSocket = io(socketUrl, {
      transports: ['polling', 'websocket'], // Allow fallback to polling
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Socket: Connected successfully. ID:', newSocket.id);
      setIsConnected(true);
      // Join notification room
      console.log('Socket: Emitting join-notification for:', userId);
      newSocket.emit('join-notification', userId);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket: Connection error:', error.message);
      setIsConnected(false);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket: Disconnected. Reason:', reason);
      setIsConnected(false);
    });

    newSocket.on('notification', (payload) => {
      console.log('Socket: New notification received:', payload);
      if (payload.type === 'NEW_NOTIFICATION') {
        setUnreadNotifications((prev) => prev + 1);
        toast.message(payload.data.title || 'New Notification', {
          description: payload.data.content,
        });
      }
    });

    setSocket(newSocket);

    return () => {
      console.log('Socket: Cleaning up connection');
      newSocket.close();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, userId, unreadNotifications, setUnreadNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};
