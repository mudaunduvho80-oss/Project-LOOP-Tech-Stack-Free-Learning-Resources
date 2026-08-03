export type ViewMode = 
  | 'dashboard'
  | 'tasks'
  | 'calendar'
  | 'focus'
  | 'goals'
  | 'analytics'
  | 'notes'
  | 'ask-loop'
  | 'integrations'
  | 'settings';

export type TaskPriority = 'High' | 'Medium' | 'Low' | 'In Progress';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface TaskItem {
  id: string;
  title: string;
  category: string; // e.g. 'Shipping', 'Pricing', 'Customer Support', 'Product Quality'
  priority: TaskPriority;
  status: TaskStatus;
  dueTime: string;
  date: string;
  aiConfidence: number; // e.g. 94%
  notes?: string;
  assignedTo?: string;
  workspace?: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  category: string;
  type: 'meeting' | 'deadline' | 'focus';
}

export interface ProductivityTrendPoint {
  day: string;
  positive: number;
  neutral: number;
  focusScore: number;
}

export interface FocusCategoryPoint {
  category: string;
  percentage: number;
  hours: number;
  color: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'ai' | 'task' | 'reminder';
}
