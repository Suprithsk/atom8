import { Shield, Zap, Briefcase } from 'lucide-react';
import { Card } from './Card';

export function Trust() {
  return (
    <section className="section-lg bg-white">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            Built for Scale
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Enterprise-grade reliability and automation-first architecture you can trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Deterministic Evaluation
            </h3>
            <p className="text-slate-600">
              Rule-based validation ensures every assessment follows identical evaluation criteria with no subjective interpretation.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Automation-First
            </h3>
            <p className="text-slate-600">
              Eliminate manual processes entirely. Scaled validation happens instantly without human bottlenecks.
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Enterprise Ready
            </h3>
            <p className="text-slate-600">
              Built for demanding workflows with comprehensive audit trails, security controls, and compliance support.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
