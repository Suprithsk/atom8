import { useState, useEffect } from 'react';
import { ArrowLeft, Code2, FileJson, Send, FileCode2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { ProjectInfoForm } from './ProjectInfoForm';
import { TestCaseList } from './TestCaseList';
import { AddTestCaseModal } from './AddTestCaseModal';
import { JsonPreview } from './JsonPreview';
import { SubmitLoadingOverlay } from './SubmitLoadingOverlay';
import { CodeResponseModal } from './CodeResponseModal';
import type { GenerateCodeResponse } from './CodeResponseModal';
import type { TestCase, JavaValidationConfig } from './types';

const API_URL = 'http://localhost:8080/api/v1/hands-on/generate-code';
const STORAGE_KEY = 'atom8_java_validation_last_response';

export function JavaValidationPage() {
  const navigate = useNavigate();

  // Project info
  const [projectName, setProjectName] = useState('');
  const [packageName, setPackageName] = useState('');

  // Test cases
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // JSON preview
  const [showJson, setShowJson] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  // API submission
  const [submitting, setSubmitting] = useState(false);
  const [codeResponse, setCodeResponse] = useState<GenerateCodeResponse | null>(null);
  const [savedResponse, setSavedResponse] = useState<GenerateCodeResponse | null>(null);

  // Load last response from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedResponse(JSON.parse(stored));
    } catch { /* ignore corrupt data */ }
  }, []);

  const handleAddTestCase = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleEditTestCase = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteTestCase = (index: number) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveTestCase = (tc: TestCase) => {
    if (editingIndex !== null) {
      setTestCases((prev) => prev.map((existing, i) => (i === editingIndex ? tc : existing)));
    } else {
      setTestCases((prev) => [...prev, tc]);
    }
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!projectName.trim()) errs.push('Project name is required.');
    if (!packageName.trim()) errs.push('Package name is required.');
    if (testCases.length === 0) errs.push('Add at least one test case.');
    return errs;
  };

  const handleGenerateJson = () => {
    const errs = validate();
    if (errs.length > 0) {
      setSubmitErrors(errs);
      return;
    }
    setSubmitErrors([]);
    setShowJson(true);
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (errs.length > 0) {
      setSubmitErrors(errs);
      return;
    }

    setSubmitErrors([]);
    setSubmitting(true);
    setCodeResponse(null);

    try {
      const config = buildConfig();
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
      }

      const data: GenerateCodeResponse = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Code generation failed.');
      }

      setCodeResponse(data);
      // Persist to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedResponse(data);
    } catch (err) {
      setSubmitErrors([err instanceof Error ? err.message : 'Failed to submit. Please try again.']);
    } finally {
      setSubmitting(false);
    }
  };

  const buildConfig = (): JavaValidationConfig => ({
    skillType: 'SPRING_BOOT_API',
    projectName,
    packageName,
    testcases: testCases,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-40 shadow-xs">
        <div className="container-tight px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900">Java Validation</span>
              <span className="hidden sm:inline text-sm text-slate-400 ml-2">Spring Boot API</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container-tight px-4 md:px-6 py-8 space-y-6">
        {/* Submit Errors */}
        {submitErrors.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <ul className="text-red-700 text-sm space-y-1">
              {submitErrors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Project Info */}
        <ProjectInfoForm
          projectName={projectName}
          packageName={packageName}
          onProjectNameChange={setProjectName}
          onPackageNameChange={setPackageName}
        />

        {/* Test Cases */}
        <div className="card p-6">
          <TestCaseList
            testCases={testCases}
            onAdd={handleAddTestCase}
            onEdit={handleEditTestCase}
            onDelete={handleDeleteTestCase}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="md" onClick={handleGenerateJson}>
            <FileJson className="w-4 h-4" />
            Generate JSON
          </Button>
          <Button variant="primary" size="md" onClick={handleSubmit} disabled={submitting}>
            <Send className="w-4 h-4" />
            Submit
          </Button>
        </div>

        {/* Last Response */}
        {savedResponse && !codeResponse && (
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setCodeResponse(savedResponse)}
              className="bg-primary-50 border border-primary-200 rounded-lg px-4 py-4 text-left hover:bg-primary-100 transition-colors"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <FileCode2 className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-bold text-primary-700">Last Response</span>
              </div>
              <p className="text-sm text-slate-700 truncate">{savedResponse.fileName}</p>
              <p className="text-xs text-slate-400 mt-1">{new Date(savedResponse.generatedAt).toLocaleString()}</p>
            </button>
          </div>
        )}

        <div className="pb-4" />
      </main>

      {/* Modals */}
      <AddTestCaseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        onSave={handleSaveTestCase}
        editingTestCase={editingIndex !== null ? testCases[editingIndex] : null}
      />

      {showJson && (
        <JsonPreview config={buildConfig()} onClose={() => setShowJson(false)} />
      )}

      {/* Loading Overlay */}
      {submitting && <SubmitLoadingOverlay />}

      {/* Code Response Modal */}
      {codeResponse && (
        <CodeResponseModal
          response={codeResponse}
          onClose={() => setCodeResponse(null)}
        />
      )}
    </div>
  );
}
