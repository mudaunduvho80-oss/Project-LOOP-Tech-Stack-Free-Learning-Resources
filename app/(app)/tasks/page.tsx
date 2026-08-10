'use client';

import {  useState } from 'react';
import { CheckCircle2, MoreHorizontal, X, ChevronDown } from 'lucide-react';
import { PageTitle } from '@/components/FeaturePageLayout';

const initialTasks = [
  ['Finalize mobile app wireframes', 'Design', 'Today, 10:30 AM', 'High', 'To Do'],
  ['Review Q3 product roadmap', 'Strategy', 'Today, 12:00 PM', 'Medium', 'In Progress'],
  ['Prepare team stand-up notes', 'Team', 'Today, 2:30 PM', 'Low', 'To Do'],
  ['Reply to client feedback', 'Customer', 'Today, 4:00 PM', 'High', 'Done'],
];

const statusStyles = {
  'To Do': 'bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/20',
  'In Progress': 'bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20',
  Done: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20',
};

const priorityStyles = {
  High: 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/20',
  Medium: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20',
  Low: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const [completed, setCompleted] = useState<string[]>([
    'Reply to client feedback',
  ]);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editStatus, setEditStatus] = useState('To Do');
  const [editPriority, setEditPriority] = useState('Medium');
  const [editDueDate, setEditDueDate] = useState('');
  const [editDueTime, setEditDueTime] = useState('');

  const [openStatusMenu, setOpenStatusMenu] = useState(false);
  const [openPriorityMenu, setOpenPriorityMenu] = useState(false);

  const rows = tasks.filter(([title, , , , status]) => {
    const matchesSearch = title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesFilter =
      filter === 'All' ||
      (filter === 'Done' && status === 'Done') ||
      (filter === 'To Do' && status === 'To Do') ||
      (filter === 'In Progress' && status === 'In Progress');

    return matchesSearch && matchesFilter;
  });

  const toggle = (title: string) => {
    setTasks((current) =>
      current.map((task) => {
        if (task[0] !== title) return task;

        const newStatus = task[4] === 'Done' ? 'To Do' : 'Done';

        return [
          task[0],
          task[1],
          task[2],
          task[3],
          newStatus,
        ];
      })
    );

    setCompleted((value) =>
      value.includes(title)
        ? value.filter((item) => item !== title)
        : [...value, title]
    );
  };

  const openEdit = (task: string[]) => {
    const [title, , due, priority, status] = task;

    setEditingTask(title);
    setEditTitle(title);
    setEditStatus(status || 'To Do');
    setEditPriority(priority || 'Medium');

    const dueParts = due.split(', ');

    const datePart = dueParts[0] || '';
    const timePart = dueParts[1] || '';

    setEditDueDate(datePart === 'Today' ? '' : datePart);

    if (timePart) {
      const timeMatch = timePart.match(
        /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
      );

      if (timeMatch) {
        let hours = Number(timeMatch[1]);
        const minutes = timeMatch[2];
        const period = timeMatch[3].toUpperCase();

        if (period === 'PM' && hours !== 12) {
          hours += 12;
        }

        if (period === 'AM' && hours === 12) {
          hours = 0;
        }

        setEditDueTime(
          `${String(hours).padStart(2, '0')}:${minutes}`
        );
      } else {
        setEditDueTime(timePart);
      }
    } else {
      setEditDueTime('');
    }

    setOpenMenu(null);
    setOpenStatusMenu(false);
    setOpenPriorityMenu(false);
  };

  const saveEdit = () => {
    if (!editingTask || !editTitle.trim()) return;

    let formattedTime = editDueTime;

    if (editDueTime) {
      const [hoursString, minutes] = editDueTime.split(':');
      let hours = Number(hoursString);

      const period = hours >= 12 ? 'PM' : 'AM';

      if (hours === 0) {
        hours = 12;
      } else if (hours > 12) {
        hours -= 12;
      }

      formattedTime = `${hours}:${minutes} ${period}`;
    }

    const due =
      editDueDate && formattedTime
        ? `${editDueDate}, ${formattedTime}`
        : editDueDate || formattedTime || 'Today';

    setTasks((current) =>
      current.map((task) =>
        task[0] === editingTask
          ? [
              editTitle.trim(),
              task[1],
              due,
              editPriority,
              editStatus,
            ]
          : task
      )
    );

    setCompleted((current) => {
      const wasCompleted = current.includes(editingTask);

      if (editStatus === 'Done' && !wasCompleted) {
        return [...current, editTitle.trim()];
      }

      if (editStatus !== 'Done' && wasCompleted) {
        return current.filter((item) => item !== editingTask);
      }

      return current.map((item) =>
        item === editingTask ? editTitle.trim() : item
      );
    });

    setEditingTask(null);
    setOpenStatusMenu(false);
    setOpenPriorityMenu(false);
  };

  return (
    <PageTitle
      eyebrow="Plan your day"
      title="Tasks"
      description="Keep your work moving, one meaningful task at a time."
      action="Add task"
      onAction={() => {
        const title = window.prompt('Enter your new task:');

        if (!title?.trim()) return;

        setTasks((current) => [
          ...current,
          [title.trim(), 'General', 'Today', 'Medium', 'To Do'],
        ]);
      }}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">
              Today's tasks
            </h2>

            <p className="text-xs text-slate-400">
              {completed.length} of {tasks.length} completed
            </p>
          </div>

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        <div
          className="flex flex-wrap gap-2"
          aria-label="Task status filters"
        >
          {['All', 'To Do', 'In Progress', 'Done'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                filter === item
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {rows.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-white/10">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                No tasks found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try another search or filter.
              </p>
            </div>
          ) : (
            rows.map(([title, project, due, priority, status]) => {
              const done = completed.includes(title);

              return (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 dark:border-white/10"
                >
                  <button
                    type="button"
                    aria-label={
                      done
                        ? `Mark ${title} as incomplete`
                        : `Mark ${title} as complete`
                    }
                    aria-pressed={done}
                    onClick={() => toggle(title)}
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                      done
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {done && <CheckCircle2 size={13} />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <b
                      className={`block text-sm ${
                        done
                          ? 'text-slate-400 line-through'
                          : ''
                      }`}
                    >
                      {title}
                    </b>

                    <small className="text-[11px] text-slate-400">
                      {project} · {due}
                    </small>
                  </div>

                  {/* Priority */}
                  <span
                    className={`rounded-md px-2.5 py-1 text-[10px] font-bold ${
                      priorityStyles[
                        priority as keyof typeof priorityStyles
                      ]
                    }`}
                    aria-label={`Priority: ${priority}`}
                  >
                    {priority}
                  </span>

                  {/* Status */}
                  <span
                    className={`hidden rounded-md px-2.5 py-1 text-[10px] font-bold sm:inline-block ${
                      statusStyles[
                        status as keyof typeof statusStyles
                      ]
                    }`}
                    aria-label={`Status: ${status}`}
                  >
                    {status}
                  </span>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === title ? null : title
                        )
                      }
                      className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10"
                      aria-label={`Task options for ${title}`}
                      aria-expanded={openMenu === title}
                    >
                      <MoreHorizontal size={17} />
                    </button>

                    {openMenu === title && (
                      <div className="absolute right-0 top-9 z-20 w-28 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-slate-900">
                        <button
                          type="button"
                          onClick={() =>
                            openEdit([
                              title,
                              project,
                              due,
                              priority,
                              status,
                            ])
                          }
                          className="block w-full rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-100 dark:hover:bg-white/10"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setTasks((current) =>
                              current.filter(
                                ([taskTitle]) =>
                                  taskTitle !== title
                              )
                            );

                            setCompleted((current) =>
                              current.filter(
                                (item) => item !== title
                              )
                            );

                            setOpenMenu(null);
                          }}
                          className="block w-full rounded-lg px-3 py-2 text-left text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {editingTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-task-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-5 text-white shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2
                  id="edit-task-title"
                  className="text-base font-semibold"
                >
                  Edit task
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Update your task details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10"
                aria-label="Close edit task"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Task name */}
              <div>
                <label
                  htmlFor="edit-task-name"
                  className="mb-1.5 block text-xs font-semibold text-slate-300"
                >
                  Task name
                </label>

                <input
                  id="edit-task-name"
                  value={editTitle}
                  onChange={(event) =>
                    setEditTitle(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-brand-400"
                  placeholder="Enter task name"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* STATUS */}
                <div className="relative">
                  <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                    Status
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenStatusMenu(!openStatusMenu);
                      setOpenPriorityMenu(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold ${
                      statusStyles[
                        editStatus as keyof typeof statusStyles
                      ]
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={openStatusMenu}
                  >
                    <span>{editStatus}</span>
                    <ChevronDown size={15} />
                  </button>

                  {openStatusMenu && (
                    <div
                      className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-white/10 bg-slate-800 p-1 shadow-2xl"
                      role="listbox"
                    >
                      {['To Do', 'In Progress', 'Done'].map(
                        (status) => (
                          <button
                            key={status}
                            type="button"
                            role="option"
                            aria-selected={editStatus === status}
                            onClick={() => {
                              setEditStatus(status);
                              setOpenStatusMenu(false);
                            }}
                            className={`mb-1 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-xs font-semibold last:mb-0 ${
                              editStatus === status
                                ? 'bg-white/10'
                                : 'hover:bg-white/5'
                            }`}
                          >
                            <span
                              className={`rounded-md px-2 py-1 ${
                                statusStyles[
                                  status as keyof typeof statusStyles
                                ]
                              }`}
                            >
                              {status}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* PRIORITY */}
                <div className="relative">
                  <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                    Priority
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenPriorityMenu(!openPriorityMenu);
                      setOpenStatusMenu(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold ${
                      priorityStyles[
                        editPriority as keyof typeof priorityStyles
                      ]
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={openPriorityMenu}
                  >
                    <span>{editPriority}</span>
                    <ChevronDown size={15} />
                  </button>

                  {openPriorityMenu && (
                    <div
                      className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-white/10 bg-slate-800 p-1 shadow-2xl"
                      role="listbox"
                    >
                      {['High', 'Medium', 'Low'].map(
                        (priority) => (
                          <button
                            key={priority}
                            type="button"
                            role="option"
                            aria-selected={
                              editPriority === priority
                            }
                            onClick={() => {
                              setEditPriority(priority);
                              setOpenPriorityMenu(false);
                            }}
                            className={`mb-1 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-xs font-semibold last:mb-0 ${
                              editPriority === priority
                                ? 'bg-white/10'
                                : 'hover:bg-white/5'
                            }`}
                          >
                            <span
                              className={`rounded-md px-2 py-1 ${
                                priorityStyles[
                                  priority as keyof typeof priorityStyles
                                ]
                              }`}
                            >
                              {priority}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Due date and time */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="edit-task-date"
                    className="mb-1.5 block text-xs font-semibold text-slate-300"
                  >
                    Due date
                  </label>

                  <input
                    id="edit-task-date"
                    type="date"
                    value={editDueDate}
                    onChange={(event) =>
                      setEditDueDate(event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none focus:border-brand-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-task-time"
                    className="mb-1.5 block text-xs font-semibold text-slate-300"
                  >
                    Due time
                  </label>

                  <input
                    id="edit-task-time"
                    type="time"
                    value={editDueTime}
                    onChange={(event) =>
                      setEditDueTime(event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none focus:border-brand-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-400 hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveEdit}
                disabled={!editTitle.trim()}
                className="rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </PageTitle>
  );
}