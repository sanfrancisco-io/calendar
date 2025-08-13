import { useMemo } from 'react';
import { CustomDatePicker } from '@/modules/custom-date-picker/ui';
import { bearStore } from '@/store/store.ts';

export const CalendarYearPage = () => {
  const { date } = bearStore(state => state);
  const currentYear = date.getFullYear();

  const dates = useMemo(() => Array.from({ length: 12 }, (_, idx) => new Date(currentYear, idx, 1)), [currentYear]);

  return (
    <div className='h-full rounded-3xl bg-white border-[#DDE3EA] border overflow-hidden pl-10 pt-10'>
      <div className='grid grid-cols-4 grid-rows-3 gap-y-10 max-w-max gap-x-20'>
        {dates.map(item => (
          <div key={item.getTime()}>
            <CustomDatePicker
              date={item}
              onDateClick={(date: Date) => {
                console.log(date);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
