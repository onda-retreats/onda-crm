import { CreditCard } from 'lucide-react';
import { EmptyState } from '@/components/common';
import { formatCurrency } from '@/lib/format';
import { PaymentRow } from './PaymentRow';
import type { Payment } from '@/data/crm';

interface PaymentListProps {
  payments: Payment[];
}

export function PaymentList({ payments }: PaymentListProps) {
  const total = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const overdue = payments.filter((p) => p.status === 'overdue');

  return (
    <div className="flex flex-col gap-4 px-4">
      {/* Summary row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border-border/60 rounded-xl border p-3">
          <p className="text-muted-foreground text-xs">Total received</p>
          <p className="text-foreground text-lg font-semibold">{formatCurrency(total, 'EUR')}</p>
        </div>
        <div className="bg-card border-border/60 rounded-xl border p-3">
          <p className="text-muted-foreground text-xs">Overdue</p>
          <p className="text-rose-400 text-lg font-semibold">{overdue.length}</p>
        </div>
      </div>

      {/* Table */}
      {payments.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No payments"
          description="No payment records found."
        />
      ) : (
        <div className="bg-card border-border/60 overflow-hidden rounded-xl border">
          <table className="w-full">
            <thead>
              <tr className="border-border/40 border-b">
                <th className="text-muted-foreground py-2.5 pl-4 pr-2 text-left text-xs font-medium">
                  Contact
                </th>
                <th className="text-muted-foreground px-2 py-2.5 text-left text-xs font-medium">
                  Project
                </th>
                <th className="text-muted-foreground px-2 py-2.5 text-left text-xs font-medium">
                  Amount
                </th>
                <th className="text-muted-foreground px-2 py-2.5 text-left text-xs font-medium">
                  Type
                </th>
                <th className="text-muted-foreground px-2 py-2.5 text-left text-xs font-medium">
                  Status
                </th>
                <th className="text-muted-foreground py-2.5 pr-4 pl-2 text-right text-xs font-medium">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
