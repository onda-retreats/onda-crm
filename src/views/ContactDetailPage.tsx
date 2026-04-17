import { Link, useParams } from 'react-router-dom';
import { MessageSquare, Users } from 'lucide-react';
import { Avatar, Badge, EmptyState } from '@/components/common';
import { MessageThread } from '@/components/features/conversations/MessageThread';
import { ReplyComposer } from '@/components/features/conversations/ReplyComposer';
import { useConversations } from '@/store/conversations';
import {
  getContactById,
  getProjectById,
  mockDeals,
  type Contact,
  type Deal,
} from '@/data/crm';

const categoryVariant: Record<Contact['category'], 'primary' | 'success' | 'neutral'> = {
  Team: 'primary',
  Collaboration: 'success',
  Leads: 'neutral',
};

function ContactHeader({ contact, deal }: { contact: Contact; deal?: Deal }) {
  const project = deal?.projectId ? getProjectById(deal.projectId) : undefined;

  return (
    <div className="border-border/60 bg-card mx-4 mt-4 flex items-start gap-3 rounded-xl border p-4">
      <Avatar seed={contact.id} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-foreground truncate text-sm font-semibold">{contact.name}</span>
          <Badge variant={categoryVariant[contact.category]}>{contact.category}</Badge>
          {deal ? <Badge variant="neutral">{deal.stage}</Badge> : null}
        </div>
        <div className="text-muted-foreground mt-0.5 space-y-0.5 text-xs">
          {contact.handle ? <p className="truncate">{contact.handle}</p> : null}
          {contact.phone ? <p className="truncate">{contact.phone}</p> : null}
          {project ? (
            <p className="truncate">
              <span className="text-muted-foreground/70">Project · </span>
              {project.name}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ContactDetailPage() {
  const { contactId = '' } = useParams<{ contactId: string }>();
  const contact = getContactById(contactId);
  const { getConversationByContactId } = useConversations();

  if (!contact) {
    return (
      <div className="p-4">
        <EmptyState
          icon={Users}
          title="Contact not found"
          description="This contact no longer exists or the link is broken."
        />
        <div className="mt-3 text-center">
          <Link to="/contacts" className="text-primary text-xs font-medium">
            Back to contacts
          </Link>
        </div>
      </div>
    );
  }

  const deal = mockDeals.find((d) => d.contactId === contact.id);
  const conversation = getConversationByContactId(contact.id);

  return (
    <div className="flex h-full flex-col">
      <ContactHeader contact={contact} deal={deal} />

      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        {conversation ? (
          <>
            <MessageThread conversationId={conversation.id} />
            <ReplyComposer conversationId={conversation.id} />
          </>
        ) : (
          <div className="px-4 pb-6">
            <EmptyState
              icon={MessageSquare}
              title="No conversation yet"
              description="There is no conversation thread linked to this contact."
            />
          </div>
        )}
      </div>
    </div>
  );
}