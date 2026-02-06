import { useEffect, useState } from 'react';
import { Code2, Sparkles, Loader } from 'lucide-react';

const STEPS = [
  { label: 'Analyzing test cases...', duration: 3000 },
  { label: 'Generating validation code...', duration: 6000 },
  { label: 'Building test framework...', duration: 4000 },
  { label: 'Pushing to GitHub...', duration: 3000 },
  { label: 'Finalizing...', duration: 2000 },
];

export function SubmitLoadingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');

  // Cycle through steps
  useEffect(() => {
    if (currentStep >= STEPS.length) return;

    const timer = setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((s) => s + 1);
      }
    }, STEPS[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min(((currentStep + 1) / STEPS.length) * 100, 95);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center space-y-6">
        {/* Animated icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-primary-100 rounded-full animate-ping opacity-20" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg shadow-primary-200">
            <Code2 className="w-9 h-9 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-slate-900">Generating Code</h3>
          <p className="text-slate-500 text-sm mt-1">This may take a moment</p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
            <Loader className="w-3.5 h-3.5 animate-spin text-primary-500" />
            <span>
              {STEPS[currentStep].label.replace('...', dots.padEnd(3, '\u00A0'))}
            </span>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i < currentStep
                  ? 'bg-primary-500 scale-100'
                  : i === currentStep
                  ? 'bg-primary-400 scale-125 animate-pulse'
                  : 'bg-slate-200 scale-100'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
