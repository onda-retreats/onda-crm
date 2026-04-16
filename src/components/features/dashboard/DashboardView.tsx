import { formatCurrency } from '@/lib/format';
import { StatCard } from './StatCard';
import {
  mockContacts,
  mockDeals,
  mockPayments,
  mockConversations,
  mockTasks,
} from '@/data/crm';

export function DashboardView() {
  const totalContacts = mockContacts.length;

  const openDeals = mockDeals.filter(
    (d) =>
      d.stage !== 'Lost' &&
      d.stage !== 'Confirmed' &&
      d.stage !== 'Fully Paid'
  ).length;

  const expectedRevenue = mockDeals
    .filter((d) => d.stage !== 'Lost')
    .reduce((sum, d) => sum + d.expectedAmount, 0);

  const overduePayments = mockPayments.filter((p) => p.status === 'overdue').length;

  const openConversations = mockConversations.filter(
    (c) => c.status === 'open' || c.status === 'waiting_us'
  ).length;

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const tasksDueToday = mockTasks.filter(
    (t) =>
      t.status !== 'done' &&
      t.dueDate &&
      t.dueDate >= startOfDay &&
      t.dueDate < endOfDay
  ).length;

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      <StatCard
        label="Total contacts"
        value={totalContacts}
        trend={{ direction: 'up', label: '+3 this week' }}
      />
      <StatCard
        label="Open deals"
        value={openDeals}
        trend={{ direction: 'up', label: '+2 this week' }}
      />
      <StatCard
        label="Expected revenue"
        value={formatCurrency(expectedRevenue, 'EUR')}
        trend={{ direction: 'up', label: 'Active pipeline' }}
      />
      <StatCard
        label="Overdue payments"
        value={overduePayments}
        trend={overduePayments > 0 ? { direction: 'down', label: 'Needs attention' } : undefined}
      />
      <StatCard
        label="Open conversations"
        value={openConversations}
      />
      <StatCard
        label="Tasks due today"
        value={tasksDueToday}
        trend={tasksDueToday > 0 ? { direction: 'down', label: 'Action needed' } : undefined}
      />
    </div>
  );
}
