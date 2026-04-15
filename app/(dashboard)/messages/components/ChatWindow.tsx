import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, Info, MoreVertical, Paperclip, Send, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chat, Message, SendMessageResponse } from '../types';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import Image from 'next/image';

const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace('/api/v1', '') || '';
  return `${baseUrl}${path}`;
};

interface ChatWindowProps {
  chat: Chat;
  messages: Message[];
  isLoading: boolean;
  onMessageSent: (message: Message) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat, messages, isLoading, onMessageSent }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const participant = chat.participants[0];

  // Auto-scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const sortedMessages = [...messages].sort((a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;

    try {
      setIsSending(true);
      const formData = new FormData();
      formData.append('chatId', chat._id);
      if (newMessage.trim()) {
        formData.append('text', newMessage);
      }
      if (selectedFile) {
        formData.append('images', selectedFile);
      }

      const response = await axiosInstance.post<SendMessageResponse>('/message', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        onMessageSent(response.data.data);
        setNewMessage('');
        removeFile();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-r-xl">
      {/* Header */}
      <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={getImageUrl(participant?.profile)} />
              <AvatarFallback>{participant?.name?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white
                ${chat.status ? 'bg-green-500' : 'bg-gray-400'}
              `} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">{participant?.name}</h2>
            <p className="text-xs text-gray-500">
              {chat.status ? 'Online' : 'Offline'}
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
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading messages...
          </div>
        ) : sortedMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No messages yet
          </div>
        ) : (
          <>
            {sortedMessages.map((msg) => {
              const isMe = msg.sender !== participant?._id;
              return (
                <div
                  key={msg._id}
                  className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] space-y-1`}>
                    <div
                      className={`p-3 text-sm leading-relaxed rounded-2xl
                              ${isMe
                          ? 'bg-[#1C1C1E] text-white rounded-tr-none'
                          : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                        }`}
                    >
                      {msg.image && (
                        <div className="mb-2">
                          <Image
                            src={getImageUrl(msg.image)}
                            alt="Sent image"
                            width={300}
                            height={300}
                            className="rounded-lg max-w-full h-auto object-cover max-h-[300px]"
                            onError={(e) => {
                              if (msg.image) {
                                console.error('Image load failed:', getImageUrl(msg.image));
                              }
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      {msg.text}
                    </div>

                    <div className={`flex items-center gap-1 text-[10px] text-gray-400 
                              ${isMe ? 'justify-end' : 'justify-start'}
                          `}>
                      <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {isMe && <span>{msg.seen ? '✓✓' : '✓'}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <div className="px-4 py-2 border-t border-gray-100 bg-white flex items-center gap-4">
          <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={removeFile}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="text-xs text-gray-500 truncate max-w-[200px]">{selectedFile?.name}</p>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-gray-600 shrink-0"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending}
        >
          <Paperclip className="w-5 h-5" />
        </Button>
        <div className="flex-1 relative">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="pr-10 border-gray-200 focus-visible:ring-black"
            disabled={isSending}
          />
        </div>
        <Button
          onClick={handleSendMessage}
          disabled={isSending || (!newMessage.trim() && !selectedFile)}
          className="bg-[#9CA3AF] hover:bg-gray-600 text-white rounded-md w-10 h-10 p-0 shadow-none shrink-0"
        >
          <Send className="w-4 h-4 transform -rotate-45 ml-1" />
        </Button>
      </div>
    </div>
  );
};
