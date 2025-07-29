import { cn } from '@/lib/utils';
import { Scale, type LucideProps } from 'lucide-react';

export function Logo({ className, ...props }: LucideProps) {
  return (
    <Scale className={cn('h-6 w-6 text-white', className)} {...props} />
  );
}
