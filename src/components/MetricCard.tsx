import { Card } from './Card';

interface MetricCardProps {
  title: string;
  description: string;
}

export function MetricCard({ title, description }: MetricCardProps) {
  return (
    <Card className="p-8 bg-gradient-to-br from-primary-50 to-slate-50 border-primary-100">
      <h3 className="text-2xl font-bold mb-2 text-primary-600">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </Card>
  );
}
