import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../Button';
import type { ConceptQuestion } from './types';

interface ConceptAddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: ConceptQuestion) => void;
  editingQuestion?: ConceptQuestion | null;
}

function createEmpty(): ConceptQuestion {
  return {
    id: '',
    description: '',
    points: 0,
    questionType: 'text-only',
    question: '',
    keyConcepts: [],
    expectedAnswer: '',
  };
}

export function ConceptAddQuestionModal({ isOpen, onClose, onSave, editingQuestion }: ConceptAddQuestionModalProps) {
  const [formData, setFormData] = useState<ConceptQuestion>(createEmpty());
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (editingQuestion) {
      setFormData({ ...editingQuestion });
    } else {
      setFormData(createEmpty());
    }
    setErrors([]);
  }, [editingQuestion, isOpen]);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!formData.id.trim()) errs.push('Question ID is required.');
    if (!formData.description.trim()) errs.push('Description is required.');
    if (formData.points <= 0) errs.push('Points must be greater than 0.');
    if (!formData.questionType.trim()) errs.push('Question type is required.');
    if (!formData.question.trim()) errs.push('Question text is required.');
    if (!formData.expectedAnswer.trim()) errs.push('Expected answer is required.');
    if (formData.questionType === 'text-and-diagram') {
      if (!formData.textWeight || !formData.diagramWeight) {
        errs.push('Text weight and diagram weight are required for text-and-diagram type.');
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

    const cleaned: ConceptQuestion = {
      id: formData.id.trim(),
      description: formData.description.trim(),
      points: formData.points,
      questionType: formData.questionType.trim(),
      question: formData.question.trim(),
      keyConcepts: formData.keyConcepts,
      expectedAnswer: formData.expectedAnswer.trim(),
    };

    if (formData.scenario?.trim()) {
      cleaned.scenario = formData.scenario.trim();
    }

    if (formData.questionType === 'text-and-diagram') {
      cleaned.textWeight = formData.textWeight;
      cleaned.diagramWeight = formData.diagramWeight;
      if (formData.diagramCriteria && formData.diagramCriteria.length > 0) {
        cleaned.diagramCriteria = formData.diagramCriteria;
      }
    }

    onSave(cleaned);
    setFormData(createEmpty());
    setErrors([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 shrink-0">
          <h2 className="text-xl font-bold text-slate-900">
            {editingQuestion ? 'Edit Question' : 'Add Question'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* ID & Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Question ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g. Q1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Points <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.points || ''}
                onChange={(e) => setFormData({ ...formData, points: e.target.value === '' ? 0 : parseInt(e.target.value) })}
                min={0}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g. 10"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Architecture Selection (Client-Server and Layered Architecture)"
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Question Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.questionType}
              onChange={(e) => setFormData({ ...formData, questionType: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. text-only, text-and-diagram"
            />
          </div>

          {/* Scenario */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Scenario <span className="text-slate-400">(optional)</span>
            </label>
            <textarea
              value={formData.scenario || ''}
              onChange={(e) => setFormData({ ...formData, scenario: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. You are hired as a Software Architect for a mid-size airline company..."
            />
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Question <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. a) Propose a high-level architecture... b) Identify each layer..."
            />
          </div>

          {/* Key Concepts */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Key Concepts <span className="text-slate-400">(comma-separated)</span> <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.keyConcepts.join(', ')}
              onChange={(e) => {
                const concepts = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                setFormData({ ...formData, keyConcepts: concepts });
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. client-server architecture, layered architecture, separation of concerns"
            />
          </div>

          {/* Expected Answer */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Expected Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.expectedAnswer}
              onChange={(e) => setFormData({ ...formData, expectedAnswer: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="The expected answer content..."
            />
          </div>

          {/* Text & Diagram Weights (shown when questionType contains 'diagram') */}
          {formData.questionType.toLowerCase().includes('diagram') && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Text Weight (%)
                  </label>
                  <input
                    type="number"
                    value={formData.textWeight || ''}
                    onChange={(e) => setFormData({ ...formData, textWeight: e.target.value === '' ? undefined : parseInt(e.target.value) })}
                    min={0}
                    max={100}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g. 70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Diagram Weight (%)
                  </label>
                  <input
                    type="number"
                    value={formData.diagramWeight || ''}
                    onChange={(e) => setFormData({ ...formData, diagramWeight: e.target.value === '' ? undefined : parseInt(e.target.value) })}
                    min={0}
                    max={100}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g. 30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Diagram Criteria <span className="text-slate-400">(comma-separated, optional)</span>
                </label>
                <input
                  type="text"
                  value={(formData.diagramCriteria || []).join(', ')}
                  onChange={(e) => {
                    const criteria = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                    setFormData({ ...formData, diagramCriteria: criteria.length > 0 ? criteria : undefined });
                  }}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g. Presentation Layer at top, Business Layer in second position"
                />
              </div>
            </>
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
            {editingQuestion ? 'Update Question' : 'Add Question'}
          </Button>
        </div>
      </div>
    </div>
  );
}
