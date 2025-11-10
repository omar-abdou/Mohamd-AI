import React from 'react';
import Header from './Header';

interface HomeScreenProps {
  onStartChat: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartChat }) => {
    const handleComingSoon = () => {
        alert('هذه الميزة ستكون متاحة قريباً!');
    };

    return (
        <div className="h-full flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-8 bg-blue-50 text-center overflow-y-auto">
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8 animate-bubble-in">
                    <h2 className="text-3xl font-bold text-blue-800 mb-2">أهلاً بك يا محمد!</h2>
                    <p className="text-gray-600">مستعد لاكتشافات واختراعات جديدة اليوم؟</p>
                </div>
                <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                     <button
                        onClick={onStartChat}
                        className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-3"
                    >
                        <i className="fas fa-comments"></i>
                        <span>هيا نبتكر!</span>
                    </button>
                    <button
                        onClick={handleComingSoon}
                        className="bg-yellow-500 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-3"
                    >
                        <i className="fas fa-flask"></i>
                        <span>تجربة اليوم</span>
                    </button>
                    <button
                        onClick={handleComingSoon}
                        className="bg-purple-500 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-3"
                    >
                        <i className="fas fa-video"></i>
                        <span>مكتبة الفيديو</span>
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-8">
                    تذكر: لا تشارك بياناتك الشخصية — اسأل وليّ أمرك.
                </p>
            </main>
        </div>
    );
};

export default HomeScreen;
