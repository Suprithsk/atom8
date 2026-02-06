import { useState } from 'react';
import type { ApiTestCase, HttpMethod } from './types';

interface ApiFormProps {
  testCase: ApiTestCase;
  onChange: (updated: ApiTestCase) => void;
}

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export function ApiForm({ testCase, onChange }: ApiFormProps) {
  const [requestBodyError, setRequestBodyError] = useState('');
  const [expectedResponseError, setExpectedResponseError] = useState('');

  const handleRequestBodyChange = (value: string) => {
    if (!value.trim()) {
      setRequestBodyError('');
      onChange({ ...testCase, requestBody: undefined });
      return;
    }
    try {
      const parsed = JSON.parse(value);
      setRequestBodyError('');
      onChange({ ...testCase, requestBody: parsed });
    } catch {
      setRequestBodyError('Invalid JSON format');
    }
  };

  const handleExpectedResponseChange = (value: string) => {
    if (!value.trim()) {
      setExpectedResponseError('');
      onChange({ ...testCase, expectedResponse: undefined });
      return;
    }
    try {
      const parsed = JSON.parse(value);
      setExpectedResponseError('');
      onChange({ ...testCase, expectedResponse: parsed });
    } catch {
      setExpectedResponseError('Invalid JSON format');
    }
  };

  return (
    <div className="space-y-4">
      {/* Endpoint */}
      <div>
        <label className="block text-sm font-medium text-slate-900 mb-2">
          Endpoint <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={testCase.endpoint}
          onChange={(e) => onChange({ ...testCase, endpoint: e.target.value })}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. /api/courses"
        />
      </div>

      {/* HTTP Method & Status Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            HTTP Method <span className="text-red-500">*</span>
          </label>
          <select
            value={testCase.httpMethod}
            onChange={(e) => onChange({ ...testCase, httpMethod: e.target.value as HttpMethod })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            {HTTP_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Expected Status Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={testCase.expectedStatusCode || ''}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9]/g, '');
              onChange({ ...testCase, expectedStatusCode: v === '' ? 0 : parseInt(v) });
            }}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. 200, 201"
          />
        </div>
      </div>

      {/* Request Body */}
      <div>
        <label className="block text-sm font-medium text-slate-900 mb-2">
          Request Body <span className="text-slate-400">(JSON, optional)</span>
        </label>
        <textarea
          defaultValue={testCase.requestBody ? JSON.stringify(testCase.requestBody, null, 2) : ''}
          onBlur={(e) => handleRequestBodyChange(e.target.value)}
          rows={5}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm ${
            requestBodyError ? 'border-red-400 bg-red-50' : 'border-slate-300'
          }`}
          placeholder='{\n  "name": "Java Programming",\n  "instructor": "John Doe"\n}'
        />
        {requestBodyError && (
          <p className="text-red-500 text-xs mt-1">{requestBodyError}</p>
        )}
      </div>

      {/* Expected Response */}
      <div>
        <label className="block text-sm font-medium text-slate-900 mb-2">
          Expected Response <span className="text-slate-400">(JSON, optional)</span>
        </label>
        <textarea
          defaultValue={
            testCase.expectedResponse ? JSON.stringify(testCase.expectedResponse, null, 2) : ''
          }
          onBlur={(e) => handleExpectedResponseChange(e.target.value)}
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm ${
            expectedResponseError ? 'border-red-400 bg-red-50' : 'border-slate-300'
          }`}
          placeholder='{\n  "name": "Java Programming"\n}'
        />
        {expectedResponseError && (
          <p className="text-red-500 text-xs mt-1">{expectedResponseError}</p>
        )}
      </div>

      {/* Validate Fields */}
      <div>
        <label className="block text-sm font-medium text-slate-900 mb-2">
          Validate Fields <span className="text-slate-400">(comma-separated, optional)</span>
        </label>
        <input
          type="text"
          value={(testCase.validateFields || []).join(', ')}
          onChange={(e) => {
            const fields = e.target.value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);
            onChange({ ...testCase, validateFields: fields.length > 0 ? fields : undefined });
          }}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. id, name, instructor"
        />
      </div>

      {/* Validate Array Not Empty */}
      <div className="flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={testCase.validateArrayNotEmpty || false}
            onChange={(e) => onChange({ ...testCase, validateArrayNotEmpty: e.target.checked || undefined })}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
        <span className="text-sm text-slate-700">Validate array is not empty</span>
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
          placeholder="e.g. 10"
        />
      </div>
    </div>
  );
}
