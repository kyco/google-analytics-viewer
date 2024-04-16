import { LoadingButton } from '@mui/lab'
import { Alert, Button, ButtonGroup, Container, Unstable_Grid2 as Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import type { ChartData, TableData } from '@/typings'

import {
  convertToChartData,
  exportDataToCsv,
  getDefaultFormData,
  getGa4Stats,
  getUniversalStats,
  transformGa4Data,
  transformUniversalData,
} from './actions'
import type { FormData } from './actions'
import { PageViewsChart, PageViewsTable } from './components'

const Page = () => {
  const [formData, setFormData] = useState<FormData>(getDefaultFormData())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [tableData, setTableData] = useState<TableData>({
    mode: formData.mode,
    data: [],
  })
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  })

  const handleSubmit = async () => {
    setError('')
    setIsLoading(true)
    let res = []
    let transformedData = []

    if (formData.mode === 'ua') {
      res = await getUniversalStats(formData)
    } else {
      res = await getGa4Stats(formData)
    }

    if (res.error) {
      console.error('Error:', res.error)
      setError(
        res.error.details ||
          res.error.errors?.[0].message ||
          res.error ||
          'Failed to load data, check console for more info!',
      )
      setIsLoading(false)
      return
    }

    if (formData.mode === 'ua') {
      transformedData = transformUniversalData(res)
    } else {
      transformedData = transformGa4Data(res)
    }

    setTableData({ mode: formData.mode, data: transformedData })
    setChartData(convertToChartData(transformedData))
    setIsLoading(false)
  }

  const exportData = () => {
    exportDataToCsv(tableData.data)
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid xs={12} mt={3}>
          <Typography variant="h1">Google Analytics Viewer</Typography>
        </Grid>
        <Grid xs={12} mt={2}>
          <ButtonGroup sx={{ mr: 1 }}>
            <Button
              onClick={() => setFormData({ ...formData, mode: 'ua' })}
              variant={formData.mode === 'ua' ? 'contained' : 'outlined'}
              disableElevation
              color="secondary"
              sx={{ height: 40 }}
            >
              Universal Analytics
            </Button>
            <Button
              onClick={() => setFormData({ ...formData, mode: 'ga' })}
              variant={formData.mode === 'ga' ? 'contained' : 'outlined'}
              disableElevation
              color="secondary"
              sx={{ height: 40 }}
            >
              GA4
            </Button>
          </ButtonGroup>

          <TextField
            size="small"
            label="Start"
            variant="outlined"
            value={formData.startDate}
            onChange={(event) => setFormData({ ...formData, startDate: event.currentTarget.value })}
            sx={{ height: 40, width: 110, mr: 1 }}
          />
          <TextField
            size="small"
            label="End"
            variant="outlined"
            value={formData.endDate}
            onChange={(event) => setFormData({ ...formData, endDate: event.currentTarget.value })}
            sx={{ height: 40, width: 110, mr: 1 }}
          />
          <ButtonGroup>
            <Button
              onClick={() => setFormData({ ...formData, group: 'day' })}
              variant={formData.group === 'day' ? 'contained' : 'outlined'}
              disableElevation
              color="secondary"
              sx={{ height: 40 }}
            >
              Day
            </Button>
            <Button
              onClick={() => setFormData({ ...formData, group: 'week' })}
              variant={formData.group === 'week' ? 'contained' : 'outlined'}
              disableElevation
              color="secondary"
              sx={{ height: 40 }}
            >
              Week
            </Button>
            <Button
              onClick={() => setFormData({ ...formData, group: 'month' })}
              variant={formData.group === 'month' ? 'contained' : 'outlined'}
              disableElevation
              color="secondary"
              sx={{ height: 40 }}
            >
              Month
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid xs={12}>
          <Alert severity="warning">
            {/* TODO: Add a wait estimate for days/week/months selected */}
            <strong>Caution:</strong> Selecting a large date range and/or a day/week/month combination which has lots of
            data can potentially take very long to load!
          </Alert>
        </Grid>

        <Grid xs={12}>
          <LoadingButton
            variant="contained"
            size="large"
            disableElevation
            onClick={handleSubmit}
            sx={{ mr: 1 }}
            loading={isLoading}
          >
            Update chart
          </LoadingButton>
          <Button
            variant="outlined"
            size="large"
            disableElevation
            onClick={exportData}
            disabled={!tableData.data.length}
          >
            Export Data
          </Button>
        </Grid>

        {error ? (
          <Grid xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        ) : null}

        <Grid xs={12} mt={1}>
          <Typography sx={{ fontSize: 13 }}>
            Showing results for: {tableData.mode === 'ua' ? 'Universal Analytics' : 'GA4'}
          </Typography>
        </Grid>

        <Grid xs={12} mt={1}>
          <PageViewsChart data={chartData} />
        </Grid>

        <Grid xs={12} mt={1} mb={5}>
          <PageViewsTable data={tableData} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Page
