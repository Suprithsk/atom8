import { Plus } from 'lucide-react';
import { Button } from '../Button';
import { ConceptQuestionCard } from './ConceptQuestionCard';
import type { ConceptQuestion } from './types';

interface ConceptQuestionListProps {
  questions: ConceptQuestion[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export function ConceptQuestionList({ questions, onAdd, onEdit, onDelete }: ConceptQuestionListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Questions</h3>
          <p className="text-sm text-slate-500">
            {questions.length} question{questions.length !== 1 ? 's' : ''} added
            {questions.length > 0 && (
              <> · Total points: {questions.reduce((sum, q) => sum + q.points, 0)}</>
            )}
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={onAdd}>
          <Plus className="w-4 h-4" />
          Add Question
        </Button>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium">No questions yet</p>
          <p className="text-sm text-slate-400 mt-1">Click "Add Question" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q, index) => (
            <ConceptQuestionCard
              key={index}
              question={q}
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
