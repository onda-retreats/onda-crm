import { PipelineStage } from './PipelineStage';
import { ALL_DEAL_STAGES } from '@/data/crm';
import type { Deal } from '@/data/crm';

interface PipelineBoardProps {
  deals: Deal[];
}

export function PipelineBoard({ deals }: PipelineBoardProps) {
  return (
    <div className="flex h-full gap-3 overflow-x-auto px-4 pb-4">
      {ALL_DEAL_STAGES.map((stage) => (
        <PipelineStage
          key={stage}
          stage={stage}
          deals={deals.filter((d) => d.stage === stage)}
        />
      ))}
    </div>
  );
}
