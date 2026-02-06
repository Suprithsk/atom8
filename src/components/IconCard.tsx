import { ReactNode } from 'react';
import { Card } from './Card';

interface IconCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function IconCard({ icon, title, description }: IconCardProps) {
  return (
    <Card hover className="p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </Card>
  );
}
