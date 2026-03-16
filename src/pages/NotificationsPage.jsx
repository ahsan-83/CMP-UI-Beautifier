import React from "react";
import { useState } from "react";
import { Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { NOTIFICATIONS, TOTAL_NOTIFICATIONS } from "../data/notifications";
import { cn } from "../lib/utils";
const PAGE_SIZE = 10;
const TOTAL_PAGES = Math.ceil(TOTAL_NOTIFICATIONS / PAGE_SIZE);
function timeAgo(hours) {
  if (hours < 1) return "just now";
  if (hours === 1) return "about 1 hour ago";
  return `about ${hours} hours ago`;
}
export default function NotificationsPage() {
  const [page, setPage] = useState(1);

  /*  For mock purposes we show the first PAGE_SIZE items on page 1 */
  const visibleItems = page === 1 ? NOTIFICATIONS.slice(0, PAGE_SIZE) : NOTIFICATIONS;
  const pageNumbers = () => {
    const pages = [];
    if (TOTAL_PAGES <= 7) {
      for (let i = 1; i <= TOTAL_PAGES; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4, 5, "...", TOTAL_PAGES);
    }
    return pages;
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Megaphone className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-base font-bold text-foreground">All Notifications</h1>
          </div>
          <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {TOTAL_NOTIFICATIONS.toLocaleString()}
          </span>
        </div>
        <div className="divide-y divide-border/40">
          {visibleItems.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/70 transition-colors cursor-pointer group"
            >
              <div className="mt-1.5 shrink-0">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    notif.read ? "bg-slate-200" : "bg-primary shadow-sm shadow-primary/30"
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm leading-snug",
                    notif.read ? "font-medium text-slate-600" : "font-semibold text-foreground"
                  )}
                >
                  {notif.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                  {notif.description}
                </p>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap mt-0.5 shrink-0">
                {timeAgo(notif.hoursAgo)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-slate-50/60">
          <p className="text-xs text-slate-500">
            Showing {(page - 1) * PAGE_SIZE + 1} to
            {Math.min(page * PAGE_SIZE, TOTAL_NOTIFICATIONS)} of
            {TOTAL_NOTIFICATIONS.toLocaleString()} results
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-border/50"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>
            {
              pageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-xs text-slate-400">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-xs font-semibold transition-colors",
                      page === p
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {p}
                  </button>
                )
              )

              /*  Next */
            }
            <button
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={page === TOTAL_PAGES}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-border/50"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
