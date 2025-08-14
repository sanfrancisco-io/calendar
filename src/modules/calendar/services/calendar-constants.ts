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

const date = new Date();

export const CURRENT_DATE = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export const FIRST_DAY_OF_MONTH = 1;
