import { sortBy } from 'lodash'

import { MISC } from '@/common'

export const convertToTableRowData = (data: any[], mode: string) => {
  const dimension = mode === 'ua' ? MISC.UA_DIMENSION : MISC.GA_DIMENSION
  const metric = mode === 'ua' ? MISC.UA_METRIC : MISC.GA_METRIC
  const mergedRows: any[] = []

  data.forEach((row: any) => {
    row.items.forEach((item: any) => {
      const found = mergedRows.find((mergedRow: any) => {
        if (mergedRow.label === item[dimension]) {
          return true
        }
        return false
      })
      if (found) {
        found.value += Number(item[metric])
      } else {
        mergedRows.push({
          label: item[dimension],
          value: Number(item[metric]),
        })
      }
    })
  })

  return sortBy(mergedRows, 'value').reverse()
}
