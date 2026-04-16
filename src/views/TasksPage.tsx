import { TaskList } from '@/components/features/tasks/TaskList';
import { mockTasks } from '@/data/crm';

export function TasksPage() {
  return (
    <div className="flex flex-col gap-2 pb-6 pt-4">
      <TaskList tasks={mockTasks} />
    </div>
  );
}
