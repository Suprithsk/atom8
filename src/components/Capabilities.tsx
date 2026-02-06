import { Code2, FileJson, Zap, Cloud, CheckCircle2 } from 'lucide-react';
import { IconCard } from './IconCard';

export function Capabilities() {
  return (
    <section id="capabilities" className="section-lg bg-gradient-subtle">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            Powerful Platform Capabilities
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to automate backend and cloud assessments at scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <IconCard
            icon={<Code2 className="w-8 h-8" />}
            title="Backend Code Execution"
            description="Execute and validate backend code submissions with complete control over runtime environment and resource limits."
          />
          <IconCard
            icon={<FileJson className="w-8 h-8" />}
            title="JSON-Based Rules"
            description="Define validation rules using intuitive JSON format for request/response matching and complex assertions."
          />
          <IconCard
            icon={<Zap className="w-8 h-8" />}
            title="Auto-Generated Validators"
            description="Platform automatically generates Java validators from your rules for consistent and efficient evaluation."
          />
          <IconCard
            icon={<Cloud className="w-8 h-8" />}
            title="AWS Resource Verification"
            description="Verify AWS resource configurations, permissions, and compliance automatically with deterministic results."
          />
          <IconCard
            icon={<CheckCircle2 className="w-8 h-8" />}
            title="Deterministic Results"
            description="Get consistent, reproducible pass/fail outcomes every time with zero ambiguity or human interpretation."
          />
          <div className="md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-base border border-slate-200">
            <p className="text-center text-slate-600 font-medium">
              Unified backend & cloud validation in a single platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
