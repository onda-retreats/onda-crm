import { useState } from 'react';
import { Users } from 'lucide-react';
import { EmptyState } from '@/components/common';
import { cn } from '@/lib/utils';
import { ContactCard } from './ContactCard';
import type { Contact, ContactCategory } from '@/data/crm';

type Filter = 'all' | ContactCategory;

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Team', value: 'Team' },
  { label: 'Collaboration', value: 'Collaboration' },
  { label: 'Leads', value: 'Leads' },
];

interface ContactListProps {
  contacts: Contact[];
}

export function ContactList({ contacts }: ContactListProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered =
    filter === 'all' ? contacts : contacts.filter((c) => c.category === filter);

  return (
    <div className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-2 px-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No contacts"
            description="No contacts match this filter yet."
          />
        ) : (
          filtered.map((contact) => <ContactCard key={contact.id} contact={contact} />)
        )}
      </div>
    </div>
  );
}
