import { Outlet } from 'react-router';
import { CalendarHeader } from '@/modules/calendar/ui';

export const CalendarPage = () => {
  return (
    <>
      <CalendarHeader />
      <div className='px-2 pb-5 h-[calc(100vh-5rem)]'>
        <Outlet />
      </div>
    </>
  );
};
