import { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';
import { Button } from '../Button';
import type { CloudValidationConfig } from './types';

interface AwsJsonPreviewProps {
  config: CloudValidationConfig;
  onClose: () => void;
}

export function AwsJsonPreview({ config, onClose }: AwsJsonPreviewProps) {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(config, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 shrink-0">
          <h2 className="text-xl font-bold text-slate-900">Generated JSON</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-sm font-mono overflow-x-auto whitespace-pre leading-relaxed">
            {jsonString}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 shrink-0">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
