import { Pencil, Trash2, Tag, Globe, Hash } from 'lucide-react';
import type { TestCase } from './types';

interface TestCaseCardProps {
  testCase: TestCase;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function TestCaseCard({ testCase, index, onEdit, onDelete }: TestCaseCardProps) {
  const isAnnotation = testCase.validationType === 'ANNOTATION';

  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                isAnnotation
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {isAnnotation ? (
                <Tag className="w-3 h-3" />
              ) : (
                <Globe className="w-3 h-3" />
              )}
              {testCase.validationType}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <Hash className="w-3 h-3" />
              {testCase.marks} marks
            </span>
          </div>

          {/* Name & Description */}
          <h4 className="font-semibold text-slate-900 truncate">{testCase.name}</h4>
          <p className="text-sm text-slate-500 truncate">{testCase.description}</p>

          {/* Key Details */}
          <div className="mt-2 flex flex-wrap gap-2">
            {isAnnotation && (
              <>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                  {testCase.entityClassName.split('.').pop()}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                  {testCase.annotationChecks.length} check(s)
                </span>
              </>
            )}
            {!isAnnotation && (
              <>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono">
                  {testCase.httpMethod} {testCase.endpoint}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                  Status: {testCase.expectedStatusCode}
                </span>
              </>
            )}
          </div>
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
