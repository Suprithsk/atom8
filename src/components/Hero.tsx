import { ArrowRight, Code2, Cloud, BookOpen, Terminal, Sparkles, GitBranch, Shield, Zap, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-28 pb-16">
        <div className="container-wide px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-700 mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Assessment Validation Script Generation
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Automated Concept-Based Validation & Hands-On Assessment Verification
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Evaluate descriptive answers and diagram implementations with AI, generate validation scripts for verifying cloud assessments, and verify API-based assessments using automated validation scripts.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 mb-14">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">4</p>
              <p className="text-sm text-slate-500 mt-1">Validation Modules</p>
            </div>
            <div className="hidden sm:block w-px bg-slate-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">3</p>
              <p className="text-sm text-slate-500 mt-1">Cloud Providers</p>
            </div>
            <div className="hidden sm:block w-px bg-slate-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">100%</p>
              <p className="text-sm text-slate-500 mt-1">AI-Powered</p>
            </div>
            <div className="hidden sm:block w-px bg-slate-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">Auto</p>
              <p className="text-sm text-slate-500 mt-1">GitHub Push</p>
            </div>
          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {/* Concept-Based Validation */}
            <button
              onClick={() => navigate('/concept-based-validation')}
              className="group text-left bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-violet-300 transition-all p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-violet-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">Concept Validation</p>
                  <p className="text-xs text-slate-400">AI-Powered Assessment</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Validate descriptive text-based answers and diagram implementations submitted by users. AI reads each response, verifies it against expected concepts, and awards marks automatically — covering architecture, DDD, design patterns, and more.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 bg-violet-50 text-violet-600 rounded text-xs font-medium">Descriptive Answers</span>
                <span className="px-2 py-0.5 bg-violet-50 text-violet-600 rounded text-xs font-medium">AI Evaluation</span>
                <span className="px-2 py-0.5 bg-violet-50 text-violet-600 rounded text-xs font-medium">Auto Marks</span>
              </div>
            </button>

            {/* Java Validation */}
            <button
              onClick={() => navigate('/java-validation')}
              className="group text-left bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">Java Validation</p>
                  <p className="text-xs text-slate-400">Spring Boot API</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Configure Spring Boot API test cases with annotation checks and endpoint validations. AI generates complete Java validation code and pushes it to GitHub automatically.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded text-xs font-medium">Annotations</span>
                <span className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded text-xs font-medium">REST APIs</span>
                <span className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded text-xs font-medium">Auto-generated Code</span>
              </div>
            </button>

            {/* Cloud Validation */}
            <button
              onClick={() => navigate('/cloud-validation')}
              className="group text-left bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <Cloud className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">Cloud Validation</p>
                  <p className="text-xs text-slate-400">AWS · GCP · Azure</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Define cloud resource test cases for AWS, GCP, or Azure. Validates IAM roles, Lambda functions, S3 buckets, DynamoDB tables, API Gateways, and more using boto3/SDK-based validation code.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-xs font-medium">AWS</span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">GCP</span>
                <span className="px-2 py-0.5 bg-sky-50 text-sky-600 rounded text-xs font-medium">Azure</span>
              </div>
            </button>

            {/* Python Based Validations */}
            <button
              onClick={() => navigate('/python-based-validations')}
              className="group text-left bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                  <Terminal className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">Python Based Validations</p>
                  <p className="text-xs text-slate-400">Backend API Testing</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Build GoLang/backend CRUD API test suites with endpoint definitions, HTTP methods, status codes, and database table validations. Generates Python validation scripts with dependency chaining support.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs font-medium">REST Endpoints</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs font-medium">CRUD</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs font-medium">DB Validation</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container-wide px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Three simple steps from configuration to validated results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Configure</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Define your test cases, endpoints, cloud resources, or concept questions through an intuitive UI. Set expected outcomes, marks, and validation rules.
              </p>
              <ArrowRight className="hidden md:block absolute -right-6 top-7 w-5 h-5 text-slate-300" />
            </div>
            <div className="relative text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">AI Generates & Validates</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Submit your configuration and our AI engine generates validation code, evaluates descriptive answers, or verifies cloud resources — all automatically.
              </p>
              <ArrowRight className="hidden md:block absolute -right-6 top-7 w-5 h-5 text-slate-300" />
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Results & GitHub Push</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Review generated code, evaluation marks, and pass/fail results. Code is automatically pushed to your GitHub repository, ready for execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Atom8 Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="container-wide px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Why Atom8?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Built for teams that need reliable, scalable assessment validation</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <div className="w-11 h-11 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">Instant Generation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">AI generates complete validation code in seconds, not hours of manual scripting.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <div className="w-11 h-11 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GitBranch className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">GitHub Integration</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Generated code is pushed directly to your repository with proper file structure and naming.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <div className="w-11 h-11 bg-violet-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-5 h-5 text-violet-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">Consistent & Reliable</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Standardized validation across all assessments ensures fair and accurate evaluations every time.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <div className="w-11 h-11 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">Detailed Results</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Get pass/fail breakdowns, marks, comments, and comprehensive evaluation summaries at a glance.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
