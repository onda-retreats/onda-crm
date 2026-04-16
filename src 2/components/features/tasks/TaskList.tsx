import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { EmptyState } from '@/components/common';
import { cn } from '@/lib/utils';
import { TaskItem } from './TaskItem';
import type { Task, TaskStatus } from '@/data/crm';

type Filter = 'all' | TaskStatus;

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="flex flex-col gap-3">
      {/* Filter tabs */}
      <div className="flex gap-1 overflow-x-auto px-4 pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              filter === f.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:text-foreground border-border/60 border'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-card border-border/60 mx-4 divide-y divide-border/40 rounded-xl border">
        {filtered.length === 0 ? (
          <div className="p-4">
            <EmptyState icon={CheckSquare} title="No tasks" description="No tasks match this filter." />
          </div>
        ) : (
          filtered.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
