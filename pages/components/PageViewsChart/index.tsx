import type { ChartData } from '@/typings'
import { LineChart } from '@/components/Charts'

import { getChartOptions } from './actions'

type PageViewsChartProps = {
  data: ChartData
}

const Component = ({ data }: PageViewsChartProps) => {
  const chartOptions = getChartOptions()

  return <LineChart type="line" options={chartOptions} data={data} style={{ height: '300px' }} />
}

export default Component
