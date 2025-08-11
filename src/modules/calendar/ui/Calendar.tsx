import { getDaysInMonth, monthFormatter, week } from '@/modules/calendar/services';
import { useStore } from '@/store/store.ts';

const FIRST_DAY_OF_MONTH = 1;

export const Calendar = () => {
  const selectedDate = useStore(state => state.date);

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
    <div className='px-2 pb-5 h-[calc(100vh-5rem)]'>
      <div className='grid grid-cols-7 py-2.5 bg-[#F8FAFD]'>
        {week.map(item => (
          <div className='flex justify-center' key={item}>
            <p className='text-[11px]'>{item}</p>
          </div>
        ))}
      </div>
      <div
        className={`grid rounded-3xl border-[#DDE3EA] border overflow-hidden grid-cols-7 h-full`}
        style={{
          gridTemplateRows: `repeat(${Math.ceil((prevMonthFillerDates.length + currentMonthDates.length) / 7)}, minmax(0, 1fr))`,
        }}
      >
        {[...prevMonthFillerDates, ...currentMonthDates, ...nextMonthFillerDates].map(item => (
          <div
            key={item.getTime()}
            onClick={() => console.log(item)}
            className='flex justify-center bg-white border cursor-pointer hover:bg-[#F2F2F2]'
          >
            <span className='text-[12px] mt-2'>
              {item.getDate() === FIRST_DAY_OF_MONTH ? `${monthFormatter(item)}` : item.getDate()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
