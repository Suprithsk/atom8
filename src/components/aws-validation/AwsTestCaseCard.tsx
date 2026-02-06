import { Pencil, Trash2, Cloud, Hash } from 'lucide-react';
import type { CloudTestCase, CloudProvider } from './types';
import { getResourceTypeLabel } from './types';

interface AwsTestCaseCardProps {
  testCase: CloudTestCase;
  index: number;
  cloudProvider: CloudProvider;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function AwsTestCaseCard({ testCase, index, cloudProvider, onEdit, onDelete }: AwsTestCaseCardProps) {

  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
              title={getResourceTypeLabel(cloudProvider)}
            >
              <Cloud className="w-3 h-3" />
              {testCase.resourceType}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <Hash className="w-3 h-3" />
              {testCase.marks} marks
            </span>
          </div>

          {/* Name & Description */}
          <h4 className="font-semibold text-slate-900 truncate">{testCase.name}</h4>
          <p className="text-sm text-slate-500 line-clamp-2">{testCase.description}</p>

          {/* Hints */}
          {testCase.hints && (
            <div className="mt-2">
              <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded">
                Hint: {testCase.hints}
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
