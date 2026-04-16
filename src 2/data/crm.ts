import { pickName, pickTimestamp, pickPrice, pickParagraph } from '@/lib/mock';
import type { Id } from '@/types/common';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContactCategory = 'Team' | 'Collaboration' | 'Leads';

export interface Contact {
  id: Id;
  name: string;
  handle?: string;
  phone?: string;
  category: ContactCategory;
  tags: string[];
  notes?: string;
  assignedManager?: string;
  createdAt: Date;
  lastActivityAt: Date;
}

export interface Project {
  id: Id;
  name: string;
  status: 'active' | 'archived';
  description?: string;
  startDate: Date;
  endDate?: Date;
}

export type DealStage =
  | 'New'
  | 'Contacted'
  | 'Warm'
  | 'Considering'
  | 'Waiting Deposit'
  | 'Partially Paid'
  | 'Fully Paid'
  | 'Confirmed'
  | 'Lost';

export interface Deal {
  id: Id;
  contactId: Id;
  stage: DealStage;
  projectId?: Id;
  expectedAmount: number;
  receivedAmount: number;
  currency: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentType = 'deposit' | 'partial' | 'full' | 'refund';
export type PaymentStatus = 'expected' | 'paid' | 'overdue' | 'refunded';

export interface Payment {
  id: Id;
  contactId: Id;
  projectId?: Id;
  dealId?: Id;
  amount: number;
  currency: string;
  type: PaymentType;
  status: PaymentStatus;
  paymentDate?: Date;
  note?: string;
  createdAt: Date;
}

export type Channel = 'instagram' | 'whatsapp' | 'email' | 'telegram';
export type ConversationStatus = 'open' | 'waiting_us' | 'waiting_client' | 'closed';

export interface Conversation {
  id: Id;
  contactId: Id;
  channel: Channel;
  status: ConversationStatus;
  lastMessage: string;
  lastMessageDate: Date;
  lastMessageFrom: 'us' | 'client';
  projectId?: Id;
  dealId?: Id;
  // Instagram thread ID from the platform
  externalThreadId?: string;
  // Last time this conversation was synced from the platform
  lastSyncAt?: Date;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: Id;
  title: string;
  description?: string;
  contactId?: Id;
  projectId?: Id;
  dealId?: Id;
  assigneeId?: Id;
  dueDate?: Date;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
}

export interface Template {
  id: Id;
  title: string;
  content: string;
  scenario: string;
  createdAt: Date;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Onda Community',
    status: 'active',
    description: 'Building and nurturing the Onda Retreats online community.',
    startDate: pickTimestamp(60 * 24 * 90),
  },
  {
    id: 'proj-2',
    name: 'Lanzarote Retreat May',
    status: 'active',
    description: 'Five-day surf and yoga retreat in Lanzarote, May 2026.',
    startDate: pickTimestamp(60 * 24 * 30),
    endDate: pickTimestamp(-60 * 24 * 20),
  },
  {
    id: 'proj-3',
    name: 'Ireland Retreat August',
    status: 'active',
    description: 'Wild Atlantic coastline retreat, August 2026.',
    startDate: pickTimestamp(60 * 24 * 10),
    endDate: pickTimestamp(-60 * 24 * 60),
  },
];

