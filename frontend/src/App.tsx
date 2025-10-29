import React, { useState } from "react";
import Header from "./components/Header";
import UrlForm from "./components/UrlForm";
import ResultCard from "./components/ResultCard";
import { UrlData } from "./types";

/**
 * Main App Component
 */
const App: React.FC = () => {
  const [shortenedUrl, setShortenedUrl] = useState<UrlData | null>(null);

  const handleUrlShortened = (data: UrlData) => {
    setShortenedUrl(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Simplify Your Links
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Create short, memorable links that are easy to share. Track clicks
            and manage your URLs with our fast and reliable service.
          </p>
        </div>

        {/* URL Form */}
        <UrlForm onUrlShortened={handleUrlShortened} />

        {/* Result Card */}
        {shortenedUrl && <ResultCard data={shortenedUrl} />}

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-300">
              Generate short URLs in milliseconds with our optimized
              infrastructure
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Analytics Tracking
            </h3>
            <p className="text-gray-300">
              Monitor click counts and track your link performance in real-time
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-300">
              Your links are stored securely with enterprise-grade
              infrastructure
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-400 text-sm">
            © 2025 URL Shortener. Built with React, TypeScript, and MongoDB.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
