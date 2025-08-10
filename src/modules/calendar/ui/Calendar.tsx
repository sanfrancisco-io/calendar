import { getDaysInMonth, monthFormatter, week } from '@/modules/calendar/services'
import { useStore } from '@/store/store.ts'

const FIRST_DAY_OF_MONTH = 1
const DAYS_IN_WEEK = 7

export const Calendar = () => {
  const currentDate = useStore((state) => state.date)

  const currentMonthIndex = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const nextMonthStartWeekday = new Date(currentYear, currentMonthIndex + 1, 1).getDay()
  const currentMonthStartWeekday = new Date(currentYear, currentMonthIndex, 1).getDay()

  const daysInPreviousMonth = getDaysInMonth(currentYear, currentMonthIndex)
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonthIndex + 1)

  let previousMonthStartDayNumber = daysInPreviousMonth - currentMonthStartWeekday + 1

  const previousMonthSpilloverDates = Array.from({ length: currentMonthStartWeekday }, () => {
    return new Date(currentYear, currentMonthIndex - 1, previousMonthStartDayNumber++)
  })

  const currentMonthDates = Array.from({ length: daysInCurrentMonth }, (_, index) => {
    return new Date(currentYear, currentMonthIndex, index + 1)
  })

  const nextMonthSpilloverDates = Array.from(
    { length: nextMonthStartWeekday > 0 ? DAYS_IN_WEEK - nextMonthStartWeekday : 0 },
    (_, index) => {
      return new Date(currentYear, currentMonthIndex + 1, index + 1)
    },
  )

  return (
    <div className='px-2 pb-5 h-[calc(100vh-5rem)]'>
      <div className='grid grid-cols-7 py-2.5 bg-[#F8FAFD]'>
        {week.map((item) => (
          <div className='flex justify-center' key={item}>
            <p className='text-[11px]'>{item}</p>
          </div>
        ))}
      </div>
      <div
        className={`grid rounded-3xl border-[#DDE3EA] border overflow-hidden grid-cols-7 h-full`}
        style={{
          gridTemplateRows: `repeat(${Math.ceil((previousMonthSpilloverDates.length + currentMonthDates.length) / 7)}, minmax(0, 1fr))`,
        }}
      >
        {[...previousMonthSpilloverDates, ...currentMonthDates, ...nextMonthSpilloverDates].map((item) => (
          <div
            key={item.getTime()}
            onClick={() => console.log(item)}
            className='flex justify-center bg-white border cursor-pointer hover:bg-[#F2F2F2]'
          >
            <p className='text-[12px] mt-2'>
              {item.getDate() === FIRST_DAY_OF_MONTH ? `${monthFormatter(item)}` : item.getDate()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