export const mockContacts: Contact[] = [
  {
    id: 'c-1',
    name: pickName('c-1'),
    handle: '@' + pickName('c-1').split(' ')[0]!.toLowerCase(),
    category: 'Team',
    tags: ['manager', 'sales'],
    notes: pickParagraph('c-1'),
    createdAt: pickTimestamp(60 * 24 * 120),
    lastActivityAt: pickTimestamp(30),
  },
  {
    id: 'c-2',
    name: pickName('c-2'),
    handle: '@' + pickName('c-2').split(' ')[0]!.toLowerCase(),
    phone: '+34 612 345 678',
    category: 'Team',
    tags: ['operations'],
    createdAt: pickTimestamp(60 * 24 * 100),
    lastActivityAt: pickTimestamp(60 * 2),
  },
  {
    id: 'c-3',
    name: pickName('c-3'),
    category: 'Team',
    tags: ['marketing', 'social'],
    notes: pickParagraph('c-3'),
    createdAt: pickTimestamp(60 * 24 * 80),
    lastActivityAt: pickTimestamp(60 * 5),
  },
  {
    id: 'c-4',
    name: pickName('c-4'),
    handle: '@' + pickName('c-4').split(' ')[0]!.toLowerCase(),
    category: 'Collaboration',
    tags: ['yoga', 'instructor'],
    notes: pickParagraph('c-4'),
    createdAt: pickTimestamp(60 * 24 * 60),
    lastActivityAt: pickTimestamp(60 * 24),
  },
  {
    id: 'c-5',
    name: pickName('c-5'),
    phone: '+353 87 234 5678',
    category: 'Collaboration',
    tags: ['photographer'],
    createdAt: pickTimestamp(60 * 24 * 55),
    lastActivityAt: pickTimestamp(60 * 48),
  },
  {
    id: 'c-6',
    name: pickName('c-6'),
    handle: '@' + pickName('c-6').split(' ')[0]!.toLowerCase(),
    category: 'Collaboration',
    tags: ['surf', 'instructor'],
    notes: pickParagraph('c-6'),
    createdAt: pickTimestamp(60 * 24 * 45),
    lastActivityAt: pickTimestamp(60 * 3),
  },
  {
    id: 'c-7',
    name: pickName('c-7'),
    phone: '+1 310 555 0192',
    category: 'Leads',
    tags: ['interested', 'lanzarote'],
    notes: pickParagraph('c-7'),
    createdAt: pickTimestamp(60 * 24 * 14),
    lastActivityAt: pickTimestamp(60),
  },
  {
    id: 'c-8',
    name: pickName('c-8'),
    handle: '@' + pickName('c-8').split(' ')[0]!.toLowerCase(),
    category: 'Leads',
    tags: ['hot-lead', 'ireland'],
    createdAt: pickTimestamp(60 * 24 * 10),
    lastActivityAt: pickTimestamp(20),
  },
  {
    id: 'c-9',
    name: pickName('c-9'),
    phone: '+44 7700 900123',
    category: 'Leads',
    tags: ['newsletter'],
    notes: pickParagraph('c-9'),
    createdAt: pickTimestamp(60 * 24 * 8),
    lastActivityAt: pickTimestamp(60 * 72),
  },
  {
    id: 'c-10',
    name: pickName('c-10'),
    handle: '@' + pickName('c-10').split(' ')[0]!.toLowerCase(),
    category: 'Leads',
    tags: ['social-media', 'warm'],
    createdAt: pickTimestamp(60 * 24 * 6),
    lastActivityAt: pickTimestamp(60 * 12),
  },
  {
    id: 'c-11',
    name: pickName('c-11'),
    phone: '+49 151 12345678',
    category: 'Leads',
    tags: ['cold'],
    createdAt: pickTimestamp(60 * 24 * 4),
    lastActivityAt: pickTimestamp(60 * 24 * 3),
  },
  {
    id: 'c-12',
    name: pickName('c-12'),
    category: 'Collaboration',
    tags: ['venue', 'partner'],
    notes: pickParagraph('c-12'),
    createdAt: pickTimestamp(60 * 24 * 50),
    lastActivityAt: pickTimestamp(60 * 6),
  },
  {
    id: 'c-13',
    name: pickName('c-13'),
    handle: '@' + pickName('c-13').split(' ')[0]!.toLowerCase(),
    category: 'Leads',
    tags: ['referral', 'ireland'],
    createdAt: pickTimestamp(60 * 24 * 2),
    lastActivityAt: pickTimestamp(45),
  },
  {
    id: 'c-14',
    name: pickName('c-14'),
    phone: '+33 6 12 34 56 78',
    category: 'Team',
    tags: ['finance'],
    notes: pickParagraph('c-14'),
    createdAt: pickTimestamp(60 * 24 * 150),
    lastActivityAt: pickTimestamp(60 * 4),
  },
  {
    id: 'c-15',
    name: pickName('c-15'),
    handle: '@' + pickName('c-15').split(' ')[0]!.toLowerCase(),
    category: 'Leads',
    tags: ['considering', 'lanzarote'],
    notes: pickParagraph('c-15'),
    createdAt: pickTimestamp(60 * 24 * 7),
    lastActivityAt: pickTimestamp(60 * 36),
  },
];

