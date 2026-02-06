import { Pencil, Trash2, Globe, Hash, Database, Link } from 'lucide-react';
import type { PythonTestCase } from './types';

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-emerald-100 text-emerald-700',
  POST: 'bg-blue-100 text-blue-700',
  PUT: 'bg-amber-100 text-amber-700',
  DELETE: 'bg-red-100 text-red-700',
  PATCH: 'bg-purple-100 text-purple-700',
};

interface PythonTestCaseCardProps {
  testCase: PythonTestCase;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function PythonTestCaseCard({ testCase, index, onEdit, onDelete }: PythonTestCaseCardProps) {
  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Header badges */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${METHOD_COLORS[testCase.httpMethod] || 'bg-slate-100 text-slate-700'}`}
            >
              <Globe className="w-3 h-3" />
              {testCase.httpMethod}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <Hash className="w-3 h-3" />
              {testCase.marks} marks
            </span>
            {testCase.tableName && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                <Database className="w-3 h-3" />
                {testCase.tableName}
              </span>
            )}
          </div>

          {/* Name & Description */}
          <h4 className="font-semibold text-slate-900 truncate">{testCase.name}</h4>
          <p className="text-sm text-slate-500 line-clamp-2">{testCase.description}</p>

          {/* Endpoint + Status */}
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono">
              {testCase.endpoint}
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
              Status: {testCase.expectedStatusCode}
            </span>
          </div>

          {/* Dependencies */}
          {testCase.dependsOn && testCase.dependsOn.length > 0 && (
            <div className="mt-2 flex items-center gap-1 flex-wrap">
              <Link className="w-3 h-3 text-slate-400" />
              {testCase.dependsOn.map((dep, i) => (
                <span
                  key={i}
                  className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded"
                >
                  {dep}
                </span>
              ))}
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
