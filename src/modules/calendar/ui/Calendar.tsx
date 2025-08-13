import { cn } from '@/lib/utils.ts';
import { getDates, monthFormatter } from '@/modules/calendar/services';
import { CURRENT_DATE, FIRST_DAY_OF_MONTH, week } from '@/modules/calendar/services/calendar-constants.ts';
import { bearStore } from '@/store/store.ts';

export const Calendar = () => {
  const selectedDate = bearStore(state => state.date);

  const { dates, prevMonthFillerDatesLen, currentMonthDatesLen } = getDates(selectedDate);

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
          gridTemplateRows: `repeat(${Math.ceil((prevMonthFillerDatesLen + currentMonthDatesLen) / 7)}, minmax(0, 1fr))`,
        }}
      >
        {dates.map(item => (
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