export const mockDeals: Deal[] = [
  {
    id: 'd-1',
    contactId: 'c-7',
    stage: 'New',
    projectId: 'proj-2',
    expectedAmount: pickPrice('d-1', 800, 2500),
    receivedAmount: 0,
    currency: 'EUR',
    notes: pickParagraph('d-1'),
    createdAt: pickTimestamp(60 * 24 * 14),
    updatedAt: pickTimestamp(60 * 24),
  },
  {
    id: 'd-2',
    contactId: 'c-8',
    stage: 'Contacted',
    projectId: 'proj-3',
    expectedAmount: pickPrice('d-2', 800, 2500),
    receivedAmount: 0,
    currency: 'EUR',
    createdAt: pickTimestamp(60 * 24 * 10),
    updatedAt: pickTimestamp(60 * 2),
  },
  {
    id: 'd-3',
    contactId: 'c-9',
    stage: 'Warm',
    projectId: 'proj-2',
    expectedAmount: pickPrice('d-3', 800, 2500),
    receivedAmount: 0,
    currency: 'EUR',
    notes: pickParagraph('d-3'),
    createdAt: pickTimestamp(60 * 24 * 9),
    updatedAt: pickTimestamp(60 * 3),
  },
  {
    id: 'd-4',
    contactId: 'c-10',
    stage: 'Considering',
    projectId: 'proj-3',
    expectedAmount: pickPrice('d-4', 800, 2500),
    receivedAmount: 0,
    currency: 'EUR',
    createdAt: pickTimestamp(60 * 24 * 6),
    updatedAt: pickTimestamp(60 * 12),
  },
  {
    id: 'd-5',
    contactId: 'c-11',
    stage: 'Waiting Deposit',
    projectId: 'proj-2',
    expectedAmount: pickPrice('d-5', 800, 2500),
    receivedAmount: 0,
    currency: 'EUR',
    notes: pickParagraph('d-5'),
    createdAt: pickTimestamp(60 * 24 * 5),
    updatedAt: pickTimestamp(60 * 24),
  },
  {
    id: 'd-6',
    contactId: 'c-13',
    stage: 'Partially Paid',
    projectId: 'proj-3',
    expectedAmount: pickPrice('d-6', 800, 2500),
    receivedAmount: pickPrice('d-6-recv', 200, 500),
    currency: 'EUR',
    createdAt: pickTimestamp(60 * 24 * 8),
    updatedAt: pickTimestamp(45),
  },
  {
    id: 'd-7',
    contactId: 'c-15',
    stage: 'Fully Paid',
    projectId: 'proj-2',
    expectedAmount: pickPrice('d-7', 800, 2500),
    receivedAmount: pickPrice('d-7', 800, 2500),
    currency: 'EUR',
    notes: pickParagraph('d-7'),
    createdAt: pickTimestamp(60 * 24 * 20),
    updatedAt: pickTimestamp(60 * 24 * 2),
  },
  {
    id: 'd-8',
    contactId: 'c-4',
    stage: 'Confirmed',
    projectId: 'proj-2',
    expectedAmount: pickPrice('d-8', 800, 2500),
    receivedAmount: pickPrice('d-8', 800, 2500),
    currency: 'EUR',
    createdAt: pickTimestamp(60 * 24 * 30),
    updatedAt: pickTimestamp(60 * 24 * 5),
  },
  {
    id: 'd-9',
    contactId: 'c-6',
    stage: 'Confirmed',
    projectId: 'proj-3',
    expectedAmount: pickPrice('d-9', 800, 2500),
    receivedAmount: pickPrice('d-9', 800, 2500),
    currency: 'EUR',
    createdAt: pickTimestamp(60 * 24 * 25),
    updatedAt: pickTimestamp(60 * 24 * 3),
  },
  {
    id: 'd-10',
    contactId: 'c-12',
    stage: 'Lost',
    projectId: 'proj-2',
    expectedAmount: pickPrice('d-10', 800, 2500),
    receivedAmount: 0,
    currency: 'EUR',
    notes: pickParagraph('d-10'),
    createdAt: pickTimestamp(60 * 24 * 15),
    updatedAt: pickTimestamp(60 * 24 * 4),
  },
  {
    id: 'd-11',
    contactId: 'c-5',
    stage: 'Warm',
    projectId: 'proj-1',
    expectedAmount: pickPrice('d-11', 800, 2500),
    receivedAmount: 0,
    currency: 'EUR',
    createdAt: pickTimestamp(60 * 24 * 4),
    updatedAt: pickTimestamp(60 * 6),
  },
  {
    id: 'd-12',
    contactId: 'c-3',
    stage: 'Contacted',
    projectId: 'proj-1',
    expectedAmount: pickPrice('d-12', 800, 2500),
    receivedAmount: 0,
    currency: 'EUR',
    notes: pickParagraph('d-12'),
    createdAt: pickTimestamp(60 * 24 * 3),
    updatedAt: pickTimestamp(60 * 8),
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'p-1',
    contactId: 'c-7',
    projectId: 'proj-2',
    dealId: 'd-1',
    amount: pickPrice('p-1', 200, 800),
    currency: 'EUR',
    type: 'deposit',
    status: 'expected',
    createdAt: pickTimestamp(60 * 24 * 14),
  },
  {
    id: 'p-2',
    contactId: 'c-8',
    projectId: 'proj-3',
    dealId: 'd-2',
    amount: pickPrice('p-2', 200, 800),
    currency: 'EUR',
    type: 'deposit',
    status: 'overdue',
    createdAt: pickTimestamp(60 * 24 * 10),
  },
  {
    id: 'p-3',
    contactId: 'c-13',
    projectId: 'proj-3',
    dealId: 'd-6',
    amount: pickPrice('p-3', 200, 800),
    currency: 'EUR',
    type: 'partial',
    status: 'paid',
    paymentDate: pickTimestamp(60 * 24 * 2),
    note: pickParagraph('p-3'),
    createdAt: pickTimestamp(60 * 24 * 8),
  },
  {
    id: 'p-4',
    contactId: 'c-15',
    projectId: 'proj-2',
    dealId: 'd-7',
    amount: pickPrice('p-4', 800, 2500),
    currency: 'EUR',
    type: 'full',
    status: 'paid',
    paymentDate: pickTimestamp(60 * 24 * 5),
    createdAt: pickTimestamp(60 * 24 * 20),
  },
  {
    id: 'p-5',
    contactId: 'c-4',
    projectId: 'proj-2',
    dealId: 'd-8',
    amount: pickPrice('p-5', 800, 2500),
    currency: 'EUR',
    type: 'full',
    status: 'paid',
    paymentDate: pickTimestamp(60 * 24 * 10),
    createdAt: pickTimestamp(60 * 24 * 30),
  },
  {
    id: 'p-6',
    contactId: 'c-6',
    projectId: 'proj-3',
    dealId: 'd-9',
    amount: pickPrice('p-6', 800, 2500),
    currency: 'EUR',
    type: 'full',
    status: 'paid',
    paymentDate: pickTimestamp(60 * 24 * 8),
    createdAt: pickTimestamp(60 * 24 * 25),
  },
  {
    id: 'p-7',
    contactId: 'c-12',
    projectId: 'proj-2',
    dealId: 'd-10',
    amount: pickPrice('p-7', 200, 500),
    currency: 'EUR',
    type: 'refund',
    status: 'refunded',
    paymentDate: pickTimestamp(60 * 24 * 3),
    note: pickParagraph('p-7'),
    createdAt: pickTimestamp(60 * 24 * 15),
  },
  {
    id: 'p-8',
    contactId: 'c-9',
    projectId: 'proj-2',
    dealId: 'd-3',
    amount: pickPrice('p-8', 200, 500),
    currency: 'EUR',
    type: 'deposit',
    status: 'overdue',
    createdAt: pickTimestamp(60 * 24 * 7),
  },
  {
    id: 'p-9',
    contactId: 'c-11',
    projectId: 'proj-2',
    dealId: 'd-5',
    amount: pickPrice('p-9', 200, 800),
    currency: 'EUR',
    type: 'deposit',
    status: 'expected',
    createdAt: pickTimestamp(60 * 24 * 5),
  },
  {
    id: 'p-10',
    contactId: 'c-10',
    projectId: 'proj-3',
    dealId: 'd-4',
    amount: pickPrice('p-10', 200, 800),
    currency: 'EUR',
    type: 'partial',
    status: 'expected',
    createdAt: pickTimestamp(60 * 24 * 6),
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    contactId: 'c-8',
    channel: 'instagram',
    status: 'open',
    lastMessage: 'Really interested in the Ireland retreat! Can you send me more details?',
    lastMessageDate: pickTimestamp(20),
    lastMessageFrom: 'client',
    projectId: 'proj-3',
    dealId: 'd-2',
  },
  {
    id: 'conv-2',
    contactId: 'c-7',
    channel: 'whatsapp',
    status: 'waiting_us',
    lastMessage: pickParagraph('conv-2'),
    lastMessageDate: pickTimestamp(60),
    lastMessageFrom: 'client',
    projectId: 'proj-2',
    dealId: 'd-1',
  },
  {
    id: 'conv-3',
    contactId: 'c-13',
    channel: 'email',
    status: 'waiting_client',
    lastMessage: 'Sent you the payment link, please confirm once done.',
    lastMessageDate: pickTimestamp(60 * 3),
    lastMessageFrom: 'us',
    projectId: 'proj-3',
    dealId: 'd-6',
  },
  {
    id: 'conv-4',
    contactId: 'c-10',
    channel: 'telegram',
    status: 'open',
    lastMessage: 'Is there a group discount for friends who book together?',
    lastMessageDate: pickTimestamp(60 * 5),
    lastMessageFrom: 'client',
    projectId: 'proj-3',
  },
  {
    id: 'conv-5',
    contactId: 'c-4',
    channel: 'whatsapp',
    status: 'closed',
    lastMessage: 'Great, see you in May!',
    lastMessageDate: pickTimestamp(60 * 24 * 5),
    lastMessageFrom: 'client',
    projectId: 'proj-2',
    dealId: 'd-8',
  },
  {
    id: 'conv-6',
    contactId: 'c-6',
    channel: 'instagram',
    status: 'closed',
    lastMessage: 'Confirmed! Payment received. Looking forward to it.',
    lastMessageDate: pickTimestamp(60 * 24 * 8),
    lastMessageFrom: 'us',
    projectId: 'proj-3',
    dealId: 'd-9',
  },
  {
    id: 'conv-7',
    contactId: 'c-15',
    channel: 'email',
    status: 'waiting_client',
    lastMessage: pickParagraph('conv-7'),
    lastMessageDate: pickTimestamp(60 * 36),
    lastMessageFrom: 'us',
    projectId: 'proj-2',
  },
  {
    id: 'conv-8',
    contactId: 'c-9',
    channel: 'whatsapp',
    status: 'open',
    lastMessage: 'Thinking about it — what dates are still available?',
    lastMessageDate: pickTimestamp(60 * 72),
    lastMessageFrom: 'client',
    projectId: 'proj-2',
    dealId: 'd-3',
  },
];

