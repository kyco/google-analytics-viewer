import { endOfMonth, endOfWeek, format, isAfter, isBefore, isValid, parse, startOfMonth, startOfWeek } from 'date-fns'

import { MISC } from '@/common'

export const toDate = (date: string): Date => {
  let dateObject

  try {
    dateObject = parse(date, MISC.SYSTEM_DATE_FORMAT, new Date())
  } catch (err) {
    throw new Error('Invalid date')
  }

  if (isValid(dateObject)) {
    return dateObject
  }

  throw new Error('Invalid date')
}

export const getStartEndOfMonth = (date: Date, start: Date, end: Date) => {
  return {
    start: isValid(date)
      ? format(isBefore(startOfMonth(date), start) ? start : startOfMonth(date), MISC.SYSTEM_DATE_FORMAT)
      : '',
    end: isValid(date) ? format(isAfter(endOfMonth(date), end) ? end : endOfMonth(date), MISC.SYSTEM_DATE_FORMAT) : '',
  }
}

export const getStartEndOfWeek = (date: Date, start: Date, end: Date) => {
  return {
    start: isValid(date)
      ? format(isBefore(startOfWeek(date), start) ? start : startOfWeek(date), MISC.SYSTEM_DATE_FORMAT)
      : '',
    end: isValid(date) ? format(isAfter(endOfWeek(date), end) ? end : endOfWeek(date), MISC.SYSTEM_DATE_FORMAT) : '',
  }
}
