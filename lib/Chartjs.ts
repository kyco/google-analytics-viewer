import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { fontFamilies } from '@/styles/fonts'

export const initChartJS = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler)
  ChartJS.defaults.font.family = fontFamilies.monospace
}
