import { Outlet } from 'react-router';
import { CalendarHeader } from '@/modules/calendar/ui';

export const CalendarPage = () => {
  return (
    <>
      <CalendarHeader />
      <Outlet />
    </>
  );
};
