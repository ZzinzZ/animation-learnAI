import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      calendarRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);

  const events = [
    { date: 15, title: "Math Quiz Due", type: "assignment" },
    { date: 18, title: "Physics Lab", type: "class" },
    { date: 22, title: "Essay Deadline", type: "assignment" },
    { date: 25, title: "Midterm Exam", type: "exam" },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "next" ? 1 : -1),
        1
      )
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvent = events.some((event) => event.date === day);
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          className={`h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${
            isToday
              ? "bg-theme-primary text-white font-bold"
              : hasEvent
              ? "bg-theme-primary/20 text-theme-primary font-semibold hover:bg-theme-primary/30"
              : "hover:bg-theme-hover"
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      ref={calendarRef}
      className="backdrop-blur-md bg-white/25 rounded-2xl p-6 border border-theme-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-theme-text section-title-text">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 hover:bg-theme-hover rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 hover:bg-theme-hover rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center text-sm font-medium text-theme-muted"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-theme-text mb-2">Upcoming Events</h3>
        {events.slice(0, 3).map((event, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 rounded-xl hover:shadow-sm hover:bg-gray/10 hover:shadow-black/30 transition-colors"
          >
            <div
              className={`w-3 h-3 rounded-full ${
                event.type === "assignment"
                  ? "bg-blue-500"
                  : event.type === "exam"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-theme-text">
                {event.title}
              </p>
              <p className="text-xs text-theme-muted">
                {monthNames[currentDate.getMonth()]} {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
