import { Plus } from 'lucide-react';
import { Button } from '../Button';
import { TestCaseCard } from './TestCaseCard';
import type { TestCase } from './types';

interface TestCaseListProps {
  testCases: TestCase[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function TestCaseList({ testCases, onAdd, onEdit, onDelete }: TestCaseListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Test Cases</h3>
          <p className="text-sm text-slate-500">
            {testCases.length} test case{testCases.length !== 1 ? 's' : ''} added
            {testCases.length > 0 && (
              <> · Total marks: {testCases.reduce((sum, tc) => sum + tc.marks, 0)}</>
            )}
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={onAdd}>
          <Plus className="w-4 h-4" />
          Add Test Case
        </Button>
      </div>

      {testCases.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium">No test cases yet</p>
          <p className="text-sm text-slate-400 mt-1">Click "Add Test Case" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testCases.map((tc, index) => (
            <TestCaseCard
              key={index}
              testCase={tc}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
