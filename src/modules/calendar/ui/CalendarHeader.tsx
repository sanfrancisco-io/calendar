import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDownIcon } from 'lucide-react';
import { CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Settings } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { appRoutes } from '@/config/router/appRoutes.ts';
import { getControllerType, monthFormatter } from '@/modules/calendar/services';
import { calendarTypes } from '@/modules/calendar/services/calendar-constants.ts';
import { bearStore } from '@/store/store.ts';

export const CalendarHeader = () => {
  const [open, setOpen] = useState(false);
  const [openCalendarType, setOpenCalendarType] = useState(false);

  const { prevMonth, nextMonth, setMonth, prevYear, nextYear, date, calendarType, setCalendarType } = bearStore(
    state => state
  );

  const controllerType = getControllerType(calendarType.path);

  const calendarFormatter = monthFormatter(date, controllerType.config as Intl.DateTimeFormatOptions).substring(2);
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
            <p>{monthFormatter(date, { month: 'long', weekday: 'long' })}</p>
          </TooltipContent>
        </Tooltip>

        {/*CHEVRON BUTTONS*/}
        <div className='flex justify-between gap-3'>
          <Tooltip>
            <TooltipTrigger
              className='cursor-pointer hover:bg-gray-200 rounded-full'
              onClick={calendarType.path === appRoutes.month ? prevMonth : prevYear}
            >
              <ChevronLeft />
            </TooltipTrigger>
            <TooltipContent>
              <p>{controllerType.prevLabel}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              className='cursor-pointer hover:bg-gray-200 rounded-full'
              onClick={calendarType.path === appRoutes.month ? nextMonth : nextYear}
            >
              <ChevronRight />
            </TooltipTrigger>
            <TooltipContent>
              <p>{controllerType.nextLabel}</p>
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
        <DropdownMenu open={openCalendarType} onOpenChange={setOpenCalendarType}>
          <DropdownMenuTrigger className='outline-0 flex justify-between items-center gap-3 px-5 py-2 rounded-full border border-gray-500'>
            <p>{calendarType.label}</p>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent hidden={!openCalendarType} className='bg-[#EEF2F7] mr-2'>
            {calendarTypes.map(item => (
              <Link key={item.label} to={item.path}>
                <DropdownMenuItem
                  className='w-[200px]'
                  onClick={() => {
                    setCalendarType(item);
                  }}
                >
                  {item.label}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
