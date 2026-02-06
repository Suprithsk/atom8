export type ValidationType = 'ANNOTATION' | 'API';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface AnnotationCheck {
  classLevel?: boolean;
  fieldName?: string;
  annotationSimpleName: string;
  alternativeAnnotations?: string[];
}

export interface AnnotationTestCase {
  name: string;
  description: string;
  validationType: 'ANNOTATION';
  entityClassName: string;
  annotationChecks: AnnotationCheck[];
  marks: number;
}

export interface ApiTestCase {
  name: string;
  description: string;
  validationType: 'API';
  endpoint: string;
  httpMethod: HttpMethod;
  expectedStatusCode: number;
  requestBody?: Record<string, unknown>;
  expectedResponse?: Record<string, unknown>;
  validateFields?: string[];
  validateArrayNotEmpty?: boolean;
  marks: number;
}

export type TestCase = AnnotationTestCase | ApiTestCase;

export interface JavaValidationConfig {
  skillType: string;
  projectName: string;
  packageName: string;
  testcases: TestCase[];
}
