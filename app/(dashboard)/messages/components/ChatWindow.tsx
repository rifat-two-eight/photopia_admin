import React, { useState } from 'react';
import { Phone, Video, Info, MoreVertical, Paperclip, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Conversation } from '../types';

interface ChatWindowProps {
  conversation: Conversation;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ conversation }) => {
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="flex flex-col h-full bg-white rounded-r-xl">
      {/* Header */}
      <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={conversation.user.avatar} />
              <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white
                ${conversation.user.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}
              `} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">{conversation.user.name}</h2>
            <p className="text-xs text-gray-500">
                {conversation.user.status} • {conversation.user.role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                <Info className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-4 h-4" />
            </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
        {conversation.messages.map((msg) => (
            <div 
                key={msg.id} 
                className={`flex w-full ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
                <div className={`max-w-[70%] space-y-1`}>
                    <div 
                        className={`p-3 text-sm leading-relaxed rounded-2xl
                        ${msg.isMe 
                            ? 'bg-[#1C1C1E] text-white rounded-tr-none' 
                            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                        }`}
                    >
                        {msg.text}
                    </div>
                    
                    <div className={`flex items-center gap-1 text-[10px] text-gray-400 
                        ${msg.isMe ? 'justify-end' : 'justify-start'}
                    `}>
                        <span>{msg.timestamp}</span>
                        {msg.isMe && <span>✓✓</span>}
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
         <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 shrink-0">
            <Paperclip className="w-5 h-5" />
         </Button>
         <div className="flex-1 relative">
            <Input 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="pr-10 border-gray-200 focus-visible:ring-black"
            />
         </div>
         <Button 
            className="bg-[#9CA3AF] hover:bg-gray-600 text-white rounded-md w-10 h-10 p-0 shadow-none shrink-0"
            // matching the screenshot icon style which is a bit simpler grey button
         >
            <Send className="w-4 h-4 transform -rotate-45 ml-1" />
         </Button>
      </div>
    </div>
  );
};
