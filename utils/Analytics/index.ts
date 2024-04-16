import { eachDayOfInterval, eachMonthOfInterval, eachWeekOfInterval, format } from 'date-fns'

import type { FormData, IRunReportRequest, UniversalAnalyticsRequest } from '@/typings'
import { MISC } from '@/common'
import { getStartEndOfMonth, getStartEndOfWeek, toDate } from '@/utils/Date'

export const generateUniversalAnalyticsRequests = (
  group: FormData['group'],
  startDate: FormData['startDate'],
  endDate: FormData['endDate'],
) => {
  // More info on what a request looks like here: https://developers.google.com/analytics/devguides/reporting/core/v3/reference#data_request
  // This demo is limited to showing page views and page paths.
  let requests: UniversalAnalyticsRequest[] = []
  const start = toDate(startDate)
  const end = toDate(endDate)

  switch (group) {
    case 'day': {
      requests = eachDayOfInterval({ start, end }).map((value) => {
        const day = format(value, MISC.SYSTEM_DATE_FORMAT)
        return {
          'start-date': day,
          'end-date': day,
          metrics: MISC.UA_METRIC,
          dimensions: MISC.UA_DIMENSION,
        }
      })
      break
    }

    case 'week': {
      requests = eachWeekOfInterval({ start, end }).map((value) => {
        const week = getStartEndOfWeek(value, start, end)
        return {
          'start-date': week.start,
          'end-date': week.end,
          metrics: MISC.UA_METRIC,
          dimensions: MISC.UA_DIMENSION,
        }
      })
      break
    }

    case 'month': {
      requests = eachMonthOfInterval({ start, end }).map((value) => {
        const month = getStartEndOfMonth(value, start, end)
        return {
          'start-date': month.start,
          'end-date': month.end,
          metrics: MISC.UA_METRIC,
          dimensions: MISC.UA_DIMENSION,
        }
      })
      break
    }

    default:
      console.warn(`No case for group "${group}" exists!`)
      requests = []
  }

  return requests
}

export const generateGa4Requests = (
  group: FormData['group'],
  startDate: FormData['startDate'],
  endDate: FormData['endDate'],
) => {
  // More info on what a request looks like here: https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/batchRunReports#RunReportRequest
  // This demo is limited to showing page views and page paths.
  let requests: IRunReportRequest[] = []
  const start = toDate(startDate)
  const end = toDate(endDate)
  const metrics = [{ name: MISC.GA_METRIC }]
  const dimensions = [{ name: MISC.GA_DIMENSION }]

  switch (group) {
    case 'day': {
      requests = eachDayOfInterval({ start, end }).map((value) => {
        const day = format(value, MISC.SYSTEM_DATE_FORMAT)
        return {
          dateRanges: [{ startDate: day, endDate: day }],
          metrics,
          dimensions,
        }
      })
      break
    }

    case 'week': {
      requests = eachWeekOfInterval({ start, end }).map((value) => {
        const week = getStartEndOfWeek(value, start, end)
        return {
          dateRanges: [{ startDate: week.start, endDate: week.end }],
          metrics,
          dimensions,
        }
      })
      break
    }

    case 'month': {
      requests = eachMonthOfInterval({ start, end }).map((value) => {
        const month = getStartEndOfMonth(value, start, end)
        return {
          dateRanges: [{ startDate: month.start, endDate: month.end }],
          metrics,
          dimensions,
        }
      })
      break
    }

    default:
      console.warn(`No case for group "${group}" exists!`)
      requests = []
  }

  return requests
}
