import type { FormData } from '@/typings'
import { generateGa4Requests, generateUniversalAnalyticsRequests } from '@/utils/Analytics'

export const getDefaultFormData = (): FormData => {
  return {
    mode: 'ua',
    startDate: '2023-07-01',
    endDate: '2023-10-01',
    group: 'month',
  }
}

export const transformGa4Data = (data: any[]) => {
  return data.map((value: any) => {
    const headers = {
      label: value.request.dateRanges[0].startDate,
      metric: value.request.metrics[0].name,
      dimension: value.request.dimensions[0].name,
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
                value: acc.value + Number(cur.item[headers.metric]),
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

export const transformUniversalData = (data: any[]) => {
  return data.map((value: any) => {
    const headers = {
      label: value.request['start-date'],
      metric: value.request.metrics,
      dimension: value.request.dimensions,
    }

    const dataset = value.response.rows?.length
      ? value.response.rows
          .map((row: any) => {
            return {
              item: {
                [headers.dimension]: row[0],
                [headers.metric]: row[1],
              },
            }
          })
          .reduce(
            (acc: any, cur: any) => {
              return {
                value: acc.value + Number(cur.item[headers.metric]),
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

export const convertToChartData = (transformedData: any[]) => {
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
  const requests = generateGa4Requests(data.group, data.startDate, data.endDate)
  const body = JSON.stringify({ requests })
  const report = await fetch('/api/ga-report', { method: 'POST', body })
  const res = await report.json()
  return res.error ? { error: res.error, data: [] } : res || []
}

export const getUniversalStats = async (data: FormData) => {
  const requests = generateUniversalAnalyticsRequests(data.group, data.startDate, data.endDate)
  const body = JSON.stringify({ requests })
  const report = await fetch('/api/ua-report', { method: 'POST', body })
  const res = await report.json()
  return res.error ? { error: res.error, data: [] } : res || []
}

export const exportDataToCsv = (data: any[]) => {
  const csv = data.map((row) => `${row.label},${row.value}`).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'pageviews.csv'
  a.click()
}

export const exportDataToJson = (data: any[]) => {
  const json = JSON.stringify(data)
  const blob = new Blob([json], { type: 'text/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.json'
  a.click()
}
