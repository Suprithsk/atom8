import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../Button';
import type { CloudTestCase, CloudProvider } from './types';
import { getResourceTypeLabel } from './types';

interface AwsAddTestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testCase: CloudTestCase) => void;
  editingTestCase?: CloudTestCase | null;
  cloudProvider: CloudProvider;
}

function createEmpty(): CloudTestCase {
  return {
    name: '',
    description: '',
    resourceType: '',
    marks: 0,
  };
}

export function AwsAddTestCaseModal({ isOpen, onClose, onSave, editingTestCase, cloudProvider }: AwsAddTestCaseModalProps) {
  const [testCase, setTestCase] = useState<CloudTestCase>(createEmpty());
  const [errors, setErrors] = useState<string[]>([]);

  const resourceLabel = getResourceTypeLabel(cloudProvider);

  useEffect(() => {
    if (editingTestCase) {
      setTestCase({ ...editingTestCase });
    } else {
      setTestCase(createEmpty());
    }
    setErrors([]);
  }, [editingTestCase, isOpen]);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!testCase.name.trim()) errs.push('Test case name is required.');
    if (!testCase.description.trim()) errs.push('Description is required.');
    if (!testCase.resourceType.trim()) errs.push(`${resourceLabel} is required.`);
    if (testCase.marks <= 0) errs.push('Marks must be greater than 0.');
    return errs;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const cleaned: CloudTestCase = {
      name: testCase.name.trim(),
      description: testCase.description.trim(),
      resourceType: testCase.resourceType.trim(),
      marks: testCase.marks,
    };

    if (testCase.hints?.trim()) {
      cleaned.hints = testCase.hints.trim();
    }

    onSave(cleaned);
    setTestCase(createEmpty());
    setErrors([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 shrink-0">
          <h2 className="text-xl font-bold text-slate-900">
            {editingTestCase ? 'Edit Test Case' : 'Add Test Case'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Test Case Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={testCase.name}
              onChange={(e) => setTestCase({ ...testCase, name: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Check Lambda Post Role Policies"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={testCase.description}
              onChange={(e) => setTestCase({ ...testCase, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Verify that the lambda-post-role IAM role exists and has AWSStepFunctionsFullAccess policy attached"
            />
          </div>

          {/* Resource Type */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              {resourceLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={testCase.resourceType}
              onChange={(e) => setTestCase({ ...testCase, resourceType: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. IAM_ROLE, LAMBDA_FUNCTION, CLOUD_RUN"
            />
          </div>

          {/* Marks */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Marks <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={testCase.marks || ''}
              onChange={(e) =>
                setTestCase({ ...testCase, marks: e.target.value === '' ? 0 : parseInt(e.target.value) })
              }
              min={0}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. 10"
            />
          </div>

          {/* Hints */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Hints <span className="text-slate-400">(optional)</span>
            </label>
            <input
              type="text"
              value={testCase.hints || ''}
              onChange={(e) => setTestCase({ ...testCase, hints: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Use check_if_all_policies_are_attached_to_role helper method"
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <ul className="text-red-700 text-sm space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>• {err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 shrink-0">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            {editingTestCase ? 'Update Test Case' : 'Add Test Case'}
          </Button>
        </div>
      </div>
    </div>
  );
}
