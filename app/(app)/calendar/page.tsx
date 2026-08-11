'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
} from 'lucide-react';
import { PageTitle } from '@/components/FeaturePageLayout';

type CalendarView = 'Month' | 'Week' | 'Day';

type Event = {
  id: string;
  title: string;
  year: number;
  month: number;
  date: number;
  time: string;
};

const weekdays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

const createEventId = () => {
  if (
    typeof crypto !== 'undefined' &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
};

const formatTime = (time: string) => {
  if (!time) {
    return '9:00 AM';
  }

  const [hoursString, minutes = '00'] =
    time.split(':');

  let hours = Number(hoursString);

  if (Number.isNaN(hours)) {
    return '9:00 AM';
  }

  const period = hours >= 12 ? 'PM' : 'AM';

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  return `${hours}:${minutes} ${period}`;
};

const timeToInput = (time: string) => {
  const match = time.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );

  if (!match) {
    return '09:00';
  }

  let hours = Number(match[1]);
  const minutes = match[2];
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  }

  if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`;
};

const toDateKey = (
  year: number,
  month: number,
  date: number
) => {
  return `${year}-${String(month).padStart(
    2,
    '0'
  )}-${String(date).padStart(2, '0')}`;
};

const eventToDateKey = (event: Event) =>
  toDateKey(
    event.year,
    event.month,
    event.date
  );

const dateToKey = (date: Date) =>
  toDateKey(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

const getDaysInMonth = (
  year: number,
  month: number
) => {
  return new Date(
    year,
    month + 1,
    0
  ).getDate();
};

const formatMonthTitle = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

const formatDateLabel = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const formatLongDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatInputDate = (date: Date) => {
  return toDateKey(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
};

export default function CalendarPage() {
  
  const [today, setToday] = useState(
    () => new Date()
  );

  
  useEffect(() => {
    const interval = window.setInterval(() => {
      setToday(new Date());
    }, 60 * 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

 
  const [displayedMonth, setDisplayedMonth] =
    useState(
      () =>
        new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        )
    );

  
  const [selectedDate, setSelectedDate] =
    useState(
      () =>
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        )
    );

  const [view, setView] =
    useState<CalendarView>('Week');

  const [events, setEvents] = useState<Event[]>(
    () => {
      const base = new Date();

      const makeDate = (
        offset: number
      ) => {
        const date = new Date(base);
        date.setDate(
          date.getDate() + offset
        );
        return date;
      };

      const createDemoEvent = (
        id: string,
        title: string,
        offset: number,
        time: string
      ): Event => {
        const date = makeDate(offset);

        return {
          id,
          title,
          year: date.getFullYear(),
          month:
            date.getMonth() + 1,
          date: date.getDate(),
          time,
        };
      };

      return [
        createDemoEvent(
          'event-1',
          'Focus block',
          0,
          '9:00 AM'
        ),
        createDemoEvent(
          'event-2',
          'Design Review',
          2,
          '10:00 AM'
        ),
        createDemoEvent(
          'event-3',
          'Client Meeting',
          5,
          '2:00 PM'
        ),
        createDemoEvent(
          'event-4',
          'Project Deadline',
          9,
          '5:00 PM'
        ),
        createDemoEvent(
          'event-5',
          'Planning Session',
          14,
          '11:00 AM'
        ),
      ];
    }
  );

  
  const [showAddEvent, setShowAddEvent] =
    useState(false);

  const [newEventTitle, setNewEventTitle] =
    useState('');

  const [newEventDate, setNewEventDate] =
    useState('');

  const [newEventTime, setNewEventTime] =
    useState('09:00');

  
  const [showEditEvent, setShowEditEvent] =
    useState(false);

  const [editEventId, setEditEventId] =
    useState<string | null>(null);

  const [editEventTitle, setEditEventTitle] =
    useState('');

  const [editEventDate, setEditEventDate] =
    useState('');

  const [editEventTime, setEditEventTime] =
    useState('09:00');

  const [deletedEvent, setDeletedEvent] =
    useState<Event | null>(null);

 
  const currentYear =
    displayedMonth.getFullYear();

  const currentMonth =
    displayedMonth.getMonth();

  const daysInMonth =
    getDaysInMonth(
      currentYear,
      currentMonth
    );

  const firstDay =
    new Date(
      currentYear,
      currentMonth,
      1
    ).getDay();


  const dates = useMemo(() => {
    const totalCells =
      Math.ceil(
        (firstDay + daysInMonth) / 7
      ) * 7;

    return Array.from(
      { length: totalCells },
      (_, index) => {
        const day =
          index - firstDay + 1;

        return day > 0 &&
          day <= daysInMonth
          ? day
          : 0;
      }
    );
  }, [firstDay, daysInMonth]);

  /*
   * Events belonging to current month.
   */
  const currentMonthEvents =
    useMemo(() => {
      return events.filter(
        (event) =>
          event.year === currentYear &&
          event.month ===
            currentMonth + 1
      );
    }, [
      events,
      currentYear,
      currentMonth,
    ]);

  const dayEvents = useMemo(() => {
    return events
      .filter(
        (event) =>
          eventToDateKey(event) ===
          dateToKey(selectedDate)
      )
      .sort((a, b) =>
        timeToInput(a.time).localeCompare(
          timeToInput(b.time)
        )
      );
  }, [events, selectedDate]);

  const todayEvents = useMemo(() => {
    const todayKey =
      dateToKey(today);

    return events
      .filter(
        (event) =>
          eventToDateKey(event) ===
          todayKey
      )
      .sort((a, b) =>
        timeToInput(a.time).localeCompare(
          timeToInput(b.time)
        )
      );
  }, [events, today]);

  
  const weekStart = useMemo(() => {
    const date = new Date(
      selectedDate
    );

    date.setDate(
      date.getDate() -
        date.getDay()
    );

    return date;
  }, [selectedDate]);

  const weekDays = useMemo(() => {
    return Array.from(
      { length: 7 },
      (_, index) => {
        const date = new Date(
          weekStart
        );

        date.setDate(
          weekStart.getDate() +
            index
        );

        return date;
      }
    );
  }, [weekStart]);

  const weekEnd = weekDays[6];


  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === 'Escape'
      ) {
        if (showAddEvent) {
          setShowAddEvent(false);
        }

        if (showEditEvent) {
          setShowEditEvent(false);
        }
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [
    showAddEvent,
    showEditEvent,
  ]);

 
  useEffect(() => {
    if (!deletedEvent) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setDeletedEvent(null);
      }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [deletedEvent]);

  useEffect(() => {
    const isCurrentlyTodayMonth =
      displayedMonth.getFullYear() ===
        today.getFullYear() &&
      displayedMonth.getMonth() ===
        today.getMonth();

    if (
      isCurrentlyTodayMonth &&
      selectedDate.getFullYear() ===
        today.getFullYear() &&
      selectedDate.getMonth() ===
        today.getMonth()
    ) {
      setSelectedDate(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        )
      );
    }
  }, [today]);


  const changeMonth = (
    direction: number
  ) => {
    setDisplayedMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() +
            direction,
          1
        )
    );
  };

  
  const changeWeek = (
    direction: number
  ) => {
    const nextDate = new Date(
      selectedDate
    );

    nextDate.setDate(
      nextDate.getDate() +
        direction * 7
    );

    setSelectedDate(nextDate);

    setDisplayedMonth(
      new Date(
        nextDate.getFullYear(),
        nextDate.getMonth(),
        1
      )
    );
  };


  const changeDay = (
    direction: number
  ) => {
    const nextDate = new Date(
      selectedDate
    );

    nextDate.setDate(
      nextDate.getDate() +
        direction
    );

    setSelectedDate(nextDate);

    setDisplayedMonth(
      new Date(
        nextDate.getFullYear(),
        nextDate.getMonth(),
        1
      )
    );
  };

  /*
   * Go directly to today.
   */
  const goToToday = () => {
    const realToday = new Date();

    setToday(realToday);

    setSelectedDate(
      new Date(
        realToday.getFullYear(),
        realToday.getMonth(),
        realToday.getDate()
      )
    );

    setDisplayedMonth(
      new Date(
        realToday.getFullYear(),
        realToday.getMonth(),
        1
      )
    );
  };

 
  const openAddEvent = (
    date = selectedDate
  ) => {
    const safeDate =
      new Date(date);

    setSelectedDate(safeDate);

    setDisplayedMonth(
      new Date(
        safeDate.getFullYear(),
        safeDate.getMonth(),
        1
      )
    );

    setNewEventTitle('');

    setNewEventDate(
      formatInputDate(safeDate)
    );

    setNewEventTime('09:00');

    setShowAddEvent(true);
  };

  /*
   * Add event.
   */
  const addEvent = () => {
    if (
      !newEventTitle.trim() ||
      !newEventDate
    ) {
      return;
    }

    const parsedDate =
      new Date(
        `${newEventDate}T00:00:00`
      );

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return;
    }

    const newEvent: Event = {
      id: createEventId(),
      title:
        newEventTitle.trim(),
      year:
        parsedDate.getFullYear(),
      month:
        parsedDate.getMonth() + 1,
      date:
        parsedDate.getDate(),
      time:
        formatTime(newEventTime),
    };

    setEvents((current) => [
      ...current,
      newEvent,
    ]);

    setSelectedDate(
      parsedDate
    );

    setDisplayedMonth(
      new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        1
      )
    );

    setShowAddEvent(false);
    setNewEventTitle('');
    setNewEventDate('');
    setNewEventTime('09:00');
  };


  const editEvent = (
    event: Event
  ) => {
    setEditEventId(event.id);
    setEditEventTitle(
      event.title
    );

    setEditEventDate(
      toDateKey(
        event.year,
        event.month,
        event.date
      )
    );

    setEditEventTime(
      timeToInput(event.time)
    );

    setShowEditEvent(true);
  };

 
  const saveEditedEvent = () => {
    if (
      editEventId === null ||
      !editEventTitle.trim() ||
      !editEventDate
    ) {
      return;
    }

    const parsedDate =
      new Date(
        `${editEventDate}T00:00:00`
      );

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return;
    }

    setEvents((current) =>
      current.map((event) =>
        event.id === editEventId
          ? {
              ...event,
              title:
                editEventTitle.trim(),
              year:
                parsedDate.getFullYear(),
              month:
                parsedDate.getMonth() +
                1,
              date:
                parsedDate.getDate(),
              time:
                formatTime(
                  editEventTime
                ),
            }
          : event
      )
    );

    setSelectedDate(
      parsedDate
    );

    setDisplayedMonth(
      new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        1
      )
    );

    setShowEditEvent(false);
    setEditEventId(null);
    setEditEventTitle('');
    setEditEventDate('');
    setEditEventTime('09:00');
  };

  
  const deleteEvent = (
    id: string
  ) => {
    const eventToDelete =
      events.find(
        (event) =>
          event.id === id
      );

    if (!eventToDelete) {
      return;
    }

    setEvents((current) =>
      current.filter(
        (event) =>
          event.id !== id
      )
    );

    setDeletedEvent(
      eventToDelete
    );
  };

  
  const undoDelete = () => {
    if (!deletedEvent) {
      return;
    }

    setEvents((current) => [
      ...current,
      deletedEvent,
    ]);

    setDeletedEvent(null);
  };

  const selectDay = (
    date: number
  ) => {
    if (date < 1) {
      return;
    }

    const nextDate =
      new Date(
        currentYear,
        currentMonth,
        date
      );

    setSelectedDate(
      nextDate
    );
  };

 
  const getEventsForDate = (
    date: Date
  ) => {
    const key =
      dateToKey(date);

    return events
      .filter(
        (event) =>
          eventToDateKey(event) ===
          key
      )
      .sort((a, b) =>
        timeToInput(a.time).localeCompare(
          timeToInput(b.time)
        )
      );
  };

 
  const EventActions = ({
    event,
    compact = false,
  }: {
    event: Event;
    compact?: boolean;
  }) => (
    <div
      className={`flex ${
        compact
          ? 'items-center'
          : 'flex-wrap'
      } gap-1`}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          editEvent(event);
        }}
        className="rounded-md px-2 py-1 text-[10px] font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        Edit
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          deleteEvent(event.id);
        }}
        className="rounded-md px-2 py-1 text-[10px] font-medium text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200"
      >
        Delete
      </button>
    </div>
  );

  return (
    <PageTitle
      eyebrow="Organize your time"
      title="Calendar"
      description="See your focus blocks, deadlines, and meetings in one place."
      action="New event"
      onAction={() =>
        openAddEvent(selectedDate)
      }
    >
      <div className="space-y-5">

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {(
              [
                'Month',
                'Week',
                'Day',
              ] as CalendarView[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setView(item)
                }
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  view === item
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={goToToday}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-brand-300 hover:text-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-400"
          >
            Today
          </button>
        </div>

        <div className="card">

          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (view === 'Month') {
                  changeMonth(-1);
                } else if (
                  view === 'Week'
                ) {
                  changeWeek(-1);
                } else {
                  changeDay(-1);
                }
              }}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Previous"
            >
              <ChevronLeft
                size={18}
              />
            </button>

            <div className="text-center">
              {view === 'Month' && (
                <h2 className="section-title">
                  {formatMonthTitle(
                    displayedMonth
                  )}
                </h2>
              )}

              {view === 'Week' && (
                <>
                  <h2 className="section-title">
                    {formatDateLabel(
                      weekStart
                    )}{' '}
                    –{' '}
                    {formatDateLabel(
                      weekEnd
                    )}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Week view
                  </p>
                </>
              )}

              {view === 'Day' && (
                <>
                  <h2 className="section-title">
                    {formatLongDate(
                      selectedDate
                    )}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Day view
                  </p>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                if (view === 'Month') {
                  changeMonth(1);
                } else if (
                  view === 'Week'
                ) {
                  changeWeek(1);
                } else {
                  changeDay(1);
                }
              }}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Next"
            >
              <ChevronRight
                size={18}
              />
            </button>
          </div>

          {view === 'Month' && (
            <>
              <div className="mb-2 grid grid-cols-7 text-center text-[11px] font-bold text-slate-400">
                {weekdays.map(
                  (day) => (
                    <span
                      key={day}
                      className="pb-3"
                    >
                      {day}
                    </span>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {dates.map(
                  (date, index) => {
                    const dateEvents =
                      date > 0
                        ? currentMonthEvents
                            .filter(
                              (event) =>
                                event.date ===
                                date
                            )
                            .sort(
                              (a, b) =>
                                timeToInput(
                                  a.time
                                ).localeCompare(
                                  timeToInput(
                                    b.time
                                  )
                                )
                            )
                        : [];

                    const cellDate =
                      date > 0
                        ? new Date(
                            currentYear,
                            currentMonth,
                            date
                          )
                        : null;

                    const isToday =
                      cellDate !== null &&
                      dateToKey(
                        cellDate
                      ) ===
                        dateToKey(
                          today
                        );

                    const isSelected =
                      cellDate !== null &&
                      dateToKey(
                        cellDate
                      ) ===
                        dateToKey(
                          selectedDate
                        );

                    return (
                      <div
                        key={index}
                        onDoubleClick={() => {
                          if (
                            date > 0
                          ) {
                            openAddEvent(
                              cellDate!
                            );
                          }
                        }}
                        className={`min-h-28 rounded-xl border p-2 text-xs transition ${
                          date === 0
                            ? 'border-transparent'
                            : isToday
                            ? 'border-brand-400 bg-brand-50 dark:bg-brand-500/10'
                            : isSelected
                            ? 'border-brand-300 bg-slate-50 dark:border-brand-400 dark:bg-white/5'
                            : 'border-slate-100 dark:border-white/10'
                        } ${
                          date > 0
                            ? 'cursor-pointer hover:border-brand-300 dark:hover:border-brand-400'
                            : ''
                        }`}
                      >
                        {date > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              selectDay(
                                date
                              )
                            }
                            className={`mb-1 rounded-lg px-1.5 py-0.5 font-semibold ${
                              isToday
                                ? 'bg-brand-500 text-white'
                                : isSelected
                                ? 'text-brand-500'
                                : 'text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {date}
                          </button>
                        )}

                        <div className="space-y-1">
                          {dateEvents
                            .slice(
                              0,
                              3
                            )
                            .map(
                              (
                                event
                              ) => (
                                <div
                                  key={
                                    event.id
                                  }
                                  className="rounded-lg bg-brand-500/90 px-2 py-1.5 text-white shadow-sm"
                                >
                                  <button
                                    type="button"
                                    onClick={(
                                      e
                                    ) => {
                                      e.stopPropagation();
                                      editEvent(
                                        event
                                      );
                                    }}
                                    className="block w-full truncate text-left text-[9px] font-semibold"
                                  >
                                    {
                                      event.title
                                    }
                                  </button>

                                  <span className="block truncate text-[8px] opacity-75">
                                    {
                                      event.time
                                    }
                                  </span>
                                </div>
                              )
                            )}

                          {dateEvents.length >
                            3 && (
                            <p className="px-1 text-[9px] font-semibold text-slate-400">
                              +
                              {dateEvents.length -
                                3}{' '}
                              more
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </>
          )}

          {view === 'Week' && (
            <div className="overflow-x-auto">
              <div className="grid min-w-[900px] grid-cols-7 gap-2">
                {weekDays.map(
                  (date) => {
                    const dateEvents =
                      getEventsForDate(
                        date
                      );

                    const isToday =
                      dateToKey(
                        date
                      ) ===
                      dateToKey(
                        today
                      );

                    const isSelected =
                      dateToKey(
                        date
                      ) ===
                      dateToKey(
                        selectedDate
                      );

                    return (
                      <div
                        key={dateToKey(
                          date
                        )}
                        className={`min-h-60 rounded-xl border p-3 transition ${
                          isToday
                            ? 'border-brand-400 bg-brand-50 dark:bg-brand-500/10'
                            : isSelected
                            ? 'border-brand-300 bg-slate-50 dark:border-brand-400 dark:bg-white/5'
                            : 'border-slate-100 dark:border-white/10'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDate(
                              date
                            );

                            setDisplayedMonth(
                              new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                1
                              )
                            );

                            setView(
                              'Day'
                            );
                          }}
                          className="mb-3 block w-full text-left"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                            {
                              weekdays[
                                date.getDay()
                              ]
                            }
                          </p>

                          <div className="mt-1 flex items-baseline gap-1.5">
                            <p
                              className={`text-xl font-bold ${
                                isToday
                                  ? 'text-brand-500'
                                  : 'text-slate-700 dark:text-slate-200'
                              }`}
                            >
                              {date.getDate()}
                            </p>

                            <p className="text-[10px] text-slate-400">
                              {date.toLocaleDateString(
                                'en-US',
                                {
                                  month:
                                    'short',
                                }
                              )}
                            </p>
                          </div>
                        </button>

                        <div className="mb-3 border-t border-slate-100 dark:border-white/10" />

                        <div className="space-y-2">
                          {dateEvents.length ===
                          0 ? (
                            <p className="py-4 text-center text-[10px] text-slate-400">
                              No events
                            </p>
                          ) : (
                            dateEvents.map(
                              (
                                event
                              ) => (
                                <div
                                  key={
                                    event.id
                                  }
                                  className="rounded-lg bg-brand-500 p-2.5 text-white shadow-sm"
                                >
                                  <p className="truncate text-[10px] font-semibold">
                                    {
                                      event.title
                                    }
                                  </p>

                                  <p className="mt-1 text-[9px] opacity-75">
                                    {
                                      event.time
                                    }
                                  </p>

                                  <div className="mt-1">
                                    <EventActions
                                      event={
                                        event
                                      }
                                      compact
                                    />
                                  </div>
                                </div>
                              )
                            )
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openAddEvent(
                              date
                            )
                          }
                          className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-slate-200 py-1.5 text-[9px] font-semibold text-slate-400 transition hover:border-brand-300 hover:text-brand-500 dark:border-white/10 dark:hover:border-brand-400"
                        >
                          <Plus
                            size={11}
                          />
                          Add
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {view === 'Day' && (
            <div className="rounded-xl border border-slate-100 p-5 dark:border-white/10">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold">
                    {formatLongDate(
                      selectedDate
                    )}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {dayEvents.length}{' '}
                    {dayEvents.length ===
                    1
                      ? 'event'
                      : 'events'}{' '}
                    scheduled
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openAddEvent(
                      selectedDate
                    )
                  }
                  className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                >
                  <Plus
                    size={14}
                  />
                  Add event
                </button>
              </div>

              {dayEvents.length ===
              0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center dark:border-white/10">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                    No events scheduled
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Add an event to start
                    planning this day.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {dayEvents.map(
                    (event) => (
                      <div
                        key={event.id}
                        className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="w-20 shrink-0 rounded-lg bg-brand-50 px-2.5 py-2 text-xs font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                            {
                              event.time
                            }
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                              {
                                event.title
                              }
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Scheduled event
                            </p>
                          </div>
                        </div>

                        <EventActions
                          event={event}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="card">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="section-title">
                Today's Events
              </h2>

              <p className="text-xs text-slate-400">
                Your scheduled activities
                for today.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-300">
              {todayEvents.length}{' '}
              {todayEvents.length ===
              1
                ? 'event'
                : 'events'}
            </span>
          </div>

          {todayEvents.length ===
          0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center dark:border-white/10">
              <p className="text-xs text-slate-400">
                No events scheduled for
                today.
              </p>

              <button
                type="button"
                onClick={() =>
                  openAddEvent(today)
                }
                className="mt-3 flex items-center gap-1.5 mx-auto rounded-xl bg-brand-500 px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
              >
                <Plus
                  size={14}
                />
                Add today's event
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {todayEvents.map(
                (event) => (
                  <div
                    key={event.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-100 p-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="rounded-lg bg-brand-50 px-2.5 py-2 text-xs font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                        {
                          event.time
                        }
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {
                            event.title
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Today
                        </p>
                      </div>
                    </div>

                    <EventActions
                      event={event}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
      {deletedEvent && (
        <div
          className="fixed bottom-5 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-white/10 dark:bg-slate-900"
          role="status"
        >
          <p className="truncate text-xs text-slate-600 dark:text-slate-300">
            "{deletedEvent.title}" deleted.
          </p>

          <button
            type="button"
            onClick={undoDelete}
            className="shrink-0 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
          >
            Undo
          </button>
        </div>
      )}

      {showAddEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-event-title"
          onMouseDown={(event) => {
            if (
              event.currentTarget ===
              event.target
            ) {
              setShowAddEvent(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2
                  id="add-event-title"
                  className="text-base font-semibold"
                >
                  New event
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Add an event to your
                  calendar.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddEvent(false)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-white/10"
                aria-label="Close new event"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="event-title"
                  className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Event name
                </label>

                <input
                  id="event-title"
                  autoFocus
                  value={
                    newEventTitle
                  }
                  onChange={(event) =>
                    setNewEventTitle(
                      event.target
                        .value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                        'Enter' &&
                      newEventTitle.trim()
                    ) {
                      addEvent();
                    }
                  }}
                  placeholder="e.g. Team meeting"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 dark:border-white/10 dark:bg-white/5"
                />
              </div>

              <div>
                <label
                  htmlFor="event-date"
                  className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Date
                </label>

                <input
                  id="event-date"
                  type="date"
                  value={
                    newEventDate
                  }
                  onChange={(event) =>
                    setNewEventDate(
                      event.target
                        .value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none transition focus:border-brand-400 dark:border-white/10 dark:bg-white/5"
                />
              </div>

              <div>
                <label
                  htmlFor="event-time"
                  className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Time
                </label>

                <input
                  id="event-time"
                  type="time"
                  value={
                    newEventTime
                  }
                  onChange={(event) =>
                    setNewEventTime(
                      event.target
                        .value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none transition focus:border-brand-400 dark:border-white/10 dark:bg-white/5"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setShowAddEvent(false)
                }
                className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={addEvent}
                disabled={
                  !newEventTitle.trim() ||
                  !newEventDate
                }
                className="rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add event
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-event-title"
          onMouseDown={(event) => {
            if (
              event.currentTarget ===
              event.target
            ) {
              setShowEditEvent(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2
                  id="edit-event-title"
                  className="text-base font-semibold"
                >
                  Edit event
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Update your event
                  details.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowEditEvent(false)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-white/10"
                aria-label="Close edit event"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="edit-event-name"
                  className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Event name
                </label>

                <input
                  id="edit-event-name"
                  autoFocus
                  value={
                    editEventTitle
                  }
                  onChange={(event) =>
                    setEditEventTitle(
                      event.target
                        .value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 dark:border-white/10 dark:bg-white/5"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-event-date"
                  className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Date
                </label>

                <input
                  id="edit-event-date"
                  type="date"
                  value={
                    editEventDate
                  }
                  onChange={(event) =>
                    setEditEventDate(
                      event.target
                        .value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none transition focus:border-brand-400 dark:border-white/10 dark:bg-white/5"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-event-time"
                  className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Time
                </label>

                <input
                  id="edit-event-time"
                  type="time"
                  value={
                    editEventTime
                  }
                  onChange={(event) =>
                    setEditEventTime(
                      event.target
                        .value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none transition focus:border-brand-400 dark:border-white/10 dark:bg-white/5"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setShowEditEvent(false)
                }
                className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  saveEditedEvent
                }
                disabled={
                  !editEventTitle.trim() ||
                  !editEventDate
                }
                className="rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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