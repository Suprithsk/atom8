import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../Button';
import { AnnotationForm } from './AnnotationForm';
import { ApiForm } from './ApiForm';
import type { TestCase, ValidationType, AnnotationTestCase, ApiTestCase, AnnotationCheck } from './types';

interface AddTestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testCase: TestCase) => void;
  editingTestCase?: TestCase | null;
}

function createEmptyAnnotation(): AnnotationTestCase {
  return {
    name: '',
    description: '',
    validationType: 'ANNOTATION',
    entityClassName: '',
    annotationChecks: [],
    marks: 0,
  };
}

function createEmptyApi(): ApiTestCase {
  return {
    name: '',
    description: '',
    validationType: 'API',
    endpoint: '',
    httpMethod: 'GET',
    expectedStatusCode: 200,
    marks: 0,
  };
}

export function AddTestCaseModal({ isOpen, onClose, onSave, editingTestCase }: AddTestCaseModalProps) {
  const [validationType, setValidationType] = useState<ValidationType>('ANNOTATION');
  const [testCase, setTestCase] = useState<TestCase>(createEmptyAnnotation());
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (editingTestCase) {
      setValidationType(editingTestCase.validationType);
      setTestCase({ ...editingTestCase });
    } else {
      setValidationType('ANNOTATION');
      setTestCase(createEmptyAnnotation());
    }
    setErrors([]);
  }, [editingTestCase, isOpen]);

  const handleTypeChange = (type: ValidationType) => {
    setValidationType(type);
    if (type === 'ANNOTATION') {
      setTestCase({
        ...createEmptyAnnotation(),
        name: testCase.name,
        description: testCase.description,
      });
    } else {
      setTestCase({
        ...createEmptyApi(),
        name: testCase.name,
        description: testCase.description,
      });
    }
    setErrors([]);
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!testCase.name.trim()) errs.push('Test case name is required.');
    if (!testCase.description.trim()) errs.push('Description is required.');
    if (testCase.marks <= 0) errs.push('Marks must be greater than 0.');

    if (testCase.validationType === 'ANNOTATION') {
      if (!testCase.entityClassName.trim()) errs.push('Entity class name is required.');
      if (testCase.annotationChecks.length === 0) errs.push('Add at least one annotation check.');
      testCase.annotationChecks.forEach((check, i) => {
        if (!check.annotationSimpleName.trim())
          errs.push(`Annotation check #${i + 1}: annotation name is required.`);
        if (!check.classLevel && !check.fieldName?.trim())
          errs.push(`Annotation check #${i + 1}: field name is required for field-level checks.`);
      });
    }

    if (testCase.validationType === 'API') {
      if (!testCase.endpoint.trim()) errs.push('Endpoint is required.');
    }

    return errs;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clean up the test case before saving
    const cleaned = { ...testCase };
    if (cleaned.validationType === 'ANNOTATION') {
      cleaned.annotationChecks = cleaned.annotationChecks.map((check) => {
        const c: AnnotationCheck = { annotationSimpleName: check.annotationSimpleName };
        if (check.classLevel) {
          c.classLevel = true;
        } else {
          c.fieldName = check.fieldName;
          if (check.alternativeAnnotations && check.alternativeAnnotations.length > 0) {
            c.alternativeAnnotations = check.alternativeAnnotations;
          }
        }
        return c;
      });
    }

    if (cleaned.validationType === 'API') {
      if (!cleaned.requestBody) delete cleaned.requestBody;
      if (!cleaned.expectedResponse) delete cleaned.expectedResponse;
      if (!cleaned.validateFields || cleaned.validateFields.length === 0) delete cleaned.validateFields;
      if (!cleaned.validateArrayNotEmpty) delete cleaned.validateArrayNotEmpty;
    }

    onSave(cleaned);
    setTestCase(createEmptyAnnotation());
    setValidationType('ANNOTATION');
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
          {/* Common Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Test Case Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={testCase.name}
                onChange={(e) => setTestCase({ ...testCase, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g. Validate Course Entity Annotations"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={testCase.description}
                onChange={(e) => setTestCase({ ...testCase, description: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g. Verify @Entity annotation on the Course entity class"
              />
            </div>
          </div>

          {/* Validation Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Validation Type <span className="text-red-500">*</span>
            </label>
            <select
              value={validationType}
              onChange={(e) => handleTypeChange(e.target.value as ValidationType)}
              disabled={!!editingTestCase}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="ANNOTATION">ANNOTATION — Entity & field annotations</option>
              <option value="API">API — REST endpoint testing</option>
            </select>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200" />

          {/* Type-specific form */}
          {validationType === 'ANNOTATION' ? (
            <AnnotationForm
              testCase={testCase as AnnotationTestCase}
              onChange={(updated) => setTestCase(updated)}
            />
          ) : (
            <ApiForm
              testCase={testCase as ApiTestCase}
              onChange={(updated) => setTestCase(updated)}
            />
          )}

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
