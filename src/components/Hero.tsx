import { ArrowRight, Code2, Zap, Cloud, BookOpen, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface HeroProps {
  onSeeHowClick?: () => void;
  onGetStartedClick?: () => void;
}

export function Hero({ onSeeHowClick, onGetStartedClick }: HeroProps) {
  const navigate = useNavigate();

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

        {/* Quick Links */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/java-validation')}
            className="group flex items-center gap-3 px-6 py-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all w-full sm:w-auto"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-primary-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Java Validation</p>
              <p className="text-sm text-slate-500">Spring Boot API testing</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all ml-2" />
          </button>

          <button
            onClick={() => navigate('/cloud-validation')}
            className="group flex items-center gap-3 px-6 py-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all w-full sm:w-auto"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
              <Cloud className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Cloud Validation</p>
              <p className="text-sm text-slate-500">AWS · GCP · Azure</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all ml-2" />
          </button>

          <button
            onClick={() => navigate('/python-based-validations')}
            className="group flex items-center gap-3 px-6 py-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all w-full sm:w-auto"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
              <Terminal className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Python Based Validations</p>
              <p className="text-sm text-slate-500">Backend API testing</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all ml-2" />
          </button>

          <button
            onClick={() => navigate('/concept-based-validation')}
            className="group flex items-center gap-3 px-6 py-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-violet-300 transition-all w-full sm:w-auto"
          >
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-violet-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Concept Validation</p>
              <p className="text-sm text-slate-500">Assessment-based testing</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all ml-2" />
          </button>
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
            <p className="font-semibold text-slate-900">Verify Cloud</p>
          </div>
        </div>
      </div>
    </section>
  );
}
