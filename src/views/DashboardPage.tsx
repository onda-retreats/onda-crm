import { SectionHeader } from '@/components/common';
import { DashboardView } from '@/components/features/dashboard/DashboardView';
import { TaskItem } from '@/components/features/tasks/TaskItem';
import { ConversationItem } from '@/components/features/conversations/ConversationItem';
import { mockTasks, mockConversations } from '@/data/crm';

export function DashboardPage() {
  const recentTasks = mockTasks
    .filter((t) => t.status !== 'done')
    .slice(0, 4);

  const recentConversations = mockConversations
    .filter((c) => c.status === 'open' || c.status === 'waiting_us')
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-2 pb-6">
      <div className="px-4 pt-4 pb-2">
        <p className="text-muted-foreground text-xs">Overview for Onda Retreats</p>
      </div>

      <DashboardView />

      {/* Recent tasks */}
      <SectionHeader title="Upcoming tasks" />
      <div className="bg-card border-border/60 mx-4 divide-y divide-border/40 rounded-xl border">
        {recentTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      {/* Recent conversations */}
      <SectionHeader title="Active conversations" />
      <div className="bg-card border-border/60 mx-4 divide-y divide-border/40 rounded-xl border">
        {recentConversations.map((conv) => (
          <ConversationItem key={conv.id} conversation={conv} />
        ))}
      </div>
    </div>
  );
}
