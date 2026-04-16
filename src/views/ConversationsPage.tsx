import { ConversationList } from '@/components/features/conversations/ConversationList';
import { mockConversations } from '@/data/crm';

export function ConversationsPage() {
  return (
    <div className="flex flex-col gap-2 pb-6 pt-4">
      <ConversationList conversations={mockConversations} />
    </div>
  );
}
