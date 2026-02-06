import { useState } from 'react';
import { Copy, Check, X, ExternalLink, FileCode2, Github, Clock, Cpu } from 'lucide-react';
import { Button } from '../Button';

export interface GenerateCodeResponse {
  success: boolean;
  message: string;
  generatedCode: string;
  fileName: string;
  skillType: string;
  llmModel: string;
  gitHubPushed: boolean;
  repoUrl: string;
  fileUrl: string;
  gitHubMessage: string;
  generatedAt: string;
}

interface CodeResponseModalProps {
  response: GenerateCodeResponse;
  onClose: () => void;
}

export function CodeResponseModal({ response, onClose }: CodeResponseModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response.generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenGitHub = () => {
    window.open(response.fileUrl, '_blank', 'noopener,noreferrer');
  };

  const formattedDate = new Date(response.generatedAt).toLocaleString();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-primary-50 to-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <FileCode2 className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Generated Code</h2>
              <p className="text-sm text-slate-500">{response.fileName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meta badges */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            <Cpu className="w-3 h-3" />
            {response.llmModel}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium">
            {response.skillType}
          </span>
          {response.gitHubPushed && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              <Github className="w-3 h-3" />
              Pushed to GitHub
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            {formattedDate}
          </span>
        </div>

        {/* Code Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="relative group">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white rounded-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="bg-slate-900 text-slate-100 rounded-lg p-5 text-[13px] font-mono overflow-x-auto whitespace-pre leading-relaxed max-h-[50vh]">
              {response.generatedCode}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 bg-white shrink-0">
          <p className="text-sm text-slate-500 truncate hidden sm:block">
            {response.message}
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Code
                </>
              )}
            </Button>
            {response.fileUrl && (
              <Button variant="primary" size="sm" onClick={handleOpenGitHub}>
                <ExternalLink className="w-4 h-4" />
                View on GitHub
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
