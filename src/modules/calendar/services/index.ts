import { appRoutes } from '@/config/router/appRoutes.ts';

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const monthFormatter = (date: Date, opt: Intl.DateTimeFormatOptions = { month: 'short' }) => {
  const f = new Intl.DateTimeFormat('ru-RU', opt);

  const formatted = f.format(date);

  return {
    formatted,
    date
  };
};

export const getControllerType = () => ({
  [appRoutes.year]: {
    nextBtnLabel: 'Следующий год',
    prevBtnLabel: 'Предыдущий год',
    currentCalendarType: 'Год',
    config: {
      year: 'numeric'
    }
  },
  [appRoutes.month]: {
    nextBtnLabel: 'Следующий месяц',
    prevBtnLabel: 'Предыдущий месяц',
    currentCalendarType: 'Месяц',
    config: {
      month: 'long',
      year: 'numeric'
    }
  },
  [appRoutes.week]: {
    nextBtnLabel: 'Следующая неделя',
    prevBtnLabel: 'Предыдущая неделя',
    currentCalendarType: 'Неделя',
    config: {
      month: 'long',
      year: 'numeric'
    }
  },
  [appRoutes.day]: {
    nextBtnLabel: 'Следующий день',
    prevBtnLabel: 'Предыдущий день',
    currentCalendarType: 'День',
    config: {
      month: 'long',
      year: 'numeric'
    }
  }
});

const TOTAL_FIXED_WEEKS = 42;

export const getDates = (date?: Date, fixedWeeks: boolean = false) => {
  const selectedDate = new Date(date ?? new Date());

  const selectedMonthIndex = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  const lastWeekdayOfSelectedMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDay();
  const firstWeekdayOfSelectedMonth = new Date(selectedYear, selectedMonthIndex, 1).getDay();

  const daysInPreviousMonth = getDaysInMonth(selectedYear, selectedMonthIndex);
  const daysInCurrentMonth = getDaysInMonth(selectedYear, selectedMonthIndex + 1);

  let prevMonthFillerStartDate = daysInPreviousMonth - firstWeekdayOfSelectedMonth + 1;
  const prevMonthFillerDates = Array.from({ length: firstWeekdayOfSelectedMonth }, () => {
    return new Date(selectedYear, selectedMonthIndex - 1, prevMonthFillerStartDate++);
  });

  const currentMonthDates = Array.from({ length: daysInCurrentMonth }, (_, index) => {
    return new Date(selectedYear, selectedMonthIndex, index + 1);
  });

  const nextMonthFillerCount = lastWeekdayOfSelectedMonth < 6 ? 6 - lastWeekdayOfSelectedMonth : 0;
  const nextMonthFillerDates = Array.from(
    {
      length: fixedWeeks
        ? TOTAL_FIXED_WEEKS - (prevMonthFillerDates.length + currentMonthDates.length)
        : nextMonthFillerCount
    },
    (_, index) => {
      return new Date(selectedYear, selectedMonthIndex + 1, index + 1);
    }
  );

  return {
    dates: [...prevMonthFillerDates, ...currentMonthDates, ...nextMonthFillerDates],
    prevMonthFillerDatesLen: prevMonthFillerDates.length,
    currentMonthDatesLen: currentMonthDates.length
  };
};
