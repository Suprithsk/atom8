import { ArrowRight, Code2, Zap, Cloud } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onSeeHowClick?: () => void;
  onGetStartedClick?: () => void;
}

export function Hero({ onSeeHowClick, onGetStartedClick }: HeroProps) {
  return (
    <section className="section-lg bg-gradient-hero pt-32">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Automated Validation for Backend & Cloud Assessments
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Execute code, validate APIs, and verify AWS resources automatically. Eliminate manual checks and scale confidently.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg" onClick={onSeeHowClick}>
              See How It Works
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg" onClick={onGetStartedClick}>
              Create Assessment
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-primary-600" />
            </div>
            <p className="font-semibold text-slate-900">Execute Code</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary-600" />
            </div>
            <p className="font-semibold text-slate-900">Validate APIs</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Cloud className="w-6 h-6 text-primary-600" />
            </div>
            <p className="font-semibold text-slate-900">Verify AWS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
