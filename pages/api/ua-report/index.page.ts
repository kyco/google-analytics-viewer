import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'
import PQueue from 'p-queue'

const serviceAccount = process.env.GA_SERVICE_ACCOUNT_CREDENTIALS
const viewId = process.env.GA_UNIVERSAL_VIEW_ID

const keys = JSON.parse(serviceAccount || '{}')

const runReport = async (requests: any[]) => {
  const queue = new PQueue({ concurrency: 2 })
  const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
  const jwt = new google.auth.JWT(keys.client_email, undefined, keys.private_key.replace(/\\n/g, '\n'), scopes)
  await jwt.authorize()

  const results = await queue.addAll(
    requests.map((request) => async () => {
      const response = await google.analytics('v3').data.ga.get({
        auth: jwt,
        ids: `ga:${viewId}`,
        ...request,
      })
      return response.data
    }),
  )

  const transformedResults = results.map((res, index) => {
    return {
      request: requests[index],
      response: res,
    }
  })

  return transformedResults.flat()
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Failed to load data' })
    return
  }

  if (!serviceAccount) {
    res.status(500).json({
      message: 'Failed to load data',
      error: 'Environment variable `GA_SERVICE_ACCOUNT_CREDENTIALS` was not found!',
    })
    return
  }

  if (!viewId) {
    res.status(500).json({
      message: 'Failed to load data',
      error: 'Environment variable `GA_UNIVERSAL_VIEW_ID` was not found!',
    })
    return
  }

  try {
    const data = await runReport(JSON.parse(req.body).requests)
    res.status(200).json({ data })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Failed to load data', error })
  }
}

export default handler
