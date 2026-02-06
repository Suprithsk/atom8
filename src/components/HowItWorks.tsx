import { FileText, Zap, Send, CheckCircle2 } from 'lucide-react';
import { StepCard } from './StepCard';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-lg bg-white">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Four simple steps to fully automated assessment validation.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <StepCard
            number={1}
            icon={<FileText className="w-8 h-8" />}
            title="Define Rules"
            description="Set up expected JSON responses and cloud resource rules"
          />
          <StepCard
            number={2}
            icon={<Zap className="w-8 h-8" />}
            title="Generate Logic"
            description="Platform auto-generates validation logic and validators"
            isLast={false}
          />
          <StepCard
            number={3}
            icon={<Send className="w-8 h-8" />}
            title="Collect Submissions"
            description="Candidates submit their code and resource configurations"
            isLast={false}
          />
          <StepCard
            number={4}
            icon={<CheckCircle2 className="w-8 h-8" />}
            title="Automated Evaluation"
            description="Instant, deterministic pass/fail results with full audit trail"
            isLast={true}
          />
        </div>
      </div>
    </section>
  );
}
