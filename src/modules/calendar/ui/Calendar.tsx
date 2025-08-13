import { cn } from '@/lib/utils.ts';
import { getDaysInMonth, monthFormatter } from '@/modules/calendar/services';
import { CURRENT_DATE, FIRST_DAY_OF_MONTH, week } from '@/modules/calendar/services/calendar-constants.ts';
import { bearStore } from '@/store/store.ts';

export const Calendar = () => {
  const selectedDate = bearStore(state => state.date);

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
  const nextMonthFillerDates = Array.from({ length: nextMonthFillerCount }, (_, index) => {
    return new Date(selectedYear, selectedMonthIndex + 1, index + 1);
  });

  return (
    <>
      <div className='grid grid-cols-7 bg-[#F8FAFD]'>
        {week.map(item => (
          <div className='flex justify-center' key={item}>
            <p className='text-[11px]'>{item}</p>
          </div>
        ))}
      </div>
      <div
        className='grid rounded-3xl border-[#DDE3EA] border overflow-hidden grid-cols-7 h-full'
        style={{
          gridTemplateRows: `repeat(${Math.ceil((prevMonthFillerDates.length + currentMonthDates.length) / 7)}, minmax(0, 1fr))`,
        }}
      >
        {[...prevMonthFillerDates, ...currentMonthDates, ...nextMonthFillerDates].map(item => (
          <div
            key={item.getTime()}
            className='flex justify-center items-start bg-white border cursor-pointer hover:bg-[#F2F2F2]'
          >
            <span
              className={cn('text-[12px] mt-2', {
                'bg-sky-600 rounded-full h-[24px] w-[24px] flex justify-center items-center text-white':
                  item.getTime() === CURRENT_DATE,
              })}
            >
              {item.getDate() === FIRST_DAY_OF_MONTH ? monthFormatter(item) : item.getDate()}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
