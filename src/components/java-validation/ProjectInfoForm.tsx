interface ProjectInfoFormProps {
  projectName: string;
  packageName: string;
  onProjectNameChange: (value: string) => void;
  onPackageNameChange: (value: string) => void;
}

export function ProjectInfoForm({
  projectName,
  packageName,
  onProjectNameChange,
  onPackageNameChange,
}: ProjectInfoFormProps) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. course-enrollment-system"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Package Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => onPackageNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g. courseenrol"
          />
        </div>
      </div>
    </div>
  );
}
