import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { direction: 'up' | 'down'; label: string };
  className?: string;
}

export function StatCard({ label, value, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-card border-border/60 flex flex-col gap-1 rounded-xl border p-4',
        className
      )}
    >
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <p className="text-foreground text-2xl font-bold tracking-tight">{value}</p>
      {trend ? (
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-medium',
            trend.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'
          )}
        >
          {trend.direction === 'up' ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {trend.label}
        </div>
      ) : null}
    </div>
  );
}
