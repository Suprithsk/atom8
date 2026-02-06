import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '../Button';
import type { PythonTestCase, HttpMethod } from './types';

interface PythonAddTestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testCase: PythonTestCase) => void;
  editingTestCase?: PythonTestCase | null;
  existingTestCaseNames: string[];
}

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

function createEmpty(): PythonTestCase {
  return {
    name: '',
    description: '',
    endpoint: '',
    httpMethod: 'GET',
    expectedStatusCode: 200,
    marks: 0,
  };
}

export function PythonAddTestCaseModal({
  isOpen,
  onClose,
  onSave,
  editingTestCase,
  existingTestCaseNames,
}: PythonAddTestCaseModalProps) {
  const [testCase, setTestCase] = useState<PythonTestCase>(createEmpty());
  const [errors, setErrors] = useState<string[]>([]);
  const [exampleInputStr, setExampleInputStr] = useState('');
  const [exampleOutputStr, setExampleOutputStr] = useState('');
  const [statusCodeStr, setStatusCodeStr] = useState('200');
  const [marksStr, setMarksStr] = useState('');

  useEffect(() => {
    if (editingTestCase) {
      setTestCase({ ...editingTestCase });
      setExampleInputStr(editingTestCase.exampleInput ? JSON.stringify(editingTestCase.exampleInput, null, 2) : '');
      setExampleOutputStr(editingTestCase.exampleOutput ? JSON.stringify(editingTestCase.exampleOutput, null, 2) : '');
      setStatusCodeStr(String(editingTestCase.expectedStatusCode));
      setMarksStr(editingTestCase.marks > 0 ? String(editingTestCase.marks) : '');
    } else {
      setTestCase(createEmpty());
      setExampleInputStr('');
      setExampleOutputStr('');
      setStatusCodeStr('200');
      setMarksStr('');
    }
    setErrors([]);
  }, [editingTestCase, isOpen]);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!testCase.name.trim()) errs.push('Test case name is required.');
    if (!testCase.description.trim()) errs.push('Description is required.');
    if (!testCase.endpoint.trim()) errs.push('Endpoint is required.');
    if (!statusCodeStr.trim() || parseInt(statusCodeStr) <= 0) errs.push('Expected status code is required.');
    if (!marksStr.trim() || parseInt(marksStr) <= 0) errs.push('Marks must be greater than 0.');

    if (exampleInputStr.trim()) {
      try {
        JSON.parse(exampleInputStr);
      } catch {
        errs.push('Example Input must be valid JSON.');
      }
    }
    if (exampleOutputStr.trim()) {
      try {
        JSON.parse(exampleOutputStr);
      } catch {
        errs.push('Example Output must be valid JSON.');
      }
    }

    return errs;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const cleaned: PythonTestCase = {
      name: testCase.name.trim(),
      description: testCase.description.trim(),
      endpoint: testCase.endpoint.trim(),
      httpMethod: testCase.httpMethod,
      expectedStatusCode: parseInt(statusCodeStr) || 200,
      marks: parseInt(marksStr) || 0,
    };

    if (exampleInputStr.trim()) {
      cleaned.exampleInput = JSON.parse(exampleInputStr);
    }
    if (exampleOutputStr.trim()) {
      cleaned.exampleOutput = JSON.parse(exampleOutputStr);
    }
    if (testCase.tableName?.trim()) {
      cleaned.tableName = testCase.tableName.trim();
    }
    if (testCase.dependsOn && testCase.dependsOn.length > 0) {
      cleaned.dependsOn = testCase.dependsOn.filter((d) => d.trim() !== '');
    }

    onSave(cleaned);
    setTestCase(createEmpty());
    setExampleInputStr('');
    setExampleOutputStr('');
    setStatusCodeStr('200');
    setMarksStr('');
    setErrors([]);
  };

  const handleAddDependency = () => {
    setTestCase({
      ...testCase,
      dependsOn: [...(testCase.dependsOn || []), ''],
    });
  };

  const handleRemoveDependency = (index: number) => {
    setTestCase({
      ...testCase,
      dependsOn: (testCase.dependsOn || []).filter((_, i) => i !== index),
    });
  };

  const handleDependencyChange = (index: number, value: string) => {
    const updated = [...(testCase.dependsOn || [])];
    updated[index] = value;
    setTestCase({ ...testCase, dependsOn: updated });
  };

  if (!isOpen) return null;

  // Filter out current test case name from dependency options
  const dependencyOptions = existingTestCaseNames.filter((n) => n !== editingTestCase?.name);

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
              placeholder="e.g. Check for successful product creation"
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
              rows={2}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Verify POST /api/products creates product and stores in PostgreSQL"
            />
          </div>

          {/* Endpoint + HTTP Method */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Endpoint <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={testCase.endpoint}
                onChange={(e) => setTestCase({ ...testCase, endpoint: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g. /api/products/{id}"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                HTTP Method <span className="text-red-500">*</span>
              </label>
              <select
                value={testCase.httpMethod}
                onChange={(e) => setTestCase({ ...testCase, httpMethod: e.target.value as HttpMethod })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {HTTP_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Expected Status Code + Marks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Expected Status Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={statusCodeStr}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9]/g, '');
                  setStatusCodeStr(v);
                }}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g. 200, 201"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Marks <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={marksStr}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9]/g, '');
                  setMarksStr(v);
                }}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g. 10"
              />
            </div>
          </div>

          {/* Table Name */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Table Name <span className="text-slate-400">(optional)</span>
            </label>
            <input
              type="text"
              value={testCase.tableName || ''}
              onChange={(e) => setTestCase({ ...testCase, tableName: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. products, customers, billing"
            />
          </div>

          {/* Example Input */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Example Input (JSON) <span className="text-slate-400">(optional)</span>
            </label>
            <textarea
              value={exampleInputStr}
              onChange={(e) => setExampleInputStr(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
              placeholder='{"name": "Laptop", "price": 999, "quantity": 50}'
            />
          </div>

          {/* Example Output */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Example Output (JSON) <span className="text-slate-400">(optional)</span>
            </label>
            <textarea
              value={exampleOutputStr}
              onChange={(e) => setExampleOutputStr(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
              placeholder='{"id": 1, "name": "Laptop", "price": 999}'
            />
          </div>

          {/* Depends On */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-900">
                Depends On <span className="text-slate-400">(optional)</span>
              </label>
              <button
                type="button"
                onClick={handleAddDependency}
                className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add dependency
              </button>
            </div>
            {(testCase.dependsOn || []).length > 0 ? (
              <div className="space-y-2">
                {(testCase.dependsOn || []).map((dep, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {dependencyOptions.length > 0 ? (
                      <select
                        value={dep}
                        onChange={(e) => handleDependencyChange(idx, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
                      >
                        <option value="">Select a test case...</option>
                        {dependencyOptions.map((name) => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={dep}
                        onChange={(e) => handleDependencyChange(idx, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="Test case name"
                      />
                    )}
                    <button
                      onClick={() => handleRemoveDependency(idx)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No dependencies added</p>
            )}
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
