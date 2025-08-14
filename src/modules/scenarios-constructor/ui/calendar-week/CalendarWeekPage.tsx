import { cn } from '@/lib/utils.ts';
import { monthFormatter } from '@/modules/calendar/services';
import { CURRENT_DATE, week } from '@/modules/calendar/services/calendar-constants.ts';
import { bearStore } from '@/store/store.ts';

const HOURS_OPTION: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'
};

export const CalendarWeekPage = () => {
  const currentDate = bearStore(state => state.date);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const startWeekDay = currentDate.getDay();

  let startDayOfCurrentWeek = currentDay - startWeekDay;

  const currentWeek = Array.from({ length: 7 }, () => new Date(currentYear, currentMonth, startDayOfCurrentWeek++));
  const weekHours = currentWeek.map(item =>
    Array.from({ length: 24 }, (_, id) => new Date(item.getFullYear(), item.getMonth(), item.getDate(), id))
  );

  console.log(weekHours);
  return (
    <div className='h-full rounded-3xl bg-white border-[#DDE3EA] border overflow-hidden p-2'>
      <div className='grid grid-cols-7 place-items-center text-[11px] font-medium'>
        {week.map(item => (
          <div key={item}>{item}</div>
        ))}
      </div>
      <div className='grid grid-cols-7 grid-rows-1 place-items-center'>
        {currentWeek.map(item => (
          <div key={item.getTime()}>
            <p
              className={cn('font-normal text-[26px]', {
                'bg-blue-500 rounded-full w-[44px] h-[44px] text-white flex justify-center items-center':
                  item.getTime() === CURRENT_DATE
              })}
            >
              {item.getDate()}
            </p>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 grid-rows-1'>
        {weekHours.map((item, idx) => (
          <div key={idx}>
            {item.map(hour => (
              <div key={hour.getTime()}>{monthFormatter(hour, HOURS_OPTION).formatted}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
