import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Chat } from '../types';

const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace('/api/v1', '') || '';
  return `${baseUrl}${path}`;
};

interface ConversationListProps {
  chats: Chat[];
  activeId: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  chats,
  activeId,
  onSelect,
  isLoading
}) => {
  // Sort chats by updatedAt in descending order (newest update at top)
  const sortedChats = [...chats].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-l-xl border-r border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading chats...</div>
        ) : sortedChats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No chats found</div>
        ) : (
          sortedChats.map((chat) => {
            const participant = chat.participants[0]; // Assuming one participant for now
            return (
              <div
                key={chat._id}
                onClick={() => onSelect(chat._id)}
                className={`p-4 flex items-start gap-3 cursor-pointer transition-colors border-b border-gray-50
                  ${activeId === chat._id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}
                `}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={getImageUrl(participant?.profile)} />
                    <AvatarFallback>{participant?.name?.charAt(0) || '?'}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${chat.status ? 'bg-green-500' : 'bg-gray-400'}
                  `} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{participant?.name}</h3>
                    <span className="text-xs text-gray-400">
                      {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-600 truncate pr-2">
                      {chat.unreadCount > 0 ? `${chat.unreadCount} unread messages` : 'No new messages'}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
