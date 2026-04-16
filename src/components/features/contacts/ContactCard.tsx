import { Avatar, Badge } from '@/components/common';
import { formatRelativeTime } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Contact } from '@/data/crm';

const categoryVariant: Record<Contact['category'], 'primary' | 'success' | 'neutral'> = {
  Team: 'primary',
  Collaboration: 'success',
  Leads: 'neutral',
};

interface ContactCardProps {
  contact: Contact;
  className?: string;
}

export function ContactCard({ contact, className }: ContactCardProps) {
  return (
    <div
      className={cn(
        'bg-card border-border/60 flex items-center gap-3 rounded-xl border p-3',
        className
      )}
    >
      <Avatar seed={contact.id} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-foreground truncate text-sm font-medium">{contact.name}</span>
          <Badge variant={categoryVariant[contact.category]}>{contact.category}</Badge>
        </div>
        {contact.handle ? (
          <p className="text-muted-foreground truncate text-xs">{contact.handle}</p>
        ) : contact.phone ? (
          <p className="text-muted-foreground truncate text-xs">{contact.phone}</p>
        ) : null}
      </div>
      <div className="text-muted-foreground shrink-0 text-right text-xs">
        {formatRelativeTime(contact.lastActivityAt)}
      </div>
    </div>
  );
}
