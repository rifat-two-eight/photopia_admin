import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation } from '../types';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations, 
  activeId, 
  onSelect 
}) => {
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
        {conversations.map((conv) => (
          <div 
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`p-4 flex items-start gap-3 cursor-pointer transition-colors border-b border-gray-50
              ${activeId === conv.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}
            `}
          >
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={conv.user.avatar} />
                <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                ${conv.user.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}
              `} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{conv.user.name}</h3>
                <span className="text-xs text-gray-400">{conv.lastMessageTime}</span>
              </div>
              <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-600 truncate pr-2">{conv.lastMessage}</p>
                  {conv.unreadCount && conv.unreadCount > 0 && (
                      <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                          {conv.unreadCount}
                      </span>
                  )}
              </div>
              <p className="text-xs text-gray-400 mt-1">{conv.user.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
