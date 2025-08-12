import { appRoutes } from '@/config/router/appRoutes.ts';

export const week = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
export const calendarTypes = [
  { label: 'Год', path: appRoutes.year },
  {
    label: 'Месяц',
    path: appRoutes.month,
  },
  { label: 'Неделя', path: appRoutes.week },
  { label: 'День', path: appRoutes.day },
];
