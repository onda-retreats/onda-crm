import { FolderOpen } from 'lucide-react';
import { EmptyState } from '@/components/common';
import { ProjectCard } from '@/components/features/projects/ProjectCard';
import { mockProjects } from '@/data/crm';

export function ProjectsPage() {
  return (
    <div className="flex flex-col gap-2 pb-6 pt-4">
      <div className="grid grid-cols-1 gap-3 px-4">
        {mockProjects.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No projects"
            description="Create your first project to get started."
          />
        ) : (
          mockProjects.map((project) => <ProjectCard key={project.id} project={project} />)
        )}
      </div>
    </div>
  );
}
