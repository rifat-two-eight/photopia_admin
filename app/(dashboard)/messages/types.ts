export interface User {
    id: string;
    name: string;
    avatar: string; // URL or placeholder
    role: 'Provider' | 'User';
    status: 'Online' | 'Offline';
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isMe: boolean; // For easy styling of "My" messages
}

export interface Conversation {
    id: string;
    user: User;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount?: number;
    messages: Message[];
}
