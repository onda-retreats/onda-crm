import { Avatar, Badge } from '@/components/common';
import { formatRelativeTime } from '@/lib/format';
import { cn } from '@/lib/utils';
import {
  MessageCircle,
  Mail,
  Send,
  AtSign,
} from 'lucide-react';
import type { Conversation, ConversationStatus } from '@/data/crm';
import { getContactById } from '@/data/crm';

const channelIcon = {
  instagram: AtSign,
  whatsapp: MessageCircle,
  email: Mail,
  telegram: Send,
} as const;

const statusConfig: Record<
  ConversationStatus,
  { label: string; variant: 'primary' | 'success' | 'destructive' | 'neutral' }
> = {
  open: { label: 'Open', variant: 'primary' },
  waiting_us: { label: 'Waiting us', variant: 'destructive' },
  waiting_client: { label: 'Waiting client', variant: 'neutral' },
  closed: { label: 'Closed', variant: 'success' },
};

interface ConversationItemProps {
  conversation: Conversation;
  className?: string;
}

export function ConversationItem({ conversation, className }: ConversationItemProps) {
  const contact = getContactById(conversation.contactId);
  const ChannelIcon = channelIcon[conversation.channel];
  const status = statusConfig[conversation.status];

  return (
    <div className={cn('flex items-start gap-3 px-4 py-3', className)}>
      <div className="relative">
        <Avatar seed={conversation.contactId} size="md" />
        <span className="bg-card border-border absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border">
          <ChannelIcon className="h-2.5 w-2.5 text-muted-foreground" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-foreground text-sm font-medium truncate">
            {contact?.name ?? 'Unknown'}
          </span>
          <span className="text-muted-foreground shrink-0 text-xs">
            {formatRelativeTime(conversation.lastMessageDate)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-muted-foreground truncate text-xs">{conversation.lastMessage}</p>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </div>
    </div>
  );
}
