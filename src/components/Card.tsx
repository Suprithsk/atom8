import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = false, className = '' }: CardProps) {
  return (
    <div className={`${hover ? 'card-hover' : 'card'} ${className}`}>
      {children}
    </div>
  );
}
