import { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Target,
  CheckCheck,
  MessageSquare,
  Github,
  Clock,
} from 'lucide-react';
import { Button } from '../Button';
import type { ConceptValidationResponse } from './types';

interface EvaluationResultsModalProps {
  response: ConceptValidationResponse;
  onClose: () => void;
}

export function EvaluationResultsModal({ response, onClose }: EvaluationResultsModalProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const { summary, questionResults, githubResult } = response;
  const allPassed = summary.overallResult === 'PASS';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-violet-50 to-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Evaluation Results</h2>
              <p className="text-sm text-slate-500">{response.assessmentId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {allPassed ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                All Tests Passed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                <XCircle className="w-4 h-4" />
                Some Tests Failed
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 shrink-0">
          <div className="grid grid-cols-5 gap-3">
            <StatBox label="TOTAL TESTS" value={summary.totalQuestions} color="text-blue-600" bg="bg-blue-50" border="border-blue-200" />
            <StatBox label="PASSED" value={summary.passedQuestions} color="text-green-600" bg="bg-green-50" border="border-green-200" />
            <StatBox label="FAILED" value={summary.failedQuestions} color="text-red-500" bg="bg-red-50" border="border-red-200" />
            <StatBox label="ERRORED" value={0} color="text-amber-500" bg="bg-amber-50" border="border-amber-200" />
            <div className="flex flex-col items-center justify-center border border-slate-200 bg-white rounded-lg p-3">
              <span className="text-xl font-bold text-slate-900">
                {summary.totalMarksObtained}/{summary.totalMarksPossible}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">TOTAL MARKS</span>
            </div>
          </div>
        </div>

        {/* Question Results */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-slate-100">
            {questionResults.map((qr, idx) => {
              const passed = qr.status === 'PASS';
              const expanded = expandedIds.has(qr.questionId);
              return (
                <div key={qr.questionId} className="group">
                  {/* Collapsed row */}
                  <button
                    onClick={() => toggleExpand(qr.questionId)}
                    className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    {passed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                    <span className="text-sm font-medium text-slate-800 flex-1">
                      Testcase {idx + 1}: {qr.description}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {passed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {passed ? 'Passed' : 'Failed'}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                      ★ {qr.marksObtained}/{qr.maxMarks} marks
                    </span>
                    {expanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {/* Expanded details */}
                  {expanded && (
                    <div className="px-6 pb-5 pt-1 bg-slate-50/50 space-y-3 border-t border-slate-100">
                      {/* Expected */}
                      <div className="flex gap-3">
                        <div className="flex items-start gap-2 w-28 shrink-0 pt-0.5">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-semibold text-blue-700">Expected:</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{qr.expectedAnswer}</p>
                      </div>

                      {/* Actual */}
                      <div className="flex gap-3">
                        <div className="flex items-start gap-2 w-28 shrink-0 pt-0.5">
                          <CheckCheck className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-semibold text-green-700">Actual:</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{qr.actualAnswer}</p>
                      </div>

                      {/* Comments / Feedback */}
                      <div className="flex gap-3">
                        <div className="flex items-start gap-2 w-28 shrink-0 pt-0.5">
                          <MessageSquare className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-semibold text-slate-700">Comments:</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{qr.feedback}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(response.validatedAt).toLocaleString()}
            </span>
            <span>•</span>
            <span>{(response.processingTimeMs / 1000).toFixed(1)}s</span>
          </div>
          <div className="flex items-center gap-3">
            {githubResult?.pushed && githubResult.fileUrl && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open(githubResult.fileUrl, '_blank', 'noopener,noreferrer')}
              >
                <Github className="w-4 h-4" />
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

/* Small stat box used in the summary row */
function StatBox({
  label,
  value,
  color,
  bg,
  border,
}: {
  label: string;
  value: number;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center border ${border} ${bg} rounded-lg p-3`}>
      <span className={`text-xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}
