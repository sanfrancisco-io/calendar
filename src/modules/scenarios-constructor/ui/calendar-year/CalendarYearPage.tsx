import { useMemo } from 'react';
import DatePicker from 'react-calendar';
import { bearStore } from '@/store/store.ts';

export const CalendarYearPage = () => {
  const { date } = bearStore(state => state);
  const currentYear = date.getFullYear();

  const dates = useMemo(() => Array.from({ length: 12 }, (_, idx) => new Date(currentYear, idx, 1)), [currentYear]);

  console.log(dates);
  return (
    <div className='h-full rounded-3xl bg-white border-[#DDE3EA] border overflow-hidden px-4 pt-8'>
      <div className='grid grid-cols-4 grid-rows-3 h-min gap-10'>
        {dates.map(item => (
          <div key={item.getTime()} className='flex justify-start items-start'>
            <DatePicker locale='ru' showNavigation={false} showFixedNumberOfWeeks value={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
