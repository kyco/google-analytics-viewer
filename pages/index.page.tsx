import { LoadingButton } from '@mui/lab'
import { Button, ButtonGroup, Container, Unstable_Grid2 as Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { LineChart } from '@/components/Charts'

import {
  chartOptions,
  convertToChartData,
  defaultFormData,
  getGa4Stats,
  getUniversalStats,
  transformGa4Data,
  transformUniversalData,
} from './actions'
import type { FormData } from './actions'

type ChartData = {
  labels: string[]
  datasets: any[]
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [response, setResponse] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  })

  const handleSubmit = async () => {
    setIsLoading(true)
    let res = []
    if (formData.mode === 'ua') {
      res = await getUniversalStats(formData)
    } else {
      res = await getGa4Stats(formData)
    }
    setResponse(res)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('uE response', response)
    let transformedData = []
    if (formData.mode === 'ua') {
      transformedData = transformUniversalData(response)
    } else {
      transformedData = transformGa4Data(response)
    }
    console.log('transformedData', transformedData)
    const { labels, datasets } = convertToChartData(transformedData)
    setChartData({ labels, datasets })
  }, [response])

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
          {formData.group === 'day' ? (
            <Typography component="span" sx={{ ml: 2, fontSize: 14 }}>
              {/* TODO: Add a wait estimate for days/week/months selected */}
              <strong>Caution:</strong> Can take very long to load!
            </Typography>
          ) : null}
        </Grid>

        <Grid xs={12} my={2}>
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
            onClick={handleSubmit}
            // TODO: Implement
            disabled
          >
            Export Data
          </Button>
        </Grid>

        <Grid xs={12}>
          <LineChart type="line" options={chartOptions} data={chartData} style={{ height: '300px' }} />
        </Grid>

        <Grid xs={12}>
          {/* TODO: Implement */}
          Table
        </Grid>
      </Grid>
    </Container>
  )
}

export default Page
