import { cn } from '@/lib/utils';
import { DealCard } from './DealCard';
import type { Deal, DealStage } from '@/data/crm';

interface PipelineStageProps {
  stage: DealStage;
  deals: Deal[];
  className?: string;
}

export function PipelineStage({ stage, deals, className }: PipelineStageProps) {
  return (
    <div
      className={cn(
        'bg-card border-border/60 flex h-full w-64 shrink-0 flex-col rounded-xl border',
        className
      )}
    >
      {/* Header */}
      <div className="border-border/60 flex items-center justify-between border-b px-3 py-2.5">
        <span className="text-foreground text-xs font-semibold">{stage}</span>
        <span className="bg-background text-muted-foreground rounded-full px-2 py-0.5 text-[10px] font-medium">
          {deals.length}
        </span>
      </div>

      {/* Deal cards */}
      <div className="flex flex-col gap-2 overflow-y-auto p-2">
        {deals.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center text-xs">No deals</p>
        ) : (
          deals.map((deal) => <DealCard key={deal.id} deal={deal} />)
        )}
      </div>
    </div>
  );
}
