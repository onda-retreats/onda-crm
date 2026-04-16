import { PaymentList } from '@/components/features/payments/PaymentList';
import { mockPayments } from '@/data/crm';

export function PaymentsPage() {
  return (
    <div className="flex flex-col gap-2 pb-6 pt-4">
      <PaymentList payments={mockPayments} />
    </div>
  );
}
