import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, ChevronDown, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/common';
import { mockTemplates, mockConversations, type Channel } from '@/data/crm';
import { useConversations } from '@/store/conversations';

// ─── Channel label helper ─────────────────────────────────────────────────────

const channelLabels: Record<Channel, string> = {
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  email: 'Email',
  telegram: 'Telegram',
};

// ─── Templates dropdown ───────────────────────────────────────────────────────

interface TemplatesDropdownProps {
  onSelect: (content: string) => void;
  onClose: () => void;
}

function TemplatesDropdown({ onSelect, onClose }: TemplatesDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="border-border/60 bg-card absolute bottom-full left-0 z-50 mb-1 w-72 overflow-hidden rounded-xl border shadow-lg"
    >
      <div className="border-border/60 border-b px-3 py-2">
        <p className="text-foreground text-xs font-medium">Message Templates</p>
      </div>
      <div className="max-h-60 overflow-y-auto py-1">
        {mockTemplates.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => {
              onSelect(tpl.content);
              onClose();
            }}
            className="hover:bg-card/80 w-full px-3 py-2 text-left transition-colors"
          >
            <p className="text-foreground text-xs font-medium">{tpl.title}</p>
            <p className="text-muted-foreground mt-0.5 line-clamp-2 text-[11px]">{tpl.content}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ReplyComposer ────────────────────────────────────────────────────────────

interface ReplyComposerProps {
  conversationId: string;
}

export function ReplyComposer({ conversationId }: ReplyComposerProps) {
  const { sendMessage } = useConversations();
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const conversation = mockConversations.find((c) => c.id === conversationId);
  const channelLabel = conversation ? channelLabels[conversation.channel] : 'message';

  // Auto-grow textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [text]);

  const handleSend = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    setIsSending(true);
    setText('');
    try {
      await sendMessage(conversationId, trimmed);
    } finally {
      setIsSending(false);
    }
    textareaRef.current?.focus();
  }, [text, isSending, sendMessage, conversationId]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-border/60 shrink-0 border-t bg-background px-3 pb-3 pt-2">
      {/* Channel hint */}
      <p className="text-muted-foreground mb-1.5 text-[11px]">
        Replying via {channelLabel}
      </p>

      {/* Input area */}
      <div className="border-border/60 relative rounded-xl border bg-card focus-within:ring-1 focus-within:ring-primary/40">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
          placeholder="Type a message… (⌘↵ to send)"
          rows={1}
          className={cn(
            'w-full resize-none rounded-xl bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-50',
            'max-h-[120px] overflow-y-auto'
          )}
        />

        {/* Action row */}
        <div className="flex items-center justify-between px-2 pb-2">
          {/* Templates trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTemplates((v) => !v)}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-colors hover:bg-muted/40"
            >
              <FileText className="h-3 w-3" />
              Templates
              <ChevronDown className="h-2.5 w-2.5" />
            </button>
            {showTemplates && (
              <TemplatesDropdown
                onSelect={(content) => {
                  setText(content);
                  textareaRef.current?.focus();
                }}
                onClose={() => setShowTemplates(false)}
              />
            )}
          </div>

          {/* Send button */}
          <IconButton
            size="sm"
            variant="solid"
            onClick={handleSend}
            disabled={!text.trim() || isSending}
            aria-label="Send message"
          >
            <Send />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
