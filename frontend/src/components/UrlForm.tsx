import React, { useState } from "react";
import { Link, Loader2 } from "lucide-react";
import { shortenUrl } from "../utils/api";
import { isValidUrl } from "../utils/helpers";
import { UrlData } from "../types";

interface UrlFormProps {
  onUrlShortened: (data: UrlData) => void;
}

/**
 * URL input form component
 */
const UrlForm: React.FC<UrlFormProps> = ({ onUrlShortened }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate URL
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (http:// or https://)");
      return;
    }

    setLoading(true);

    try {
      const response = await shortenUrl({ url });

      if (response.success && response.data) {
        onUrlShortened(response.data);
        setUrl("");
      } else {
        setError(response.error || "Failed to shorten URL");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            className="w-full pl-12 pr-4 py-4 bg-gray-800/70 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg animate-slide-up backdrop-blur-sm">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Shortening...</span>
            </>
          ) : (
            <span>Shorten URL</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default UrlForm;
