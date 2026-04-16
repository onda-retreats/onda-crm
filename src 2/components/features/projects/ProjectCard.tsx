import { Badge } from '@/components/common';
import { formatRelativeTime } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/crm';
import { mockDeals, mockPayments } from '@/data/crm';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const dealsCount = mockDeals.filter((d) => d.projectId === project.id).length;
  const contactIds = new Set(
    mockDeals.filter((d) => d.projectId === project.id).map((d) => d.contactId)
  );
  const contactsCount = contactIds.size;
  const paymentsCount = mockPayments.filter((p) => p.projectId === project.id).length;

  return (
    <div
      className={cn(
        'bg-card border-border/60 flex flex-col gap-3 rounded-xl border p-4',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-foreground text-sm font-semibold leading-tight">{project.name}</h3>
        <Badge variant={project.status === 'active' ? 'success' : 'neutral'}>
          {project.status === 'active' ? 'Active' : 'Archived'}
        </Badge>
      </div>

      {project.description ? (
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
          {project.description}
        </p>
      ) : null}

      {/* Dates */}
      <div className="text-muted-foreground text-xs">
        Started {formatRelativeTime(project.startDate)}
        {project.endDate ? ` · Ends ${formatRelativeTime(project.endDate)}` : ''}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-3">
        <div className="text-center">
          <p className="text-foreground text-sm font-semibold">{dealsCount}</p>
          <p className="text-muted-foreground text-[10px]">Deals</p>
        </div>
        <div className="text-center">
          <p className="text-foreground text-sm font-semibold">{contactsCount}</p>
          <p className="text-muted-foreground text-[10px]">Contacts</p>
        </div>
        <div className="text-center">
          <p className="text-foreground text-sm font-semibold">{paymentsCount}</p>
          <p className="text-muted-foreground text-[10px]">Payments</p>
        </div>
      </div>
    </div>
  );
}
