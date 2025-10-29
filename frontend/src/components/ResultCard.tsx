import React from "react";
import { Copy, Check, ExternalLink, BarChart3 } from "lucide-react";
import { UrlData } from "../types";
import { useClipboard } from "../hooks/useClipboard";
import { formatDate, truncateUrl } from "../utils/helpers";

interface ResultCardProps {
  data: UrlData;
}

/**
 * Display shortened URL result with copy functionality
 */
const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  const { isCopied, copy } = useClipboard();

  const handleCopy = () => {
    copy(data.shortUrl);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-slide-up">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        {/* Success Banner */}
        <div className="bg-green-900/30 border-b border-green-700 px-6 py-4">
          <div className="flex items-center space-x-2 text-green-300">
            <Check className="w-5 h-5" />
            <span className="font-semibold">URL Shortened Successfully!</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Original URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Original URL
            </label>
            <div className="flex items-center space-x-2 text-gray-200 bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-700">
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
              <span className="break-all text-sm">
                {truncateUrl(data.originalUrl, 80)}
              </span>
            </div>
          </div>

          {/* Short URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Shortened URL
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={data.shortUrl}
                readOnly
                className="flex-1 px-4 py-3 text-primary-300 font-semibold bg-primary-900/30 border border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
              />
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                title="Copy to clipboard"
              >
                {isCopied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span className="hidden sm:inline">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div className="bg-gray-900/50 border border-gray-700 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2 text-gray-400 mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-medium">Clicks</span>
              </div>
              <p className="text-2xl font-bold text-gray-100">{data.clicks}</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 px-4 py-3 rounded-lg">
              <div className="text-xs font-medium text-gray-400 mb-1">
                Created
              </div>
              <p className="text-sm font-semibold text-gray-100">
                {formatDate(data.createdAt)}
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 px-4 py-3 rounded-lg">
              <div className="text-xs font-medium text-gray-400 mb-1">
                Expires
              </div>
              <p className="text-sm font-semibold text-gray-100">
                {data.expiresAt ? formatDate(data.expiresAt) : "Never"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
