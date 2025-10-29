import { useState } from 'react';
import { copyToClipboard } from '../utils/helpers';

/**
 * Custom hook for clipboard operations with toast notifications
 */
export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string): Promise<boolean> => {
    const success = await copyToClipboard(text);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
    return success;
  };

  return { isCopied, copy };
};
