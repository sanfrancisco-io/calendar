import { cn } from '@/lib/utils.ts';
import { getDates, monthFormatter } from '@/modules/calendar/services';
import { CURRENT_DATE, week } from '@/modules/calendar/services/calendar-constants.ts';

type ICustomDatePickerProps = {
  date: Date | undefined;
  onDateClick: (date: Date) => void;
};

const fixedWeeks = true;

export const CustomDatePicker = ({ onDateClick, date }: ICustomDatePickerProps) => {
  const selectedDate = new Date(date ?? new Date());

  const { dates } = getDates(selectedDate, fixedWeeks);

  const label = monthFormatter(selectedDate, { month: 'long' }).formatted.substring(2);

  return (
    <div className='text-[11px] w-max'>
      <div>
        <p className='pb-2 pl-1.5 font-[500] text-[15px]'>{label[0].toUpperCase() + label.substring(1)}</p>
      </div>
      <div className='grid grid-cols-7  gap-x-3 mb-2.5'>
        {week.map(item => (
          <div className='flex justify-center items-center' key={item}>
            <p className='text-[11px]'>{item}</p>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 grid-rows-6 gap-x-4 gap-y-1'>
        {dates.map(item => (
          <div key={item.getTime()}>
            <button
              className={cn('hover:bg-gray-300 rounded-full w-[25px] h-[25px] focus:bg-[#C2E7FF]', {
                'bg-sky-600 text-white': item.getTime() === CURRENT_DATE
              })}
              onClick={() => onDateClick(item)}
            >
              {item.getDate()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
