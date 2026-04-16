import { Badge } from '@/components/common';
import { cn } from '@/lib/utils';
import type { Template } from '@/data/crm';

interface TemplateCardProps {
  template: Template;
  className?: string;
}

export function TemplateCard({ template, className }: TemplateCardProps) {
  return (
    <div
      className={cn(
        'bg-card border-border/60 flex flex-col gap-3 rounded-xl border p-4',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-foreground text-sm font-semibold leading-tight">{template.title}</h3>
        <Badge variant="neutral">{template.scenario}</Badge>
      </div>
      <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
        {template.content}
      </p>
    </div>
  );
}
