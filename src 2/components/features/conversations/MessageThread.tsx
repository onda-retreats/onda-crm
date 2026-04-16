import { useEffect, useRef } from 'react';
import { Clock, Check, CheckCheck, Eye, AlertCircle, Instagram, Mail, MessageCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/format';
import { useConversations } from '@/store/conversations';
import { mockConversations } from '@/data/crm';
import type { Message, MessageStatus, Channel } from '@/data/crm';

// ─── Channel Badge ────────────────────────────────────────────────────────────

const channelConfig: Record<Channel, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  instagram: { label: 'Instagram', Icon: Instagram },
  whatsapp: { label: 'WhatsApp', Icon: MessageCircle },
  email: { label: 'Email', Icon: Mail },
  telegram: { label: 'Telegram', Icon: Send },
};

function ChannelBadge({ channel }: { channel: Channel }) {
  const { label, Icon } = channelConfig[channel];
  return (
    <span className="text-muted-foreground inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-2 py-0.5 text-[10px] font-medium">
      <Icon className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

// ─── Status Icon ─────────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: MessageStatus }) {
  if (status === 'sending') return <Clock className="h-3 w-3 text-muted-foreground" />;
  if (status === 'sent') return <Check className="h-3 w-3 text-muted-foreground" />;
  if (status === 'delivered') return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
  if (status === 'read') return <Eye className="h-3 w-3 text-primary" />;
  if (status === 'failed') return <AlertCircle className="h-3 w-3 text-destructive" />;
  return null;
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message, isFirst }: { message: Message; isFirst: boolean }) {
  const isOutbound = message.direction === 'outbound';

  return (
    <div className={cn('flex flex-col gap-0.5', isOutbound ? 'items-end' : 'items-start')}>
      {isFirst && (
        <div className={cn('mb-0.5', isOutbound ? 'mr-1' : 'ml-1')}>
          <ChannelBadge channel={message.channel} />
        </div>
      )}
      <div
        className={cn(
          'max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
          isOutbound
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'bg-card text-foreground border border-border/60 rounded-bl-sm'
        )}
      >
        {message.content}
      </div>
      <div
        className={cn(
          'flex items-center gap-1 px-1',
          isOutbound ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <span className="text-muted-foreground text-[10px]">
          {formatRelativeTime(message.timestamp)}
        </span>
        {isOutbound && <StatusIcon status={message.status} />}
      </div>
    </div>
  );
}

// ─── Message Thread ───────────────────────────────────────────────────────────

interface MessageThreadProps {
  conversationId: string;
}

export function MessageThread({ conversationId }: MessageThreadProps) {
  const { getMessages } = useConversations();
  const messages = getMessages(conversationId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const conversation = mockConversations.find((c) => c.id === conversationId);
  const isInstagram = conversation?.channel === 'instagram';

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {isInstagram && (
        <div className="shrink-0 px-3 py-2">
          <p className="text-muted-foreground/70 text-[11px]">
            Messages sent directly from Instagram will not appear here. Reply from the CRM for full tracking.
          </p>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-2"
      >
        {messages.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-xs">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isFirst={index === 0}
            />
          ))
        )}
      </div>
    </div>
  );
}
