import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface FinalCTAProps {
  onGetStartedClick?: () => void;
}

export function FinalCTA({ onGetStartedClick }: FinalCTAProps) {
  return (
    <section className="section-lg bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="container-tight text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Bring Cloud Assessments to Full Automation
        </h2>
        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          Start validating assessments automatically today. Scale your evaluation process without limits.
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={onGetStartedClick}
          className="bg-white text-primary-600 hover:bg-primary-50"
        >
          Get Started with Nuvepro
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
