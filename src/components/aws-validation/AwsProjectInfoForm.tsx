import type { CloudProvider } from './types';

interface AwsProjectInfoFormProps {
  projectName: string;
  customInstructions: string;
  cloudProvider: CloudProvider;
  onProjectNameChange: (value: string) => void;
  onCustomInstructionsChange: (value: string) => void;
  onCloudProviderChange: (value: CloudProvider) => void;
}

export function AwsProjectInfoForm({
  projectName,
  customInstructions,
  cloudProvider,
  onProjectNameChange,
  onCustomInstructionsChange,
  onCloudProviderChange,
}: AwsProjectInfoFormProps) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Information</h3>
      <div className="space-y-4">
        {/* Cloud Provider */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Cloud Provider <span className="text-red-500">*</span>
          </label>
          <select
            value={cloudProvider}
            onChange={(e) => onCloudProviderChange(e.target.value as CloudProvider)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="AWS">AWS</option>
            <option value="GCP">GCP</option>
            <option value="AZURE">Azure</option>
          </select>
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
            placeholder="e.g. orders-serverless-app"
          />
        </div>

        {/* Custom Instructions — AWS only */}
        {cloudProvider === 'AWS' && (
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Custom Instructions <span className="text-red-500">*</span>
            </label>
            <textarea
              value={customInstructions}
              onChange={(e) => onCustomInstructionsChange(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Generate Python validation code following ValidationTemplateAws.py pattern with boto3"
            />
          </div>
        )}
      </div>
    </div>
  );
}