export const mockTasks: Task[] = [
  {
    id: 't-1',
    title: 'Send welcome pack to new leads',
    description: pickParagraph('t-1'),
    projectId: 'proj-2',
    assigneeId: 'c-1',
    dueDate: pickTimestamp(-60 * 24),
    status: 'todo',
    priority: 'high',
    createdAt: pickTimestamp(60 * 24 * 3),
  },
  {
    id: 't-2',
    title: 'Follow up with deposit overdue contacts',
    contactId: 'c-8',
    dealId: 'd-2',
    assigneeId: 'c-2',
    dueDate: pickTimestamp(-60 * 8),
    status: 'todo',
    priority: 'high',
    createdAt: pickTimestamp(60 * 24 * 2),
  },
  {
    id: 't-3',
    title: 'Review Ireland retreat itinerary',
    description: pickParagraph('t-3'),
    projectId: 'proj-3',
    assigneeId: 'c-1',
    dueDate: pickTimestamp(-60 * 24 * 3),
    status: 'in_progress',
    priority: 'medium',
    createdAt: pickTimestamp(60 * 24 * 5),
  },
  {
    id: 't-4',
    title: 'Update Lanzarote retreat photos on website',
    projectId: 'proj-2',
    assigneeId: 'c-3',
    dueDate: pickTimestamp(-60 * 24 * 5),
    status: 'in_progress',
    priority: 'low',
    createdAt: pickTimestamp(60 * 24 * 7),
  },
  {
    id: 't-5',
    title: 'Confirm yoga instructor availability',
    contactId: 'c-4',
    projectId: 'proj-2',
    assigneeId: 'c-1',
    dueDate: pickTimestamp(-60 * 24 * 7),
    status: 'done',
    priority: 'high',
    createdAt: pickTimestamp(60 * 24 * 10),
  },
  {
    id: 't-6',
    title: 'Process refund for cancelled booking',
    contactId: 'c-12',
    dealId: 'd-10',
    assigneeId: 'c-14',
    dueDate: pickTimestamp(-60 * 24 * 2),
    status: 'done',
    priority: 'medium',
    createdAt: pickTimestamp(60 * 24 * 4),
  },
  {
    id: 't-7',
    title: 'Draft newsletter for Onda Community',
    projectId: 'proj-1',
    assigneeId: 'c-3',
    dueDate: pickTimestamp(-60 * 24 * 10),
    status: 'todo',
    priority: 'medium',
    createdAt: pickTimestamp(60 * 24 * 1),
  },
  {
    id: 't-8',
    title: 'Set up photographer contract',
    contactId: 'c-5',
    projectId: 'proj-3',
    assigneeId: 'c-2',
    dueDate: pickTimestamp(-60 * 24 * 14),
    status: 'in_progress',
    priority: 'medium',
    createdAt: pickTimestamp(60 * 24 * 6),
  },
  {
    id: 't-9',
    title: 'Create booking confirmation template',
    assigneeId: 'c-1',
    dueDate: pickTimestamp(-60 * 24 * 1),
    status: 'todo',
    priority: 'low',
    createdAt: pickTimestamp(60 * 24 * 2),
  },
  {
    id: 't-10',
    title: 'Reconcile May retreat payments',
    projectId: 'proj-2',
    assigneeId: 'c-14',
    dueDate: pickTimestamp(-60 * 24 * 20),
    status: 'done',
    priority: 'high',
    createdAt: pickTimestamp(60 * 24 * 15),
  },
];

