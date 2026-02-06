import { AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from './Card';

export function ProblemSolution() {
  return (
    <section className="section-lg bg-white">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            From Manual to Automated
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Transform how you validate backend and cloud assessments with intelligent automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 border-red-100 bg-red-50">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-2xl font-bold text-red-900">Before</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span className="text-slate-700">Manual cloud validation by humans</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span className="text-slate-700">Time-consuming manual inspection of AWS resources</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span className="text-slate-700">Inconsistent evaluation criteria</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span className="text-slate-700">Slow turnaround times</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span className="text-slate-700">Limited scalability</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 border-green-100 bg-green-50">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-2xl font-bold text-green-900">After</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="text-green-500 font-bold mt-1">✓</span>
                <span className="text-slate-700">Rule-driven automated validation</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-green-500 font-bold mt-1">✓</span>
                <span className="text-slate-700">Auto-generated Java validators</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-green-500 font-bold mt-1">✓</span>
                <span className="text-slate-700">Fully automated AWS verification</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-green-500 font-bold mt-1">✓</span>
                <span className="text-slate-700">Deterministic, consistent results</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-green-500 font-bold mt-1">✓</span>
                <span className="text-slate-700">Instant scaling to thousands of candidates</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
