import { Avatar, Badge } from '@/components/common';
import { formatCurrency, formatRelativeTime } from '@/lib/format';
import type { Payment, PaymentStatus, PaymentType } from '@/data/crm';
import { getContactById, getProjectById } from '@/data/crm';

const statusConfig: Record<
  PaymentStatus,
  { label: string; variant: 'primary' | 'success' | 'destructive' | 'neutral' }
> = {
  expected: { label: 'Expected', variant: 'neutral' },
  paid: { label: 'Paid', variant: 'success' },
  overdue: { label: 'Overdue', variant: 'destructive' },
  refunded: { label: 'Refunded', variant: 'primary' },
};

const typeLabel: Record<PaymentType, string> = {
  deposit: 'Deposit',
  partial: 'Partial',
  full: 'Full',
  refund: 'Refund',
};

interface PaymentRowProps {
  payment: Payment;
}

export function PaymentRow({ payment }: PaymentRowProps) {
  const contact = getContactById(payment.contactId);
  const project = payment.projectId ? getProjectById(payment.projectId) : undefined;
  const status = statusConfig[payment.status];

  return (
    <tr className="border-border/40 border-b last:border-0">
      <td className="py-3 pl-4 pr-2">
        <div className="flex items-center gap-2">
          <Avatar seed={payment.contactId} size="sm" />
          <span className="text-foreground text-sm">{contact?.name ?? 'Unknown'}</span>
        </div>
      </td>
      <td className="px-2 py-3">
        <span className="text-muted-foreground text-sm">
          {project?.name ?? '—'}
        </span>
      </td>
      <td className="px-2 py-3">
        <span className="text-foreground text-sm font-medium">
          {formatCurrency(payment.amount, payment.currency)}
        </span>
      </td>
      <td className="px-2 py-3">
        <span className="text-muted-foreground text-xs">{typeLabel[payment.type]}</span>
      </td>
      <td className="px-2 py-3">
        <Badge variant={status.variant}>{status.label}</Badge>
      </td>
      <td className="py-3 pr-4 pl-2 text-right">
        <span className="text-muted-foreground text-xs">
          {payment.paymentDate
            ? formatRelativeTime(payment.paymentDate)
            : formatRelativeTime(payment.createdAt)}
        </span>
      </td>
    </tr>
  );
}
