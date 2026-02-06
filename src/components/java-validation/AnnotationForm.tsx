import { Plus } from 'lucide-react';
import { Button } from '../Button';
import { AnnotationCheckItem } from './AnnotationCheckItem';
import type { AnnotationTestCase, AnnotationCheck } from './types';

interface AnnotationFormProps {
  testCase: AnnotationTestCase;
  onChange: (updated: AnnotationTestCase) => void;
}

export function AnnotationForm({ testCase, onChange }: AnnotationFormProps) {
  const handleAddCheck = () => {
    onChange({
      ...testCase,
      annotationChecks: [
        ...testCase.annotationChecks,
        { annotationSimpleName: '' },
      ],
    });
  };

  const handleCheckChange = (index: number, updated: AnnotationCheck) => {
    const checks = [...testCase.annotationChecks];
    checks[index] = updated;
    onChange({ ...testCase, annotationChecks: checks });
  };

  const handleCheckRemove = (index: number) => {
    onChange({
      ...testCase,
      annotationChecks: testCase.annotationChecks.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      {/* Entity Class Name */}
      <div>
        <label className="block text-sm font-medium text-slate-900 mb-2">
          Entity Class Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={testCase.entityClassName}
          onChange={(e) => onChange({ ...testCase, entityClassName: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. com.coursemanagement.courseservice.entity.Course"
        />
      </div>

      {/* Annotation Checks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-slate-900">
            Annotation Checks
          </label>
          <Button variant="ghost" size="sm" onClick={handleAddCheck}>
            <Plus className="w-4 h-4" />
            Add Check
          </Button>
        </div>

        {testCase.annotationChecks.length === 0 ? (
          <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <p className="text-sm text-slate-500">No annotation checks added yet.</p>
            <button
              type="button"
              onClick={handleAddCheck}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-1"
            >
              Add your first check
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {testCase.annotationChecks.map((check, index) => (
              <AnnotationCheckItem
                key={index}
                check={check}
                index={index}
                onChange={handleCheckChange}
                onRemove={handleCheckRemove}
              />
            ))}
          </div>
        )}
      </div>

      {/* Marks */}
      <div>
        <label className="block text-sm font-medium text-slate-900 mb-2">
          Marks <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={testCase.marks || ''}
          onChange={(e) => onChange({ ...testCase, marks: e.target.value === '' ? 0 : parseInt(e.target.value) })}
          min={0}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. 6"
        />
      </div>
    </div>
  );
}
