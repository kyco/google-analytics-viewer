import type { ChartOptions } from 'chart.js'
import { eachDayOfInterval, eachMonthOfInterval, eachWeekOfInterval, format } from 'date-fns'

import type { IRunReportRequest } from '@/typings'
import { MISC } from '@/common'
import { getStartEndOfMonth, getStartEndOfWeek, toDate } from '@/utils/Date'

export type FormData = {
  mode: 'ua' | 'ga'
  startDate: string
  endDate: string
  group: 'day' | 'week' | 'month'
}

export const defaultFormData: FormData = {
  mode: 'ga',
  startDate: '2023-05-01',
  endDate: '2023-12-01',
  group: 'month',
}

export const transformGa4Data = (data: any[]) => {
  return data.map((value: any) => {
    const headers = {
      label: value.batch.dateRanges[0].startDate,
      metric: value.batch.metrics[0].name,
      dimension: value.batch.dimensions[0].name,
    }

    const dataset = value.response.rows.length
      ? value.response.rows
          .map((row: any) => {
            return {
              item: {
                [headers.dimension]: row.dimensionValues[0].value,
                [headers.metric]: row.metricValues[0].value,
              },
            }
          })
          .reduce(
            (acc: any, cur: any) => {
              return {
                value: acc.value + Number(cur.item.screenPageViews),
                items: [...acc.items, cur.item],
              }
            },
            { value: 0, items: [] },
          )
      : { value: 0, items: [] }

    return {
      ...headers,
      ...dataset,
    }
  })
}

export const convertToChartData = (transformedData: any) => {
  return {
    labels: transformedData.map((item: any) => item.label),
    datasets: [
      {
        data: transformedData.map((item: any) => item.value),
        borderWidth: 1.5,
        lineTension: 0.1,
        borderColor: '#009688',
      },
    ],
  }
}

export const getGa4Stats = async (data: FormData) => {
  let requests: IRunReportRequest[] = []
  const start = toDate(data.startDate)
  const end = toDate(data.endDate)
  const metrics = [{ name: 'screenPageViews' }]
  const dimensions = [{ name: 'pagePath' }]

  switch (data.group) {
    case 'day': {
      requests = eachDayOfInterval({ start, end }).map((value) => {
        return {
          dateRanges: [
            {
              startDate: format(value, MISC.SYSTEM_DATE_FORMAT),
              endDate: format(value, MISC.SYSTEM_DATE_FORMAT),
            },
          ],
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
          dateRanges: [
            {
              startDate: week.start,
              endDate: week.end,
            },
          ],
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
          dateRanges: [
            {
              startDate: month.start,
              endDate: month.end,
            },
          ],
          metrics,
          dimensions,
        }
      })
      break
    }

    default:
      console.warn(`No case for data.group "${data.group}" exists!`)
      requests = []
  }

  const body = JSON.stringify({ requests })
  const report = await fetch('/api/ga-report', { method: 'POST', body })
  const res: { data: any } = await report.json()
  return res.data || []
}

export const getUniversalStats = async () => {
  const report = await fetch(
    '/api/ua-report?start=2023-01-01&end=today&metrics=pageViews&dimensions=pagePath&pretty=true',
  )
  const res: { data: any } = await report.json()
  return res.data || []
}

export const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 1,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}