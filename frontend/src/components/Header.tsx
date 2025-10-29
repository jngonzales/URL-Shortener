import React from 'react';
import { Link2, Sparkles } from 'lucide-react';

/**
 * Header component with branding
 */
const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <Link2 className="w-8 h-8 text-white" />
            <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            URL Shortener
          </h1>
        </div>
        <p className="text-center text-primary-100 mt-2 text-sm">
          Transform long URLs into short, shareable links
        </p>
      </div>
    </header>
  );
};

export default Header;
