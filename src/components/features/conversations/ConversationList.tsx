import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { EmptyState } from '@/components/common';
import { cn } from '@/lib/utils';
import { ConversationItem } from './ConversationItem';
import type { Conversation, ConversationStatus } from '@/data/crm';

type Filter = 'all' | ConversationStatus;

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Waiting us', value: 'waiting_us' },
  { label: 'Waiting client', value: 'waiting_client' },
  { label: 'Closed', value: 'closed' },
];

interface ConversationListProps {
  conversations: Conversation[];
}

export function ConversationList({ conversations }: ConversationListProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered =
    filter === 'all' ? conversations : conversations.filter((c) => c.status === filter);

  return (
    <div className="flex flex-col gap-3">
      {/* Filter tabs */}
      <div className="flex gap-1 overflow-x-auto px-4 pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              filter === f.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:text-foreground border-border/60 border'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-card border-border/60 rounded-xl border divide-y divide-border/40 mx-4">
        {filtered.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={MessageSquare}
              title="No conversations"
              description="No conversations match this filter."
            />
          </div>
        ) : (
          filtered.map((conv) => <ConversationItem key={conv.id} conversation={conv} />)
        )}
      </div>
    </div>
  );
}
