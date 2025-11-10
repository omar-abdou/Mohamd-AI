import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'chat'>('home');

  return (
    <div className="bg-gradient-to-br from-blue-100 to-yellow-100 min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[95vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
        {screen === 'home' ? (
          <HomeScreen onStartChat={() => setScreen('chat')} />
        ) : (
          <ChatScreen onNavigateHome={() => setScreen('home')} />
        )}
      </div>
    </div>
  );
};

export default App;
