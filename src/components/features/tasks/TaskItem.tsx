import { Avatar } from '@/components/common';
import { formatRelativeTime } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Task, TaskPriority, TaskStatus } from '@/data/crm';

const priorityColor: Record<TaskPriority, string> = {
  low: 'bg-slate-500',
  medium: 'bg-amber-500',
  high: 'bg-rose-500',
};

const statusDotColor: Record<TaskStatus, string> = {
  todo: 'border-border border-2 bg-transparent',
  in_progress: 'bg-primary',
  done: 'bg-emerald-500',
};

const priorityLabel: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

interface TaskItemProps {
  task: Task;
  className?: string;
}

export function TaskItem({ task, className }: TaskItemProps) {
  return (
    <div className={cn('flex items-start gap-3 px-4 py-3', className)}>
      {/* Status dot */}
      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
        <span className={cn('h-3.5 w-3.5 rounded-full', statusDotColor[task.status])} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-sm font-medium',
            task.status === 'done' ? 'text-muted-foreground line-through' : 'text-foreground'
          )}
        >
          {task.title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          {/* Priority */}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className={cn('h-1.5 w-1.5 rounded-full', priorityColor[task.priority])} />
            {priorityLabel[task.priority]}
          </span>

          {/* Due date */}
          {task.dueDate ? (
            <span className="text-muted-foreground text-xs">
              Due {formatRelativeTime(task.dueDate)}
            </span>
          ) : null}
        </div>
      </div>

      {/* Assignee */}
      {task.assigneeId ? (
        <Avatar seed={task.assigneeId} size="xs" className="mt-0.5" />
      ) : null}
    </div>
  );
}
