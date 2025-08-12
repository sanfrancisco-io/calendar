import { createBrowserRouter } from 'react-router';
import { appRoutes } from '@/config/router/appRoutes.ts';
import { CalendarMonth, CalendarPage, NotFoundPage } from '@/modules/scenarios-constructor/ui';

export const router = createBrowserRouter([
  {
    path: appRoutes.default,
    element: <CalendarPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: appRoutes.year,
        element: <div>coming soon</div>,
        errorElement: <NotFoundPage />,
      },
      {
        path: appRoutes.month,
        element: <CalendarMonth />,
        errorElement: <NotFoundPage />,
      },
      {
        path: appRoutes.week,
        element: <div>coming soon</div>,
        errorElement: <NotFoundPage />,
      },
      {
        path: appRoutes.day,
        element: <div>coming soon</div>,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);
