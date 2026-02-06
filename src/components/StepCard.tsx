import { ReactNode } from 'react';

interface StepCardProps {
  number: number;
  icon: ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

export function StepCard({ number, icon, title, description, isLast = false }: StepCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-full">
        <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xl shadow-base mb-4">
          {number}
        </div>
        <div className="text-4xl mb-4 text-primary-600">{icon}</div>
        <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
        <p className="text-slate-600 text-center">{description}</p>
      </div>
      {!isLast && (
        <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-primary-300 to-primary-100 mt-8 mb-8">
        </div>
      )}
    </div>
  );
}
