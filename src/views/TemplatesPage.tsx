import { FileText } from 'lucide-react';
import { EmptyState } from '@/components/common';
import { TemplateCard } from '@/components/features/templates/TemplateCard';
import { mockTemplates } from '@/data/crm';

export function TemplatesPage() {
  return (
    <div className="flex flex-col gap-2 pb-6 pt-4">
      <div className="grid grid-cols-1 gap-3 px-4">
        {mockTemplates.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No templates"
            description="Create reply templates to speed up your conversations."
          />
        ) : (
          mockTemplates.map((template) => <TemplateCard key={template.id} template={template} />)
        )}
      </div>
    </div>
  );
}
