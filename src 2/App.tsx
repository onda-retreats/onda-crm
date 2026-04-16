import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Kanban,
  MessageSquare,
  CreditCard,
  CheckSquare,
  FolderOpen,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TopBar } from '@/components/common';

import { DashboardPage } from '@/views/DashboardPage';
import { ContactsPage } from '@/views/ContactsPage';
import { PipelinePage } from '@/views/PipelinePage';
import { ConversationsPage } from '@/views/ConversationsPage';
import { PaymentsPage } from '@/views/PaymentsPage';
import { TasksPage } from '@/views/TasksPage';
import { ProjectsPage } from '@/views/ProjectsPage';
import { TemplatesPage } from '@/views/TemplatesPage';

const NAV_ITEMS: Array<{
  to: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}> = [
  { to: '/', label: 'Dashboard', Icon: LayoutDashboard, exact: true },
  { to: '/contacts', label: 'Contacts', Icon: Users },
  { to: '/pipeline', label: 'Pipeline', Icon: Kanban },
  { to: '/conversations', label: 'Conversations', Icon: MessageSquare },
  { to: '/payments', label: 'Payments', Icon: CreditCard },
  { to: '/tasks', label: 'Tasks', Icon: CheckSquare },
  { to: '/projects', label: 'Projects', Icon: FolderOpen },
  { to: '/templates', label: 'Templates', Icon: FileText },
];

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/contacts': 'Contacts',
  '/pipeline': 'Pipeline',
  '/conversations': 'Conversations',
  '/payments': 'Payments',
  '/tasks': 'Tasks',
  '/projects': 'Projects',
  '/templates': 'Templates',
};

function Sidebar() {
  return (
    <aside className="bg-background border-border/60 flex h-screen w-60 shrink-0 flex-col border-r">
      {/* Logo */}
      <div className="border-border/60 flex items-center gap-2 border-b px-4 py-4">
        <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-lg">
          <span className="text-primary-foreground text-xs font-bold">O</span>
        </div>
        <span className="text-foreground text-sm font-semibold">Onda Retreats</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
        {NAV_ITEMS.map(({ to, label, Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-card text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-card/60 hover:text-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <span className="bg-primary absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full" />
                ) : null}
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

function PageTitle() {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? 'Onda Retreats';
  return <TopBar title={title} sticky />;
}

function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <PageTitle />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/pipeline" element={<PipelinePage />} />
            <Route path="/conversations" element={<ConversationsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
