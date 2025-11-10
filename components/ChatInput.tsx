import React from 'react';

interface ChatInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  isRecording: boolean;
  onToggleRecording: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  text, 
  onTextChange, 
  onSendMessage, 
  isLoading,
  isRecording,
  onToggleRecording
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200 flex items-center gap-3">
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اسألني أي شيء..."
        disabled={isLoading}
        rows={1}
        className="flex-1 p-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-all duration-200 disabled:bg-gray-100"
      />
      <button
        type="button"
        onClick={onToggleRecording}
        disabled={isLoading}
        className={`w-14 h-14 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500 hover:bg-green-600'}`}
        aria-label={isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل الصوتي'}
      >
        <i className="fas fa-microphone text-xl"></i>
      </button>
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-110"
      >
        <i className="fas fa-paper-plane text-xl"></i>
      </button>
    </form>
  );
};

export default ChatInput;