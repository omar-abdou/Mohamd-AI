import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { Role } from '../types';
import { SUGGESTED_PROMPTS } from '../constants';
import { chatSession } from '../services/geminiService';
import Header from './Header';
import ChatWindow from './ChatWindow';
import PromptSuggestions from './PromptSuggestions';
import ChatInput from './ChatInput';

interface ChatScreenProps {
  onNavigateHome: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigateHome }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!window.isSecureContext) {
      console.warn("خاصية التعرف على الصوت قد لا تعمل على اتصال غير آمن (HTTP). يرجى استخدام HTTPS.");
    }
      
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("خاصية التعرف على الصوت غير مدعومة في هذا المتصفح.");
      setError("عذراً، خاصية الإدخال الصوتي غير مدعومة في هذا المتصفح.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ar-SA';

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = (event: any) => {
      console.error('حدث خطأ في التعرف على الصوت:', event.error);
      setError('حدث خطأ في الميكروفون. تأكد من أنك أعطيت الإذن اللازم.');
      setIsRecording(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      setInputText(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) return;
    try {
      if (isRecording) {
        recognitionRef.current.stop();
      } else {
        setInputText('');
        setError(null);
        recognitionRef.current.start();
      }
    } catch (err) {
        console.error('فشل في بدء أو إيقاف التعرف على الصوت:', err);
        setError('حدث خطأ في الميكروفون. تأكد من إعطاء الإذن اللازم وأنك تستخدم اتصال HTTPS.');
        setIsRecording(false);
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    const userMessage: Message = { role: Role.USER, text };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input only if the message sent is from the input box
    if (text === inputText) {
        setInputText('');
    }

    try {
      const result = await chatSession.sendMessage({ message: text });
      const modelMessage: Message = { role: Role.MODEL, text: result.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = 'عذراً، حدث خطأ ما. حاول مرة أخرى.';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: Role.MODEL, text: errorMessage }]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <Header showBackButton onBack={onNavigateHome} />
      <ChatWindow messages={messages} isLoading={isLoading} />
      {messages.length === 0 && !isLoading && (
        <PromptSuggestions suggestions={SUGGESTED_PROMPTS} onSelect={sendMessage} />
      )}
      {error && <div className="text-center text-red-500 p-2 mx-4 border border-red-200 bg-red-50 rounded-md">{error}</div>}
      <ChatInput 
          text={inputText}
          onTextChange={setInputText}
          onSendMessage={sendMessage} 
          isLoading={isLoading}
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
      />
    </div>
  );
};

export default ChatScreen;
