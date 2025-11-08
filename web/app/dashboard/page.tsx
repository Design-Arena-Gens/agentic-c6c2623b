"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// Types
export type MeetingMode = "online" | "offline";

export interface Booking {
  id: string;
  title: string;
  dateISO: string; // yyyy-mm-dd
  time: string; // HH:MM
  mode: MeetingMode;
  location?: string;
}

// Date helpers
function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function formatISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const DEFAULT_TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function DashboardPage() {
  const [monthCursor, setMonthCursor] = useState<Date>(getStartOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<string>(formatISODate(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>(DEFAULT_TIME_SLOTS[0]);
  const [mode, setMode] = useState<MeetingMode>("online");
  const [title, setTitle] = useState<string>("Property viewing");
  const [location, setLocation] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);

  const monthDays = useMemo(() => {
    const start = getStartOfMonth(monthCursor);
    const end = getEndOfMonth(monthCursor);
    const days: { date: Date; iso: string }[] = [];

    // Prepend previous month blanks
    const firstWeekday = start.getDay();
    for (let i = 0; i < firstWeekday; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() - (firstWeekday - i));
      days.push({ date: d, iso: formatISODate(d) });
    }

    // Current month days
    for (let day = 1; day <= end.getDate(); day++) {
      const d = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day);
      days.push({ date: d, iso: formatISODate(d) });
    }

    // Append to fill 6 weeks (42 cells)
    while (days.length % 7 !== 0 || days.length < 42) {
      const last = days[days.length - 1].date;
      const d = new Date(last);
      d.setDate(d.getDate() + 1);
      days.push({ date: d, iso: formatISODate(d) });
    }

    return days;
  }, [monthCursor]);

  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      const arr = map.get(b.dateISO) ?? [];
      arr.push(b);
      map.set(b.dateISO, arr);
    }
    return map;
  }, [bookings]);

  function isSameMonth(d: Date, ref: Date): boolean {
    return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
  }

  function handleBook() {
    const id = `${selectedDate}-${selectedTime}-${Math.random().toString(36).slice(2, 7)}`;
    const newBooking: Booking = {
      id,
      title: title.trim() || "Property viewing",
      dateISO: selectedDate,
      time: selectedTime,
      mode,
      location: mode === "offline" ? location.trim() : undefined,
    };
    setBookings((prev) => [...prev, newBooking]);
  }

  const selectedDayBookings = bookingsByDate.get(selectedDate) ?? [];

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600 hover:bg-white">
              ? Back
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight">Booking Dashboard</h1>
          </div>
          <div className="hidden items-center gap-2 text-sm text-zinc-600 md:flex">
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">Demo</span>
            <span>All data is local to your browser</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Calendar */}
          <section className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setMonthCursor((d) => addMonths(d, -1))}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50"
                >
                  ? Prev
                </button>
                <div className="text-lg font-medium">
                  {monthCursor.toLocaleString(undefined, { month: "long", year: "numeric" })}
                </div>
                <button
                  onClick={() => setMonthCursor((d) => addMonths(d, 1))}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50"
                >
                  Next ?
                </button>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-zinc-500">
                {WEEKDAY_LABELS.map((d) => (
                  <div key={d} className="py-2">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {monthDays.map(({ date, iso }) => {
                  const inMonth = isSameMonth(date, monthCursor);
                  const isSelected = iso === selectedDate;
                  const hasBookings = (bookingsByDate.get(iso)?.length ?? 0) > 0;
                  const isToday = iso === formatISODate(new Date());
                  return (
                    <button
                      key={iso}
                      onClick={() => setSelectedDate(iso)}
                      className={[
                        "relative flex h-20 flex-col items-center justify-center rounded-md border p-1 text-sm transition",
                        inMonth ? "bg-white border-zinc-200" : "bg-zinc-50 border-zinc-100 text-zinc-400",
                        isSelected ? "ring-2 ring-zinc-900" : "hover:shadow-sm hover:-translate-y-0.5",
                      ].join(" ")}
                    >
                      <span className={"text-xs " + (isToday ? "font-semibold text-zinc-900" : "text-zinc-600")}>{
                        date.getDate()
                      }</span>
                      {hasBookings && (
                        <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Booking form */}
          <section className="lg:col-span-5">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-medium">Schedule a meeting</h2>

              <div className="mt-4 grid gap-4">
                <div>
                  <label className="text-sm text-zinc-600">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Property viewing"
                    className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none transition focus:border-zinc-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-zinc-600">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none transition focus:border-zinc-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-600">Time</label>
                    <div className="mt-1 grid grid-cols-3 gap-2">
                      {DEFAULT_TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={
                            "rounded-lg border px-2 py-2 text-sm transition " +
                            (selectedTime === t
                              ? "border-zinc-900 bg-zinc-900 text-white"
                              : "border-zinc-200 hover:border-zinc-300")
                          }
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-zinc-600">Mode</label>
                  <div className="mt-1 inline-flex overflow-hidden rounded-full border border-zinc-200">
                    <button
                      onClick={() => setMode("online")}
                      className={
                        "px-4 py-2 text-sm transition " +
                        (mode === "online" ? "bg-zinc-900 text-white" : "bg-white text-zinc-700")
                      }
                    >
                      Online
                    </button>
                    <button
                      onClick={() => setMode("offline")}
                      className={
                        "px-4 py-2 text-sm transition " +
                        (mode === "offline" ? "bg-zinc-900 text-white" : "bg-white text-zinc-700")
                      }
                    >
                      In-person
                    </button>
                  </div>
                </div>

                {mode === "offline" && (
                  <div>
                    <label className="text-sm text-zinc-600">Location</label>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="123 Market St, San Francisco"
                      className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none transition focus:border-zinc-400"
                    />
                  </div>
                )}

                <button
                  onClick={handleBook}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0"
                >
                  Book meeting
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-medium">Upcoming</h3>
              <ul className="mt-3 space-y-2">
                {selectedDayBookings.length === 0 && (
                  <li className="text-sm text-zinc-500">No meetings for this day.</li>
                )}
                {selectedDayBookings.map((b) => (
                  <li
                    key={b.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 text-sm"
                  >
                    <div>
                      <div className="font-medium">{b.title}</div>
                      <div className="text-zinc-600">
                        {b.time} ? {b.mode === "online" ? "Online" : b.location || "Office"}
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                      Scheduled
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
