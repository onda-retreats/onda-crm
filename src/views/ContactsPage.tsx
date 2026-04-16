import { ContactList } from '@/components/features/contacts/ContactList';
import { mockContacts } from '@/data/crm';

export function ContactsPage() {
  return (
    <div className="flex flex-col gap-2 pb-6 pt-4">
      <ContactList contacts={mockContacts} />
    </div>
  );
}
