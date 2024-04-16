export type FormData = {
  mode: 'ua' | 'ga'
  startDate: string
  endDate: string
  group: 'day' | 'week' | 'month'
}

export type ChartData = {
  labels: string[]
  datasets: any[]
}

export type TableData = {
  mode: string
  data: any[]
}

export type UniversalAnalyticsRequest = {
  'start-date': string
  'end-date': string
  metrics: string
  dimensions: string
}
