import React from 'react';
import { Role } from '../types';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  const userStyles = 'bg-blue-500 text-white self-end rounded-bl-none';
  const modelStyles = 'bg-white text-gray-800 self-start rounded-br-none border border-gray-200';

  const avatar = isUser ? (
    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center order-2">
      <i className="fas fa-child text-blue-600 text-xl"></i>
    </div>
  ) : (
    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center order-1">
      <i className="fas fa-robot text-white text-xl"></i>
    </div>
  );

  return (
    <div className={`flex items-end gap-3 max-w-lg ${isUser ? 'self-end' : 'self-start'} animate-bubble-in`}>
      {!isUser && avatar}
      <div
        className={`p-4 rounded-2xl shadow-md ${isUser ? userStyles : modelStyles}`}
        style={{ direction: 'rtl' }}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
      {isUser && avatar}
    </div>
  );
};

export default MessageBubble;