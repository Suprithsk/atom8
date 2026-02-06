export type CloudProvider = 'AWS' | 'GCP' | 'AZURE';

export interface CloudTestCase {
  name: string;
  description: string;
  resourceType: string;
  marks: number;
  hints?: string;
}

export interface CloudValidationConfig {
  skillType: string;
  projectName: string;
  customInstructions?: string;
  testcases: Record<string, unknown>[];
}

/* — helpers — */

const SKILL_TYPE_MAP: Record<CloudProvider, string> = {
  AWS: 'CLOUD_AWS',
  GCP: 'CLOUD_GCP',
  AZURE: 'CLOUD_AZURE',
};

const RESOURCE_KEY_MAP: Record<CloudProvider, string> = {
  AWS: 'awsResourceType',
  GCP: 'gcpResourceType',
  AZURE: 'azureResourceType',
};

export function getSkillType(provider: CloudProvider): string {
  return SKILL_TYPE_MAP[provider];
}

export function getResourceTypeKey(provider: CloudProvider): string {
  return RESOURCE_KEY_MAP[provider];
}

export function getResourceTypeLabel(provider: CloudProvider): string {
  return `${provider} Resource Type`;
}

export function buildOutputTestCase(
  tc: CloudTestCase,
  provider: CloudProvider,
): Record<string, unknown> {
  const out: Record<string, unknown> = {
    name: tc.name,
    description: tc.description,
    [getResourceTypeKey(provider)]: tc.resourceType,
    marks: tc.marks,
  };
  if (tc.hints) out.hints = tc.hints;
  return out;
}
