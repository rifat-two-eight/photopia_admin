export interface Participant {
    _id: string;
    name: string;
    profile: string;
    updatedAt: string;
}

export interface Chat {
    _id: string;
    participants: Participant[];
    status: boolean;
    updatedAt: string;
    unreadCount: number;
}

export interface Message {
    _id: string;
    chatId: string;
    sender: string;
    text: string;
    image: string | null;
    seen: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ChatResponse {
    success: boolean;
    message: string;
    data: {
        chats: Chat[];
        totalUnreadChats: number;
    };
}

export interface MessageResponse {
    success: boolean;
    message: string;
    data: Message[];
}

export interface SendMessageResponse {
    success: boolean;
    message: string;
    data: Message;
}

// For UI use
export interface Conversation {
    id: string;
    user: {
        id: string;
        name: string;
        avatar: string;
        status: 'Online' | 'Offline';
    };
    lastMessageTime: string;
    unreadCount: number;
    messages: Message[];
}
