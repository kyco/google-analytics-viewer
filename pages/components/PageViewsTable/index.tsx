import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import type { FormData } from '@/pages/actions'

import { convertToTableRowData } from './actions'

type PageViewsTableProps = {
  data: any[]
  mode: FormData['mode']
}

const Component = ({ data, mode }: PageViewsTableProps) => {
  let rows: any[] = []

  if (mode === 'ua') {
    rows = convertToTableRowData(data, 'ga:pagePath', 'ga:pageViews')
  } else {
    rows = convertToTableRowData(data, 'pagePath', 'screenPageViews')
  }

  return (
    <TableContainer sx={{ maxHeight: 485 }}>
      <Table size="small" stickyHeader sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell>Pagepath</TableCell>
            <TableCell align="right">Views</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow key={row.label} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.label}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" colSpan={2}>
                No data to display
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Component
