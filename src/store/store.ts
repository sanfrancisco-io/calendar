import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { calendarTypes } from '@/modules/calendar/services/calendar-constants.ts';

type CalendarType = (typeof calendarTypes)[0];

interface InitialStore {
  date: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  setMonth: (date: Date) => void;

  prevYear: () => void;
  nextYear: () => void;

  calendarType: CalendarType;
  setCalendarType: (type: CalendarType) => void;
}

export const bearStore = create<InitialStore>()(
  persist(
    set => ({
      date: new Date(),
      calendarType: calendarTypes[1],

      /*calendar handler*/
      setCalendarType: (type: CalendarType) => set({ calendarType: type }),

      prevMonth: () =>
        set(state => {
          state.date.setMonth(state.date.getMonth() - 1);
          return { date: new Date(state.date) };
        }),
      nextMonth: () =>
        set(state => {
          state.date.setMonth(state.date.getMonth() + 1);
          return { date: new Date(state.date) };
        }),
      setMonth: (date: Date) => set({ date }),
      nextYear: () =>
        set(state => {
          state.date.setFullYear(state.date.getFullYear() + 1);
          return { date: new Date(state.date) };
        }),
      prevYear: () =>
        set(state => {
          state.date.setFullYear(state.date.getFullYear() - 1);
          return { date: new Date(state.date) };
        }),
    }),
    {
      name: 'calendar-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ calendarType: state.calendarType }),
    }
  )
);
