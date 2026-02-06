import { MetricCard } from './MetricCard';

export function Impact() {
  return (
    <section id="benefits" className="section-lg bg-gradient-hero">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            Measurable Impact
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Transform your assessment process with proven automation benefits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <MetricCard
            title="100% Automated"
            description="Eliminate manual cloud checks entirely. Let the platform handle validation consistently every single time."
          />
          <MetricCard
            title="Scale Instantly"
            description="Evaluate thousands of candidates simultaneously without additional overhead or human intervention."
          />
          <MetricCard
            title="Zero Ambiguity"
            description="Deterministic results mean no subjective interpretation. Every evaluation follows the exact same rules."
          />
          <MetricCard
            title="Unified Platform"
            description="Backend code execution and cloud resource validation unified under one comprehensive engine."
          />
        </div>
      </div>
    </section>
  );
}
