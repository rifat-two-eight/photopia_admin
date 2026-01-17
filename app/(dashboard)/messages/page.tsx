"use client"
import React, { useState } from 'react';
import { ConversationList } from './components/ConversationList';
import { ChatWindow } from './components/ChatWindow';
import { Conversation } from './types';

const MessagesPage = () => {
    // Dummy Data mirroring the screenshot
  const [activeId, setActiveId] = useState<string>('c1');

  const conversations: Conversation[] = [
    {
        id: 'c1',
        user: { id: 'u1', name: 'Sarah Johnson', role: 'Provider', status: 'Online', avatar: '' },
        lastMessage: 'Thank you for your help with the verification!',
        lastMessageTime: '2 min ago',
        unreadCount: 2,
        messages: [
            { id: 'm1', senderId: 'u1', text: 'Hello, I need help with my account verification', timestamp: '10:30 AM', isMe: false },
            { id: 'm2', senderId: 'me', text: "Hello Sarah! I'd be happy to help you with that. What seems to be the issue?", timestamp: '10:32 AM', isMe: true },
            { id: 'm3', senderId: 'u1', text: 'My business license document was rejected, but I\'m not sure why', timestamp: '10:33 AM', isMe: false },
            { id: 'm4', senderId: 'me', text: 'Let me check your account. The document appears to be blurry. Could you please upload a clearer version?', timestamp: '10:35 AM', isMe: true },
            { id: 'm5', senderId: 'u1', text: 'Oh, I see. I\'ll upload a better quality photo right away.', timestamp: '10:36 AM', isMe: false },
            { id: 'm6', senderId: 'u1', text: 'Just uploaded the new document. Can you check it now?', timestamp: '10:45 AM', isMe: false },
            { id: 'm7', senderId: 'me', text: 'Perfect! The document is now clear and readable. I\'ve approved it. Your account is now fully verified.', timestamp: '10:48 AM', isMe: true },
            { id: 'm8', senderId: 'u1', text: 'Thank you for your help with the verification!', timestamp: '10:50 AM', isMe: false },
        ]
    },
    {
        id: 'c2',
        user: { id: 'u2', name: 'Michael Chen', role: 'Provider', status: 'Online', avatar: '' },
        lastMessage: 'Can you help me understand the commission',
        lastMessageTime: '15 min ago',
        messages: []
    },
    {
        id: 'c3',
        user: { id: 'u3', name: 'Emma Wilson', role: 'User', status: 'Offline', avatar: '' },
        lastMessage: 'I reported a user yesterday. Any updates?',
        lastMessageTime: '1 hour ago',
        unreadCount: 1,
        messages: []
    },
    {
        id: 'c4',
        user: { id: 'u4', name: 'James Rodriguez', role: 'Provider', status: 'Offline', avatar: '' },
        lastMessage: 'Sounds good, thanks!',
        lastMessageTime: '3 hours ago',
        messages: []
    },
    {
        id: 'c5',
        user: { id: 'u5', name: 'Lisa Anderson', role: 'User', status: 'Online', avatar: '' },
        lastMessage: 'Could you help me with my subscription?',
        lastMessageTime: '5 hours ago',
        messages: []
    }
  ];

  const activeConversation = conversations.find(c => c.id === activeId) || conversations[0];

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Sidebar - fixed width */}
        <div className="w-80 md:w-96 flex-shrink-0">
            <ConversationList 
                conversations={conversations} 
                activeId={activeId}
                onSelect={setActiveId}
            />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 min-w-0">
             <ChatWindow conversation={activeConversation} />
        </div>
    </div>
  );
};

export default MessagesPage;
