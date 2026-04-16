import { PipelineBoard } from '@/components/features/pipeline/PipelineBoard';
import { mockDeals } from '@/data/crm';

export function PipelinePage() {
  return (
    <div className="flex h-full flex-col pt-4">
      <PipelineBoard deals={mockDeals} />
    </div>
  );
}
