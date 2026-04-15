"use client"
import React, { useState, useEffect } from 'react';
import { ConversationList } from './components/ConversationList';
import { ChatWindow } from './components/ChatWindow';
import { Chat, Message, ChatResponse, MessageResponse } from './types';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';

import { useSocket } from '@/context/SocketContext';

const MessagesPage = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const { socket, userId } = useSocket();

  useEffect(() => {
    if (!socket || !userId) return;

    // Listen for chat list updates
    const handleUpdateChatList = () => {
      fetchChats();
    };

    socket.on(`updateChatList::${userId}`, handleUpdateChatList);

    return () => {
      socket.off(`updateChatList::${userId}`, handleUpdateChatList);
    };
  }, [socket, userId]);

  useEffect(() => {
    if (!socket || !activeId) return;

    // Listen for new messages in active chat
    const handleNewMessage = (newMessage: Message) => {
      setMessages((prev) => {
        // Prevent duplicates
        if (prev.some(m => m._id === newMessage._id)) return prev;
        return [...prev, newMessage];
      });
    };

    socket.on(`getMessage::${activeId}`, handleNewMessage);

    return () => {
      socket.off(`getMessage::${activeId}`, handleNewMessage);
    };
  }, [socket, activeId]);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (activeId) {
      fetchMessages(activeId);
    }
  }, [activeId]);

  const fetchChats = async () => {
    try {
      setIsLoadingChats(true);
      const response = await axiosInstance.get<ChatResponse>('/chat');
      if (response.data.success) {
        setChats(response.data.data.chats);
        if (response.data.data.chats.length > 0 && !activeId) {
          setActiveId(response.data.data.chats[0]._id);
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch chats");
    } finally {
      setIsLoadingChats(false);
    }
  };

  const fetchMessages = async (chatId: string) => {
    try {
      setIsLoadingMessages(true);
      const response = await axiosInstance.get<MessageResponse>(`/message/${chatId}`);
      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleMessageSent = (newMessage: Message) => {
    setMessages((prev) => {
      // Prevent duplicates
      if (prev.some(m => m._id === newMessage._id)) return prev;
      return [...prev, newMessage];
    });

    // Update the chat's updatedAt and set it as last message in the list
    setChats((prev) =>
      prev.map((chat) =>
        chat._id === newMessage.chatId
          ? { ...chat, updatedAt: newMessage.createdAt, lastMessage: newMessage }
          : chat
      ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    );
  };

  const activeChat = chats.find(c => c._id === activeId);

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Sidebar - fixed width */}
      <div className="w-80 md:w-96 shrink-0">
        <ConversationList
          chats={chats}
          activeId={activeId || ''}
          onSelect={setActiveId}
          isLoading={isLoadingChats}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 min-w-0">
        {activeChat ? (
          <ChatWindow
            chat={activeChat}
            messages={messages}
            isLoading={isLoadingMessages}
            onMessageSent={handleMessageSent}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
