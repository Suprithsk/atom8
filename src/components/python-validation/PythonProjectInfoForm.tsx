interface PythonProjectInfoFormProps {
  skillType: string;
  projectName: string;
  customInstructions: string;
  onSkillTypeChange: (value: string) => void;
  onProjectNameChange: (value: string) => void;
  onCustomInstructionsChange: (value: string) => void;
}

export function PythonProjectInfoForm({
  skillType,
  projectName,
  customInstructions,
  onSkillTypeChange,
  onProjectNameChange,
  onCustomInstructionsChange,
}: PythonProjectInfoFormProps) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Information</h3>
      <div className="space-y-4">
        {/* Skill Type */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Skill Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={skillType}
            onChange={(e) => onSkillTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. GOLANG_API, FLASK_API, DJANGO_API"
          />
        </div>

        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. inventory-billing-system"
          />
        </div>

        {/* Custom Instructions */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Custom Instructions <span className="text-red-500">*</span>
          </label>
          <textarea
            value={customInstructions}
            onChange={(e) => onCustomInstructionsChange(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. Generate Python validation code following ValidateGoLangTemplate.py pattern with PostgreSQL validation"
          />
        </div>
      </div>
    </div>
  );
}
