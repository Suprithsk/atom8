import { Pencil, Trash2, FileText, Hash } from 'lucide-react';
import type { ConceptQuestion } from './types';

interface ConceptQuestionCardProps {
  question: ConceptQuestion;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function ConceptQuestionCard({ question, index, onEdit, onDelete }: ConceptQuestionCardProps) {
  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
              {question.id}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              <FileText className="w-3 h-3" />
              {question.questionType}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <Hash className="w-3 h-3" />
              {question.points} points
            </span>
          </div>

          {/* Description */}
          <h4 className="font-semibold text-slate-900 truncate">{question.description}</h4>
          <p className="text-sm text-slate-500 line-clamp-2 mt-0.5">{question.question}</p>

          {/* Key Concepts */}
          {question.keyConcepts.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {question.keyConcepts.slice(0, 4).map((concept, i) => (
                <span key={i} className="text-xs bg-slate-50 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                  {concept}
                </span>
              ))}
              {question.keyConcepts.length > 4 && (
                <span className="text-xs text-slate-400">+{question.keyConcepts.length - 4} more</span>
              )}
            </div>
          )}

          {/* Weights for text-and-diagram */}
          {question.questionType === 'text-and-diagram' && (
            <div className="mt-2 flex gap-2">
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                Text: {question.textWeight}%
              </span>
              <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">
                Diagram: {question.diagramWeight}%
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(index)}
            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(index)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
