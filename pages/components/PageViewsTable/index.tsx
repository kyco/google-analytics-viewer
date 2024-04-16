import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import type { TableData } from '@/typings'

import { convertToTableRowData } from './actions'

type PageViewsTableProps = {
  data: TableData
}

const Component = ({ data }: PageViewsTableProps) => {
  let rows: any[] = []

  if (data.mode === 'ua') {
    rows = convertToTableRowData(data.data, 'ga:pagePath', 'ga:pageViews')
  } else {
    rows = convertToTableRowData(data.data, 'pagePath', 'screenPageViews')
  }

  const totalViews = rows.reduce((acc, row) => acc + row.value, 0)

  return (
    <TableContainer sx={{ maxHeight: 485 }}>
      <Table size="small" stickyHeader sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              Path
              <Typography sx={{ fontSize: 13 }}>Total rows: {rows.length}</Typography>
            </TableCell>
            <TableCell align="right">
              Views
              <Typography sx={{ fontSize: 13 }}>Total views: {totalViews}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow key={`${row.label}-${data.mode}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