export const mockTemplates: Template[] = [
  {
    id: 'tpl-1',
    title: 'Initial Inquiry Response',
    content:
      'Hi! Thanks so much for reaching out about Onda Retreats. We\'d love to tell you more. Our upcoming retreat is in {{location}} from {{dates}}. Spaces are limited — would you like a full details pack?',
    scenario: 'First Contact',
    createdAt: pickTimestamp(60 * 24 * 60),
  },
  {
    id: 'tpl-2',
    title: 'Deposit Reminder',
    content:
      'Hey {{name}}, just a friendly nudge — your deposit of {{amount}} to hold your spot on the {{retreat}} retreat is due by {{date}}. Here\'s the payment link: {{link}}. Let me know if you have any questions!',
    scenario: 'Payment Follow-up',
    createdAt: pickTimestamp(60 * 24 * 45),
  },
  {
    id: 'tpl-3',
    title: 'Booking Confirmed',
    content:
      'Wonderful news, {{name}}! Your spot on the {{retreat}} retreat is now confirmed. We\'ll send a full welcome pack with packing list, schedule, and accommodation details 3 weeks before departure. So excited to have you with us!',
    scenario: 'Booking Confirmation',
    createdAt: pickTimestamp(60 * 24 * 40),
  },
  {
    id: 'tpl-4',
    title: 'Warm Lead Nurture',
    content:
      'Hi {{name}}, it was great chatting earlier! I wanted to share a few testimonials from past retreaters — they capture the vibe better than I can. Any questions, I\'m here. No pressure at all, just want to make sure you have everything you need to decide.',
    scenario: 'Nurture Sequence',
    createdAt: pickTimestamp(60 * 24 * 30),
  },
  {
    id: 'tpl-5',
    title: 'Post-Retreat Check-in',
    content:
      'Hey {{name}}, hope you\'re still riding that post-retreat glow! We\'d love to hear how you\'re feeling a week on. And if you\'re already thinking about the next one... early bird spots for {{next_retreat}} open next month.',
    scenario: 'Post-Event Follow-up',
    createdAt: pickTimestamp(60 * 24 * 20),
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getContactById(id: Id): Contact | undefined {
  return mockContacts.find((c) => c.id === id);
}

export function getProjectById(id: Id): Project | undefined {
  return mockProjects.find((p) => p.id === id);
}

export function getDealById(id: Id): Deal | undefined {
  return mockDeals.find((d) => d.id === id);
}

export const ALL_DEAL_STAGES: DealStage[] = [
  'New', 'Contacted', 'Warm', 'Considering',
  'Waiting Deposit', 'Partially Paid', 'Fully Paid', 'Confirmed', 'Lost',
];

// ─── Messaging Types ───────────────────────────────────────────────────────────

export type MessageDirection = 'inbound' | 'outbound';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Message {
  id: Id;
  conversationId: Id;
  content: string;
  direction: MessageDirection;
  channel: Channel;
  timestamp: Date;
  status: MessageStatus;
  // External IDs from Instagram/WhatsApp APIs
  externalId?: string;       // e.g. Instagram message ID
  externalSenderId?: string; // Instagram user PSID
  // true = came via webhook from platform; false = sent from CRM
  syncedFromPlatform: boolean;
  // If syncedFromPlatform=false and sender was CRM, this is 'crm'
  // If from platform, this is the contact handle or platform user ID
  senderRef?: string;
}

// Integration account (e.g. connected Instagram Business account)
export interface IntegrationAccount {
  id: Id;
  platform: Channel;
  // The external page/account ID (e.g. Instagram Page ID)
  externalAccountId: string;
  // Display name of the connected account
  accountName: string;
  connected: boolean;
  // Last time webhooks were received
  lastSyncAt?: Date;
  // NOTE: Access token is NEVER stored in frontend — lives in backend env
}

// ─── Mock Messages ─────────────────────────────────────────────────────────────

export const mockMessages: Message[] = [
  // conv-1 — Instagram, c-8 inquiring about Ireland retreat
  {
    id: 'msg-1-1',
    conversationId: 'conv-1',
    content: 'Hi! I saw your reel about the Ireland retreat and I\'m really interested. Is there still space available?',
    direction: 'inbound',
    channel: 'instagram',
    timestamp: pickTimestamp(60 * 24 * 3 + 40),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-8',
    externalSenderId: '10023456789',
    externalId: 'mid.inst.001',
  },
  {
    id: 'msg-1-2',
    conversationId: 'conv-1',
    content: 'Hey! Great to hear from you — yes, we still have a few spots left for the Ireland retreat in August. It\'s 7 nights on the Wild Atlantic coast, surf, yoga, and incredible food. Would you like me to send the full details pack?',
    direction: 'outbound',
    channel: 'instagram',
    timestamp: pickTimestamp(60 * 24 * 3 + 10),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'mid.inst.002',
  },
  {
    id: 'msg-1-3',
    conversationId: 'conv-1',
    content: 'Yes please! Also — what\'s the accommodation like? I prefer a private room if possible.',
    direction: 'inbound',
    channel: 'instagram',
    timestamp: pickTimestamp(60 * 24 * 2 + 20),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-8',
    externalSenderId: '10023456789',
    externalId: 'mid.inst.003',
  },
  {
    id: 'msg-1-4',
    conversationId: 'conv-1',
    content: 'Absolutely — private en-suite rooms are available for an upgrade. I\'ll include the accommodation options in the pack. Sending it over now!',
    direction: 'outbound',
    channel: 'instagram',
    timestamp: pickTimestamp(60 * 24 * 2),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'mid.inst.004',
  },
  {
    id: 'msg-1-5',
    conversationId: 'conv-1',
    content: 'Really interested in the Ireland retreat! Can you send me more details?',
    direction: 'inbound',
    channel: 'instagram',
    timestamp: pickTimestamp(20),
    status: 'delivered',
    syncedFromPlatform: true,
    senderRef: 'c-8',
    externalSenderId: '10023456789',
    externalId: 'mid.inst.005',
  },

  // conv-2 — WhatsApp, c-7 Lanzarote inquiry
  {
    id: 'msg-2-1',
    conversationId: 'conv-2',
    content: 'Hello! I found Onda Retreats through a friend. I\'m looking at the Lanzarote retreat in May — what\'s the price for a single traveller?',
    direction: 'inbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 + 90),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-7',
    externalId: 'wamid.001',
  },
  {
    id: 'msg-2-2',
    conversationId: 'conv-2',
    content: 'Hi! So happy your friend pointed you our way. For a single traveller, the Lanzarote retreat is €1,490 all-in — that covers accommodation, meals, surf and yoga sessions, and airport transfers. We also have an early bird rate of €1,290 if you book before April 30th.',
    direction: 'outbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 + 60),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'wamid.002',
  },
  {
    id: 'msg-2-3',
    conversationId: 'conv-2',
    content: 'That early bird sounds great! Is the deposit refundable if something comes up?',
    direction: 'inbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 + 30),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-7',
    externalId: 'wamid.003',
  },
  {
    id: 'msg-2-4',
    conversationId: 'conv-2',
    content: 'Good question — the €300 deposit is fully refundable up to 6 weeks before the retreat. After that we can offer a credit toward a future Onda event. Let me know if you\'d like to go ahead and I\'ll send the booking link!',
    direction: 'outbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'wamid.004',
  },
  {
    id: 'msg-2-5',
    conversationId: 'conv-2',
    content: 'Thinking it over — can you share what a typical day looks like on the retreat?',
    direction: 'inbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60),
    status: 'delivered',
    syncedFromPlatform: true,
    senderRef: 'c-7',
    externalId: 'wamid.005',
  },

  // conv-3 — Email, c-13 payment confirmation flow
  {
    id: 'msg-3-1',
    conversationId: 'conv-3',
    content: 'Hi, I just wanted to confirm that my partial payment went through. I transferred €400 this morning via bank transfer.',
    direction: 'inbound',
    channel: 'email',
    timestamp: pickTimestamp(60 * 24 + 45),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'c-13',
    externalId: 'email.001',
  },
  {
    id: 'msg-3-2',
    conversationId: 'conv-3',
    content: 'Hi! Yes, we\'ve received your €400 — thank you so much! Your remaining balance of €890 is due by July 15th. I\'ve updated your booking and will send the welcome pack 3 weeks before the retreat.',
    direction: 'outbound',
    channel: 'email',
    timestamp: pickTimestamp(60 * 24 + 20),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'email.002',
  },
  {
    id: 'msg-3-3',
    conversationId: 'conv-3',
    content: 'Perfect, thank you! Will I need to arrange my own travel to the venue or is there a shuttle from Dublin?',
    direction: 'inbound',
    channel: 'email',
    timestamp: pickTimestamp(60 * 8),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'c-13',
    externalId: 'email.003',
  },
  {
    id: 'msg-3-4',
    conversationId: 'conv-3',
    content: 'We organise a group shuttle from Dublin city centre — departure time and pickup point are in the welcome pack. If you\'re flying in, let me know your arrival time and we\'ll coordinate. Sent you the payment link, please confirm once done.',
    direction: 'outbound',
    channel: 'email',
    timestamp: pickTimestamp(60 * 3),
    status: 'delivered',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'email.004',
  },

  // conv-4 — Telegram, c-10 group discount
  {
    id: 'msg-4-1',
    conversationId: 'conv-4',
    content: 'Hey! A few of us from my yoga class are thinking about the Ireland retreat together. Do you do group bookings?',
    direction: 'inbound',
    channel: 'telegram',
    timestamp: pickTimestamp(60 * 24 + 10),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-10',
    externalId: 'tg.001',
  },
  {
    id: 'msg-4-2',
    conversationId: 'conv-4',
    content: 'That\'s so lovely — a yoga class group retreat is exactly our vibe! Yes, for 4+ people booking together we offer 10% off the full retreat price. How many people are you thinking?',
    direction: 'outbound',
    channel: 'telegram',
    timestamp: pickTimestamp(60 * 24),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'tg.002',
  },
  {
    id: 'msg-4-3',
    conversationId: 'conv-4',
    content: 'Probably 5 of us, maybe 6. We\'d want to be in rooms near each other if possible.',
    direction: 'inbound',
    channel: 'telegram',
    timestamp: pickTimestamp(60 * 12),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-10',
    externalId: 'tg.003',
  },
  {
    id: 'msg-4-4',
    conversationId: 'conv-4',
    content: 'Five or six is great — that would definitely qualify for the group rate! I can block adjacent rooms for you. Is there a group discount for friends who book together?',
    direction: 'inbound',
    channel: 'telegram',
    timestamp: pickTimestamp(60 * 5),
    status: 'delivered',
    syncedFromPlatform: true,
    senderRef: 'c-10',
    externalId: 'tg.004',
  },

  // conv-5 — WhatsApp, c-4 confirmed (closed)
  {
    id: 'msg-5-1',
    conversationId: 'conv-5',
    content: 'Hi! Just confirming my availability for the Lanzarote retreat as yoga instructor. The dates work perfectly.',
    direction: 'inbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 * 7 + 30),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-4',
    externalId: 'wamid.c4.001',
  },
  {
    id: 'msg-5-2',
    conversationId: 'conv-5',
    content: 'Amazing news! I\'ve confirmed your spot. Could you send over your session plan outline by the end of this week so we can include it in the pre-retreat comms?',
    direction: 'outbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 * 7),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'wamid.c4.002',
  },
  {
    id: 'msg-5-3',
    conversationId: 'conv-5',
    content: 'Sent the outline to your email. Also — would it be okay to include my Instagram handle in the program booklet?',
    direction: 'inbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 * 6),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-4',
    externalId: 'wamid.c4.003',
  },
  {
    id: 'msg-5-4',
    conversationId: 'conv-5',
    content: 'Of course — we\'d love to feature you! Payment will be processed 5 days before the retreat. Great, see you in May!',
    direction: 'inbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 * 5),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-4',
    externalId: 'wamid.c4.004',
  },

  // conv-6 — Instagram, c-6 confirmed surf instructor (closed)
  {
    id: 'msg-6-1',
    conversationId: 'conv-6',
    content: 'Hey Onda! Quick update — I\'ve sorted my board transport for August. All good from my end.',
    direction: 'inbound',
    channel: 'instagram',
    timestamp: pickTimestamp(60 * 24 * 10 + 30),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-6',
    externalSenderId: '10098765432',
    externalId: 'mid.inst.c6.001',
  },
  {
    id: 'msg-6-2',
    conversationId: 'conv-6',
    content: 'Perfect! We\'re providing wetsuit storage on-site too. Are you planning any beginner sessions alongside the intermediate ones?',
    direction: 'outbound',
    channel: 'instagram',
    timestamp: pickTimestamp(60 * 24 * 10),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'mid.inst.c6.002',
  },
  {
    id: 'msg-6-3',
    conversationId: 'conv-6',
    content: 'Yes — planning two beginner slots each morning and an intermediate session in the afternoon. Let me know if you want to adjust the schedule.',
    direction: 'inbound',
    channel: 'instagram',
    timestamp: pickTimestamp(60 * 24 * 9),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-6',
    externalSenderId: '10098765432',
    externalId: 'mid.inst.c6.003',
  },
  {
    id: 'msg-6-4',
    conversationId: 'conv-6',
    content: 'That schedule is perfect. Confirmed! Payment received. Looking forward to it.',
    direction: 'outbound',
    channel: 'instagram',
    timestamp: pickTimestamp(60 * 24 * 8),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'mid.inst.c6.004',
  },

  // conv-7 — Email, c-15 fully paid (waiting client)
  {
    id: 'msg-7-1',
    conversationId: 'conv-7',
    content: 'Hi, I\'ve completed my payment for the Lanzarote retreat. Just waiting on the welcome pack now!',
    direction: 'inbound',
    channel: 'email',
    timestamp: pickTimestamp(60 * 24 * 4),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'c-15',
    externalId: 'email.c15.001',
  },
  {
    id: 'msg-7-2',
    conversationId: 'conv-7',
    content: 'Brilliant — payment confirmed, thank you! You\'re all set for Lanzarote. The welcome pack will land in your inbox 3 weeks out. In the meantime, is there anything specific you\'d like to know — surf ability level, packing tips?',
    direction: 'outbound',
    channel: 'email',
    timestamp: pickTimestamp(60 * 24 * 3 + 30),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'email.c15.002',
  },
  {
    id: 'msg-7-3',
    conversationId: 'conv-7',
    content: 'Yes — I\'ve never tried surfing before. Will I be completely lost?',
    direction: 'inbound',
    channel: 'email',
    timestamp: pickTimestamp(60 * 24 * 3),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'c-15',
    externalId: 'email.c15.003',
  },
  {
    id: 'msg-7-4',
    conversationId: 'conv-7',
    content: 'Not at all — about half of our guests are complete beginners. We start every morning with a beach theory session and the instructors are brilliant with first-timers. You\'ll be standing by day two, I promise! Sent you a few testimonials from past first-time surfers.',
    direction: 'outbound',
    channel: 'email',
    timestamp: pickTimestamp(60 * 36),
    status: 'delivered',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'email.c15.004',
  },

  // conv-8 — WhatsApp, c-9 available dates inquiry
  {
    id: 'msg-8-1',
    conversationId: 'conv-8',
    content: 'Hi Onda! I signed up to your newsletter a while back. I\'m seriously considering the Lanzarote retreat but wanted to know — is it suitable for someone who works remotely and might need occasional wifi access?',
    direction: 'inbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 * 4),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-9',
    externalId: 'wamid.c9.001',
  },
  {
    id: 'msg-8-2',
    conversationId: 'conv-8',
    content: 'Great question! The venue has reliable wifi in the common areas. We do encourage a digital detox during sessions, but we totally understand that some guests need to stay reachable. Many remote workers have done Onda retreats — it works really well.',
    direction: 'outbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 * 3 + 30),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'wamid.c9.002',
  },
  {
    id: 'msg-8-3',
    conversationId: 'conv-8',
    content: 'That\'s reassuring! One more thing — are solo travellers common or will I feel out of place going alone?',
    direction: 'inbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 * 3),
    status: 'read',
    syncedFromPlatform: true,
    senderRef: 'c-9',
    externalId: 'wamid.c9.003',
  },
  {
    id: 'msg-8-4',
    conversationId: 'conv-8',
    content: 'Solo travellers make up about 60% of our guests — Onda is genuinely one of the best places to meet like-minded people. You\'ll leave with a group chat and probably a few new travel friends.',
    direction: 'outbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 24 * 2 + 30),
    status: 'read',
    syncedFromPlatform: false,
    senderRef: 'crm',
    externalId: 'wamid.c9.004',
  },
  {
    id: 'msg-8-5',
    conversationId: 'conv-8',
    content: 'Thinking about it — what dates are still available?',
    direction: 'inbound',
    channel: 'whatsapp',
    timestamp: pickTimestamp(60 * 72),
    status: 'delivered',
    syncedFromPlatform: true,
    senderRef: 'c-9',
    externalId: 'wamid.c9.005',
  },
];

export const mockIntegrationAccount: IntegrationAccount = {
  id: 'int-1',
  platform: 'instagram',
  externalAccountId: '17841234567890',
  accountName: '@ondaRetreats',
  connected: true,
  lastSyncAt: pickTimestamp(5),
};

// ─── Messaging Helpers ─────────────────────────────────────────────────────────

export function getMessagesByConversationId(convId: Id): Message[] {
  return mockMessages.filter((m) => m.conversationId === convId);
}
