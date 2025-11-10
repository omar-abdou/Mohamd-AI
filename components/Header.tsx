import React from 'react';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false, onBack }) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 flex items-center justify-between shadow-md z-10 shrink-0">
      <div className="w-10 text-left">
        <button className="text-white text-xl hover:text-yellow-300 transition-colors" aria-label="الإعدادات">
            <i className="fas fa-cog"></i>
        </button>
      </div>
      <div className="flex items-center text-center">
        <i className="fas fa-lightbulb text-yellow-300 text-3xl ml-3 animate-pulse"></i>
        <h1 className="text-2xl font-bold">المخترع الصغير محمد</h1>
      </div>
      <div className="w-10 text-right">
        {showBackButton && onBack && (
          <button onClick={onBack} className="text-white text-xl hover:text-yellow-300 transition-colors" aria-label="رجوع">
            <i className="fas fa-arrow-right"></i>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
