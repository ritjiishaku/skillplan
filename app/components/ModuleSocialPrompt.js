'use client';

import { useState } from 'react';
import { Icon } from '@/lib/icons';
import { generateModuleShareText } from '@/lib/completion';

export default function ModuleSocialPrompt({ module, phaseNumber, roadmapTitle }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = generateModuleShareText(module, phaseNumber, roadmapTitle);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="module-social-prompt">
      <p className="module-social-prompt-text">
        Module complete! Share what you learned about {module.title}
      </p>
      <button
        className={`module-social-prompt-btn ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
      >
        <Icon name={copied ? 'check' : 'copy'} size={12} />
        <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
      </button>
    </div>
  );
}
