import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronDownIcon } from 'lucide-react';
import { CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Settings } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { appRoutes } from '@/config/router/appRoutes.ts';
import { getControllerType, monthFormatter } from '@/modules/calendar/services';
import { calendarTypes } from '@/modules/calendar/services/calendar-constants.ts';
import { bearStore } from '@/store/store.ts';

export const CalendarHeader = () => {
  const [open, setOpen] = useState(false);

  const { setMonth, date, nextMonth, nextYear, prevYear, prevMonth } = bearStore(state => state);

  const location = useLocation();

  const controllerType = getControllerType()[location.pathname];

  const calendarFormatter = monthFormatter(date, controllerType.config as Intl.DateTimeFormatOptions).formatted;

  const currentNextButtonAction = (path: string) => {
    let action = null;

    switch (path) {
      case appRoutes.month:
        action = nextMonth;
        break;
      case appRoutes.year:
        action = nextYear;
        break;
      case appRoutes.week:
        action = () => {};
        break;
      case appRoutes.day:
        action = () => {};
        break;
      default:
        action = () => {};
    }

    return action;
  };

  const currentPrevButtonAction = (path: string) => {
    let action = null;

    switch (path) {
      case appRoutes.month:
        action = prevMonth;
        break;
      case appRoutes.year:
        action = prevYear;
        break;
      case appRoutes.week:
        action = () => {};
        break;
      case appRoutes.day:
        action = () => {};
        break;
      default:
        action = () => {};
    }

    return action;
  };

  return (
    <div className='px-2.5 flex justify-between items-center pt-3 mb-3'>
      <div className='flex justify-between items-center gap-8'>
        {/*<Burger className='cursor-pointer' />*/}

        {/*LOGO*/}
        <div className='flex justify-between items-center gap-3'>
          <CalendarIcon />
          <p className='text-[22px]'>Календарь</p>
        </div>

        {/*TODAY BUTTON*/}
        <Tooltip>
          <TooltipTrigger
            className='border border-gray-500 px-5 py-2 rounded-full cursor-pointer'
            onClick={() => setMonth(new Date())}
          >
            Сегодня
          </TooltipTrigger>
          <TooltipContent>
            <p>{monthFormatter(date, { month: 'long', weekday: 'long' }).formatted}</p>
          </TooltipContent>
        </Tooltip>

        {/*CHEVRON BUTTONS*/}
        <div className='flex justify-between gap-3'>
          <Tooltip>
            <TooltipTrigger
              className='cursor-pointer hover:bg-gray-200 rounded-full'
              onClick={currentPrevButtonAction(location.pathname)}
            >
              <ChevronLeft />
            </TooltipTrigger>
            <TooltipContent>
              <p>{controllerType.prevBtnLabel}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className='cursor-pointer hover:bg-gray-200 rounded-full'
              onClick={currentNextButtonAction(location.pathname)}
            >
              <ChevronRight />
            </TooltipTrigger>
            <TooltipContent>
              <p>{controllerType.nextBtnLabel}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/*DATE PICKER*/}
        <div className='flex flex-col gap-3'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                id='date-picker'
                className='justify-between text-3xl font-light hover:bg-gray-200'
              >
                {calendarFormatter}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
              <DatePicker
                mode='single'
                selected={date}
                onSelect={date => {
                  if (!date) return;
                  setMonth(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='flex justify-between items-center gap-8'>
        <Settings className='cursor-pointer' />
        <DropdownMenu>
          <DropdownMenuTrigger className=' cursor-pointer outline-0 flex justify-between items-center gap-3 px-5 py-2 rounded-full border border-gray-500'>
            <p>{controllerType.currentCalendarType}</p>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-[#EEF2F7] mr-2'>
            {calendarTypes.map(item => (
              <Link key={item.label} to={item.path}>
                <DropdownMenuItem className='w-[200px] cursor-pointer'>{item.label}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
