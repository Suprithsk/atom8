export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface PythonTestCase {
  name: string;
  description: string;
  endpoint: string;
  httpMethod: HttpMethod;
  expectedStatusCode: number;
  marks: number;
  exampleInput?: Record<string, unknown>;
  exampleOutput?: Record<string, unknown>;
  tableName?: string;
  dependsOn?: string[];
}

export interface PythonValidationConfig {
  skillType: string;
  projectName: string;
  customInstructions: string;
  testcases: PythonTestCase[];
}
