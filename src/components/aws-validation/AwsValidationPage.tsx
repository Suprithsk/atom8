import { useState, useEffect } from 'react';
import { ArrowLeft, Cloud, FileJson, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { AwsProjectInfoForm } from './AwsProjectInfoForm';
import { AwsTestCaseList } from './AwsTestCaseList';
import { AwsAddTestCaseModal } from './AwsAddTestCaseModal';
import { AwsJsonPreview } from './AwsJsonPreview';
import { SubmitLoadingOverlay } from '../java-validation/SubmitLoadingOverlay';
import { CodeResponseModal } from '../java-validation/CodeResponseModal';
import type { GenerateCodeResponse } from '../java-validation/CodeResponseModal';
import type { CloudTestCase, CloudProvider, CloudValidationConfig } from './types';
import { getSkillType, buildOutputTestCase } from './types';

const API_URL = 'http://localhost:8080/api/v1/hands-on/generate-code';

const STORAGE_KEYS: Record<CloudProvider, string> = {
  AWS: 'atom8_cloud_aws_last_response',
  GCP: 'atom8_cloud_gcp_last_response',
  AZURE: 'atom8_cloud_azure_last_response',
};

const PROVIDER_COLORS: Record<CloudProvider, { bg: string; text: string; border: string; badge: string }> = {
  AWS: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', badge: 'bg-orange-100' },
  GCP: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-100' },
  AZURE: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', badge: 'bg-sky-100' },
};

function loadSavedResponse(provider: CloudProvider): GenerateCodeResponse | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS[provider]);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AwsValidationPage() {
  const navigate = useNavigate();

  // Project info
  const [cloudProvider, setCloudProvider] = useState<CloudProvider>('AWS');
  const [projectName, setProjectName] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');

  // Test cases
  const [testCases, setTestCases] = useState<CloudTestCase[]>([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // JSON preview
  const [showJson, setShowJson] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  // API submission
  const [submitting, setSubmitting] = useState(false);
  const [codeResponse, setCodeResponse] = useState<GenerateCodeResponse | null>(null);

  // Saved responses per provider
  const [savedResponses, setSavedResponses] = useState<Record<CloudProvider, GenerateCodeResponse | null>>({
    AWS: null,
    GCP: null,
    AZURE: null,
  });

  // Load all saved responses from localStorage on mount
  useEffect(() => {
    setSavedResponses({
      AWS: loadSavedResponse('AWS'),
      GCP: loadSavedResponse('GCP'),
      AZURE: loadSavedResponse('AZURE'),
    });
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

  const handleSaveTestCase = (tc: CloudTestCase) => {
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
    if (cloudProvider === 'AWS' && !customInstructions.trim()) errs.push('Custom instructions is required.');
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

      // Persist to localStorage for current provider
      localStorage.setItem(STORAGE_KEYS[cloudProvider], JSON.stringify(data));
      setSavedResponses((prev) => ({ ...prev, [cloudProvider]: data }));
    } catch (err) {
      setSubmitErrors([err instanceof Error ? err.message : 'Failed to submit. Please try again.']);
    } finally {
      setSubmitting(false);
    }
  };

  const buildConfig = (): CloudValidationConfig => {
    const config: CloudValidationConfig = {
      skillType: getSkillType(cloudProvider),
      projectName,
      testcases: testCases.map((tc) => buildOutputTestCase(tc, cloudProvider)),
    };
    if (cloudProvider === 'AWS') {
      config.customInstructions = customInstructions;
    }
    return config;
  };

  // Providers that have saved responses (for the "Last Response" cards)
  const providersWithResponses = (['AWS', 'GCP', 'AZURE'] as CloudProvider[]).filter(
    (p) => savedResponses[p] !== null,
  );

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
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900">Cloud Validation</span>
              <span className="hidden sm:inline text-sm text-slate-400 ml-2">{cloudProvider}</span>
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
        <AwsProjectInfoForm
          projectName={projectName}
          customInstructions={customInstructions}
          cloudProvider={cloudProvider}
          onProjectNameChange={setProjectName}
          onCustomInstructionsChange={setCustomInstructions}
          onCloudProviderChange={setCloudProvider}
        />

        {/* Test Cases */}
        <div className="card p-6">
          <AwsTestCaseList
            testCases={testCases}
            cloudProvider={cloudProvider}
            onAdd={handleAddTestCase}
            onEdit={handleEditTestCase}
            onDelete={handleDeleteTestCase}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          <Button variant="primary" size="md" onClick={handleSubmit} disabled={submitting}>
            <Send className="w-4 h-4" />
            Submit
          </Button>
        </div>

        {/* Last Responses per Provider */}
        {providersWithResponses.length > 0 && !codeResponse && (
          <div className="grid grid-cols-3 gap-3">
            {(['AWS', 'GCP', 'AZURE'] as CloudProvider[]).map((provider) => {
              const saved = savedResponses[provider];
              if (!saved) return null;
              const colors = PROVIDER_COLORS[provider];
              return (
                <button
                  key={provider}
                  onClick={() => setCodeResponse(saved)}
                  className={`${colors.bg} ${colors.border} border rounded-lg px-4 py-4 text-left hover:shadow-sm transition-colors`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Cloud className="w-4 h-4" />
                    <span className={`text-sm font-bold ${colors.text}`}>{provider}</span>
                  </div>
                  <p className="text-sm text-slate-700 truncate">{saved.fileName}</p>
                  <p className="text-xs text-slate-400 mt-1">{new Date(saved.generatedAt).toLocaleString()}</p>
                </button>
              );
            })}
          </div>
        )}

        <div className="pb-4" />
      </main>

      {/* Modals */}
      <AwsAddTestCaseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        onSave={handleSaveTestCase}
        editingTestCase={editingIndex !== null ? testCases[editingIndex] : null}
        cloudProvider={cloudProvider}
      />

      {showJson && (
        <AwsJsonPreview config={buildConfig()} onClose={() => setShowJson(false)} />
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
