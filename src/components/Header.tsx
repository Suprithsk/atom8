import { Code2 } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  onCTAClick?: () => void;
}

export function Header({ onCTAClick }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 shadow-xs">
      <div className="container-tight px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900">Nuvepro</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('capabilities')}
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('benefits')}
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Benefits
          </button>
        </nav>

        <Button variant="primary" size="sm" onClick={onCTAClick}>
          Get Started
        </Button>
      </div>
    </header>
  );
}
