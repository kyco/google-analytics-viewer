import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { GoogleAuth } from 'google-auth-library'
import { chunk } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import PQueue from 'p-queue'

import type { IRunReportRequest } from '@/typings'

const serviceAccount = process.env.GA_SERVICE_ACCOUNT_CREDENTIALS
const propertyId = process.env.GA_PROPERTY_ID

if (!serviceAccount) {
  throw new Error('The $GA_SERVICE_ACCOUNT_CREDENTIALS env var was not found!')
}

const keys = JSON.parse(serviceAccount)

const analyticsDataClient = new BetaAnalyticsDataClient({
  auth: new GoogleAuth({
    projectId: keys.project_id,
    scopes: 'https://www.googleapis.com/auth/analytics',
    credentials: {
      client_email: keys.client_email,
      private_key: keys.private_key,
    },
  }),
})

const runReport = async (requests: IRunReportRequest[]) => {
  // Google allows a max of 5 requests per `batchRunReports` call and a max of 10 concurrent calls:
  // https://developers.google.com/analytics/devguides/reporting/data/v1/quotas#analytics_property_quotas
  const queue = new PQueue({ concurrency: 2 })
  const batches = chunk(requests, 5)

  const results = await queue.addAll(
    batches.map((batch) => async () => {
      const [response] = await analyticsDataClient.batchRunReports({
        property: `properties/${propertyId}`,
        requests: batch,
      })
      return response.reports
    }),
  )

  const transformedResults = batches.map((batch, index) => {
    return batch.map((item, idx) => {
      return {
        batch: item,
        response: results[index]?.[idx] || [],
      }
    })
  })

  return transformedResults.flat()
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Failed to load data' })
    return
  }

  if (!propertyId) {
    res.status(500).json({ message: 'Failed to load data' })
  } else {
    try {
      const data = await runReport(JSON.parse(req.body).requests)
      res.status(200).json({ data })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ message: 'Failed to load data' })
    }
  }
}

export default handler
