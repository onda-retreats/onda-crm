import { Avatar, Badge } from '@/components/common';
import { formatRelativeTime } from '@/lib/format';
import { cn } from '@/lib/utils';
import { getContactById, type Conversation } from '@/data/crm';
import { MessageCircle, Send, Users } from 'lucide-react';

interface ConversationItemProps {
  conversation: Conversation;
  className?: string;
}

const channelIcons = {
  instagram: MessageCircle,
  telegram: Send,
  internal: Users,
} as const;

const statusConfig = {
  open: { label: 'Open', variant: 'primary' as const },
  waiting: { label: 'Waiting', variant: 'neutral' as const },
  waiting_client: { label: 'Waiting client', variant: 'success' as const },
  closed: { label: 'Closed', variant: 'destructive' as const },
};

export function ConversationItem({ conversation, className }: ConversationItemProps) {
  const contact = getContactById(conversation.contactId);
  const ChannelIcon =
    channelIcons[conversation.channel as keyof typeof channelIcons] ?? MessageCircle;

  const status =
    statusConfig[conversation.status as keyof typeof statusConfig] ?? {
      label: String(conversation.status),
      variant: 'neutral' as const,
    };

  return (
    <div className={cn('flex items-start gap-3 px-4 py-3', className)}>
      <div className="relative">
        <Avatar seed={conversation.contactId} size="md" />
        <span className="bg-card border-border absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border">
          <ChannelIcon className="text-muted-foreground h-2.5 w-2.5" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-medium">
              {contact?.name ?? 'Unknown contact'}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {conversation.lastMessage}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="text-muted-foreground text-xs">
              {formatRelativeTime(conversation.lastMessageAt)}
            </span>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
