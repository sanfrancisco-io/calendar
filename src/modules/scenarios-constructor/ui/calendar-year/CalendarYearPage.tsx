import { format } from 'date-fns';
import { DatePicker } from '@/components/ui/date-picker.tsx';

export const CalendarYearPage = () => {
  const currentYear = new Date().getFullYear();

  const dates = Array.from({ length: 12 }, (_, idx) => new Date(currentYear, idx, 1));

  return (
    <div className='h-full rounded-3xl bg-white border-[#DDE3EA] border overflow-hidden'>
      <div className='grid grid-cols-4 grid-rows-3 h-min'>
        {dates.map(item => (
          <div key={item.getTime()} className='flex justify-start items-start'>
            <DatePicker
              formatters={{
                formatCaption: (date, options) => {
                  return format(date, 'LLLL', { locale: options?.locale });
                },
              }}
              weekStartsOn={0}
              fixedWeeks
              month={item}
              selected={undefined}
              mode='single'
              hideNavigation
            />
          </div>
        ))}
      </div>
    </div>
  );
};
