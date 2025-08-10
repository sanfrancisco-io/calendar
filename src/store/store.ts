import { create } from 'zustand'

interface InitialStore {
  date: Date
  prevMonth: () => void
  nextMonth: () => void
  currentMonth: () => void
  setMonth: (date: Date) => void
}

export const useStore = create<InitialStore>((set) => ({
  date: new Date(),
  prevMonth: () =>
    set((state) => {
      state.date.setMonth(state.date.getMonth() - 1)
      return { date: new Date(state.date) }
    }),
  nextMonth: () =>
    set((state) => {
      state.date.setMonth(state.date.getMonth() + 1)
      return { date: new Date(state.date) }
    }),
  setMonth: (date: Date) => set({ date }),
  currentMonth: () => set(() => ({ date: new Date() })),
}))
