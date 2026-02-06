interface ConceptProjectInfoFormProps {
  assessmentId: string;
  assessmentTitle: string;
  userAnswersPath: string;
  defaultMaxMarks: number;
  repoName: string;
  onAssessmentIdChange: (value: string) => void;
  onAssessmentTitleChange: (value: string) => void;
  onUserAnswersPathChange: (value: string) => void;
  onDefaultMaxMarksChange: (value: number) => void;
  onRepoNameChange: (value: string) => void;
}

export function ConceptProjectInfoForm({
  assessmentId,
  assessmentTitle,
  userAnswersPath,
  defaultMaxMarks,
  repoName,
  onAssessmentIdChange,
  onAssessmentTitleChange,
  onUserAnswersPathChange,
  onDefaultMaxMarksChange,
  onRepoNameChange,
}: ConceptProjectInfoFormProps) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Assessment Information</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Assessment ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={assessmentId}
              onChange={(e) => onAssessmentIdChange(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. software-arch-002"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Assessment Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={assessmentTitle}
              onChange={(e) => onAssessmentTitleChange(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Software Architecture Assessment"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            User Answers Path <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={userAnswersPath}
            onChange={(e) => onUserAnswersPathChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. C:/Users/.../assessment.docx"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Default Max Marks <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={defaultMaxMarks || ''}
              onChange={(e) => onDefaultMaxMarksChange(e.target.value === '' ? 0 : parseInt(e.target.value))}
              min={0}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. 10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              GitHub Repo Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => onRepoNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. validation-results"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
