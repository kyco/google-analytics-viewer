import { sortBy } from 'lodash'

export const convertToTableRowData = (data: any[], dimension: string, metric: string) => {
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
