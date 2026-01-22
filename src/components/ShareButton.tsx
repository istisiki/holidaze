import { useState } from 'react';
import type { Holiday } from '../types/holiday';
import { generateShareUrl } from '../utils/urlShare';
import './ShareButton.css';

interface ShareButtonProps {
  holidays: Holiday[];
}

export function ShareButton({ holidays }: ShareButtonProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  );

  const handleShare = async () => {
    const url = generateShareUrl(holidays);

    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const isDisabled = holidays.length === 0;

  return (
    <button
      className="share-button"
      onClick={handleShare}
      disabled={isDisabled}
      title={isDisabled ? 'Add holidays to share' : 'Copy shareable link'}
    >
      {copyStatus === 'copied'
        ? 'Copied!'
        : copyStatus === 'error'
          ? 'Failed'
          : 'Share'}
    </button>
  );
}
