# Google Analytics Viewer

Export and view your Universal Analytics data before the [API is disabled on July 1, 2024](https://support.google.com/analytics/answer/11583528). This tool simplifies data exportation from Universal Analytics, allowing for flexible data retrieval in any format (by default JSON/CSV).

[Demo](https://google-analytics-viewer.vercel.app/)


## Installation

This project uses Next.js and Material UI. Ensure you have [Node.js](https://nodejs.org/en) and [nvm](https://github.com/nvm-sh/nvm) installed. Then run:
```
git clone https://github.com/kyco/google-analytics-viewer
cd google-analytics-viewer
nvm use
npm install
```


## Development

Start the project locally:
```
npm run dev
```
Access it at http://localhost:3000.

_After the app is running locally you will need to hook it up to the Google services in order to retrieve data._


## Connecting with Google Analytics APIs

NB: For all the steps below when navigating in Google Cloud Console ensure you have the correct project selected!

### Step 1: Create a Service Account Key

If you don't have a service account, create one (we will need the JSON file later on):

- [Create service account key](https://console.cloud.google.com/iam-admin/serviceaccounts?walkthrough_id=iam--create-service-account-keys&start_index=1#step_index=1)

### Step 2: Enable Google Analytics APIs

Enable the required APIs:
- [Google Analytics API](https://console.cloud.google.com/apis/api/analytics.googleapis.com)
- [Google Analytics Data API](https://console.cloud.google.com/apis/api/analyticsdata.googleapis.com)

### Step 3: Add Service Account to Google Analytics

In [Google Analytics](https://analytics.google.com/analytics/web/) add the `client_email` from your service account file as a "Viewer":
- Admin > Account Access Management > Add users

### Step 4: Setup Environment Variables

Create `.env.local` in the root of the project:
```env
GA_UNIVERSAL_VIEW_ID=<your_universal_view_id>
GA_PROPERTY_ID=<your_ga4_property_id>
GA_SERVICE_ACCOUNT_CREDENTIALS=<compressed_json_credentials>
```

#### View ID

In Google Analytics _Universal property_:
- Admin > View Settings > View ID

#### Property ID

In Google Analytics _GA4 property_:
  - Admin > Property details > Property ID

#### Service account credentials

Copy the contents of the service account JSON file and remove the white space so it fits on a single line. The end result should look like the following:
- `{"type": "service_account", "project_id": "abc", ...}`


## Troubleshooting

- Need help creating a service account? Click [here](https://cloud.google.com/iam/docs/keys-create-delete#creating).
- Need help adding service account to Google Analytics? Click [here](https://support.google.com/analytics/answer/1009702#Add).
- Struggling to find the view ID? Click [here](https://reflectivedata.com/documentation/google-analytics-reports/finding-view-id/#:~:text=Go%20to%20Admin%20settings%20in%20Google%20Analytics&text=In%20the%20admin%20section%2C%20click,will%20find%20the%20view%20ID.).
- Struggling to find the property ID? Click [here](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id#google_analytics).


## Links

_Universal Analytics:_
- [API Reference](https://developers.google.com/analytics/devguides/reporting/core/v3/coreDevguide#build-a-core-reporting-api-query)
- [Dimensions & Metrics](https://developers.google.com/analytics/devguides/reporting/core/v3/reference#dimensions)

_GA4:_
- [API Reference](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Dimensions & Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)

_Universal Analytics & GA4:_
- [Dimensions & Metrics Explorer](https://ga-dev-tools.google/dimensions-metrics-explorer/)

## Support

For bugs or improvements please use the [issues tab](https://github.com/kyco/google-analytics-viewer/issues) or email [support@kyco.io](mailto:support@kyco.io).
