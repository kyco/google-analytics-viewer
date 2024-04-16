import { Container, Unstable_Grid2 as Grid, Typography } from '@mui/material'

const Page = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid xs={12} mt={3}>
          <Typography variant="h1" mb={2}>
            Google Analytics Viewer
          </Typography>
          <Typography mb={1}>
            This is a starter project to help you export and view your Universal Anlytics data before{' '}
            <a
              href="https://support.google.com/analytics/answer/11583528"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                borderBottom: '1px dashed #777',
              }}
            >
              Google disables access to the API on July 1, 2024
            </a>{' '}
            .
          </Typography>
          <Typography mb={1}>
            Everything you can do with this project can also be done directly via the Google Analytics interface.
            However, this project gives you more flexibility in terms of what and how you want to export your data.
          </Typography>
          <Typography variant="h3" mt={3}>
            Getting started:
          </Typography>
          <Typography mb={1}>
            <ol>
              <li>
                Clone the repo
                <ul>
                  <li>
                    <code>git clone https://github.com/kyco/google-analytics-viewer</code>
                  </li>
                </ul>
              </li>
              <li>
                Install dependencies
                <ul>
                  <li>
                    <code>cd google-analytics-viewer</code>
                  </li>
                  <li>
                    <code>npm i</code>
                  </li>
                </ul>
              </li>
              <li>
                Run the app
                <ul>
                  <li>
                    <code>npm run dev</code>
                  </li>
                </ul>
              </li>
            </ol>
          </Typography>
          <Typography>
            <em>After the app is running locally hook it up to the Google services.</em>
          </Typography>
          <Typography variant="h3" mt={3}>
            Connecting with Google APIs:
          </Typography>
          <Typography mb={1}>
            <ol>
              <li>
                Create a service account key and download the JSON file (we will this file later on)
                <ul>
                  <li>
                    <a
                      href="https://cloud.google.com/iam/docs/keys-create-delete#creating"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://cloud.google.com/iam/docs/keys-create-delete#creating
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Enable GA4 and Universal Analytics APIs:
                <ul>
                  <li>
                    <a
                      href="https://console.cloud.google.com/apis/api/analyticsdata.googleapis.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://console.cloud.google.com/apis/api/analyticsdata.googleapis.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://console.cloud.google.com/apis/api/analytics.googleapis.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://console.cloud.google.com/apis/api/analytics.googleapis.com
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Add the service account <em>user</em> to the GA property
                <ul>
                  <li>
                    Copy the <code>client_email</code> field from the service account JSON file (created in step 1)
                  </li>
                  <li>
                    <a href="https://support.google.com/analytics/answer/1009702#Add" target="_blank" rel="noreferrer">
                      Add the email
                    </a>{' '}
                    with "Viewer" permission to your GA property
                  </li>
                </ul>
              </li>
              <li>
                Create a <code>.env.local</code> file in the root of the project and add the following keys to it:
                <ul>
                  <li>
                    <code>GA_UNIVERSAL_VIEW_ID</code>
                    <ul>
                      <li>
                        Copy the{' '}
                        <a
                          href="https://reflectivedata.com/documentation/google-analytics-reports/finding-view-id/#:~:text=Go%20to%20Admin%20settings%20in%20Google%20Analytics&text=In%20the%20admin%20section%2C%20click,will%20find%20the%20view%20ID."
                          target="_blank"
                          rel="noreferrer"
                        >
                          View ID
                        </a>
                        , this is not your Tracking ID "UA-XXX"
                      </li>
                    </ul>
                  </li>
                  <li>
                    <code>GA_PROPERTY_ID</code>
                    <ul>
                      <li>
                        Copy the{' '}
                        <a
                          href="https://developers.google.com/analytics/devguides/reporting/data/v1/property-id#google_analytics"
                          target="_blank"
                          rel="noreferrer"
                        >
                          property ID
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <code>GA_SERVICE_ACCOUNT_CREDENTIALS</code>
                    <ul>
                      <li>
                        Copy the contents of the service account JSON file and remove the white space so it fits on a
                        single line, the end result should look something like the following:{' '}
                        <code>{`{"type": "service_account", "project_id": "abc", ...}`}</code>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ol>
          </Typography>
          <Typography>
            <em>The app should now be running locally without showing any errors.</em>
          </Typography>

          <Typography variant="h3" mt={3}>
            Code:
          </Typography>
          <ul>
            <li>
              <a href="https://github.com/kyco/google-analytics-viewer" target="_blank" rel="noreferrer">
                https://github.com/kyco/google-analytics-viewer
              </a>
            </li>
          </ul>
          <Typography variant="h3" mt={3}>
            GA4:
          </Typography>
          <ul>
            <li>
              <a
                href="/api/ga-report?start=2023-01-01&end=today&metrics=screenPageViews&dimensions=pagePath&pretty=true"
                target="_blank"
                rel="noreferrer"
              >
                /api/ga-report?start=2023-01-01&end=today&metrics=screenPageViews&dimensions=pagePath&pretty=true
              </a>
            </li>
          </ul>
          <Typography variant="h3" mt={3}>
            Universal Analytics:
          </Typography>
          <ul>
            <li>
              <a
                href="/api/ua-report?start=2023-01-01&end=today&metrics=pageViews&dimensions=pagePath&pretty=true"
                target="_blank"
                rel="noreferrer"
              >
                /api/ua-report?start=2023-01-01&end=today&metrics=pageViews&dimensions=pagePath&pretty=true
              </a>
            </li>
          </ul>
        </Grid>

        <Grid xs={12} mt={3}>
          asd
        </Grid>
      </Grid>
    </Container>
  )
}

export default Page
