import { Link } from 'react-router-dom';
import { Avatar } from '@/components/common';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Deal } from '@/data/crm';
import { getContactById, getProjectById } from '@/data/crm';

interface DealCardProps {
  deal: Deal;
  className?: string;
}

export function DealCard({ deal, className }: DealCardProps) {
  const contact = getContactById(deal.contactId);
  const project = deal.projectId ? getProjectById(deal.projectId) : undefined;

  return (
    <Link
      to={`/contacts/${deal.contactId}`}
      className={cn(
        'bg-background border-border/60 hover:border-primary/40 flex flex-col gap-2 rounded-lg border p-3 transition-colors',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar seed={deal.contactId} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-xs font-medium">
            {contact?.name ?? 'Unknown'}
          </p>
          {project ? (
            <p className="text-muted-foreground truncate text-[10px]">{project.name}</p>
          ) : null}
        </div>
      </div>
      <div className="text-foreground text-sm font-semibold">
        {formatCurrency(deal.expectedAmount, deal.currency)}
      </div>
      {deal.receivedAmount > 0 && deal.receivedAmount < deal.expectedAmount ? (
        <div className="bg-border/60 h-1.5 w-full rounded-full">
          <div
            className="bg-primary h-1.5 rounded-full"
            style={{
              width: `${Math.min(100, (deal.receivedAmount / deal.expectedAmount) * 100)}%`,
            }}
          />
        </div>
      ) : null}
    </Link>
  );
}
