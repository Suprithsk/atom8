import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, FileJson, Send, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { ConceptProjectInfoForm } from './ConceptProjectInfoForm';
import { ConceptQuestionList } from './ConceptQuestionList';
import { ConceptAddQuestionModal } from './ConceptAddQuestionModal';
import { ConceptJsonPreview } from './ConceptJsonPreview';
import { SubmitLoadingOverlay } from '../java-validation/SubmitLoadingOverlay';
import { EvaluationResultsModal } from './EvaluationResultsModal';
import type { ConceptQuestion, ConceptValidationConfig, ConceptValidationResponse } from './types';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/concept/validate-full`;
const STORAGE_KEY = 'atom8_concept_validation_last_response';

export function ConceptValidationPage() {
  const navigate = useNavigate();

  // Assessment info
  const [assessmentId, setAssessmentId] = useState('');
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [userAnswersPath, setUserAnswersPath] = useState('');
  const [defaultMaxMarks, setDefaultMaxMarks] = useState(10);
  const [repoName, setRepoName] = useState('');

  // Questions
  const [questions, setQuestions] = useState<ConceptQuestion[]>([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // JSON preview
  const [showJson, setShowJson] = useState(false);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  // API submission
  const [submitting, setSubmitting] = useState(false);
  const [evalResponse, setEvalResponse] = useState<ConceptValidationResponse | null>(null);
  const [savedResponse, setSavedResponse] = useState<ConceptValidationResponse | null>(null);

  // Load last response from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedResponse(JSON.parse(stored));
    } catch { /* ignore corrupt data */ }
  }, []);

  const handleAddQuestion = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveQuestion = (q: ConceptQuestion) => {
    if (editingIndex !== null) {
      setQuestions((prev) => prev.map((existing, i) => (i === editingIndex ? q : existing)));
    } else {
      setQuestions((prev) => [...prev, q]);
    }
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!assessmentId.trim()) errs.push('Assessment ID is required.');
    if (!assessmentTitle.trim()) errs.push('Assessment title is required.');
    if (!userAnswersPath.trim()) errs.push('User answers path is required.');
    if (defaultMaxMarks <= 0) errs.push('Default max marks must be greater than 0.');
    if (!repoName.trim()) errs.push('GitHub repo name is required.');
    if (questions.length === 0) errs.push('Add at least one question.');
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
    setEvalResponse(null);

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

      const data: ConceptValidationResponse = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Validation failed.');
      }

      setEvalResponse(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedResponse(data);
    } catch (err) {
      setSubmitErrors([err instanceof Error ? err.message : 'Failed to submit. Please try again.']);
    } finally {
      setSubmitting(false);
    }
  };

  const buildConfig = (): ConceptValidationConfig => ({
    assessmentId,
    assessmentTitle,
    userAnswersPath,
    defaultMaxMarks,
    githubConfig: { repoName },
    questions,
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
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900">Concept-Based Validation</span>
              <span className="hidden sm:inline text-sm text-slate-400 ml-2">Assessment</span>
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

        {/* Assessment Info */}
        <ConceptProjectInfoForm
          assessmentId={assessmentId}
          assessmentTitle={assessmentTitle}
          userAnswersPath={userAnswersPath}
          defaultMaxMarks={defaultMaxMarks}
          repoName={repoName}
          onAssessmentIdChange={setAssessmentId}
          onAssessmentTitleChange={setAssessmentTitle}
          onUserAnswersPathChange={setUserAnswersPath}
          onDefaultMaxMarksChange={setDefaultMaxMarks}
          onRepoNameChange={setRepoName}
        />

        {/* Questions */}
        <div className="card p-6">
          <ConceptQuestionList
            questions={questions}
            onAdd={handleAddQuestion}
            onEdit={handleEditQuestion}
            onDelete={handleDeleteQuestion}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          <Button variant="primary" size="md" onClick={handleSubmit} disabled={submitting}>
            <Send className="w-4 h-4" />
            Submit
          </Button>
        </div>

        {/* Last Response */}
        {savedResponse && !evalResponse && (
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setEvalResponse(savedResponse)}
              className="bg-violet-50 border border-violet-200 rounded-lg px-4 py-4 text-left hover:bg-violet-100 transition-colors"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <ClipboardCheck className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-bold text-violet-700">Last Result</span>
              </div>
              <p className="text-sm text-slate-700 truncate">
                {savedResponse.summary.totalMarksObtained}/{savedResponse.summary.totalMarksPossible} marks
              </p>
              <p className="text-xs text-slate-400 mt-1">{new Date(savedResponse.validatedAt).toLocaleString()}</p>
            </button>
          </div>
        )}

        <div className="pb-4" />
      </main>

      {/* Modals */}
      <ConceptAddQuestionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        onSave={handleSaveQuestion}
        editingQuestion={editingIndex !== null ? questions[editingIndex] : null}
      />

      {showJson && (
        <ConceptJsonPreview config={buildConfig()} onClose={() => setShowJson(false)} />
      )}

      {/* Loading Overlay */}
      {submitting && <SubmitLoadingOverlay />}

      {/* Evaluation Results Modal */}
      {evalResponse && (
        <EvaluationResultsModal
          response={evalResponse}
          onClose={() => setEvalResponse(null)}
        />
      )}
    </div>
  );
}
