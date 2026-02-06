export interface GithubConfig {
  repoName: string;
}

export interface ConceptQuestion {
  id: string;
  description: string;
  points: number;
  questionType: string;
  scenario?: string;
  question: string;
  keyConcepts: string[];
  expectedAnswer: string;
  textWeight?: number;
  diagramWeight?: number;
  diagramCriteria?: string[];
}

export interface ConceptValidationConfig {
  assessmentId: string;
  assessmentTitle: string;
  userAnswersPath: string;
  defaultMaxMarks: number;
  githubConfig: GithubConfig;
  questions: ConceptQuestion[];
}

/* — Response types — */

export interface QuestionResult {
  questionId: string;
  description: string;
  marksObtained: number;
  maxMarks: number;
  status: 'PASS' | 'FAIL';
  actualAnswer: string;
  expectedAnswer: string;
  feedback: string;
  diagramEvaluation: string | null;
}

export interface EvaluationSummary {
  totalQuestions: number;
  passedQuestions: number;
  failedQuestions: number;
  totalMarksObtained: number;
  totalMarksPossible: number;
  percentageScore: number;
  overallResult: 'PASS' | 'FAIL';
}

export interface GitHubResult {
  pushed: boolean;
  repoUrl: string;
  fileUrl: string;
  filePath: string;
  commitSha: string;
  errorMessage: string | null;
}

export interface ConceptValidationResponse {
  success: boolean;
  message: string;
  assessmentId: string;
  assessmentTitle: string | null;
  summary: EvaluationSummary;
  questionResults: QuestionResult[];
  githubResult: GitHubResult;
  validatedAt: string;
  processingTimeMs: number;
}
