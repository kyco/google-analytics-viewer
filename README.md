# Google Analytics Viewer

This is a starter project to help you export and view your Universal Anlytics data before Google [disables access to the API](https://support.google.com/analytics/answer/11583528) on July 1, 2024.

Although you can export data directly from the [Google Analytics UI](https://analytics.google.com/analytics/web/) it can become tedious if you have to export a lot of data, and especially if you need to export multiple dimensions and metrics.

With this starter you can achieve flexibility in terms of what data you want to export and in what format. By default a simple CSV export is provided.

The starter focuses on retrieving the page paths and page views (similar to how you would view them in Universal Analytics).

To run the project locally and even write scripts to backup your entire Universal Analytics data follow the guide below.


## Installation

This app is built with Next.js and Material UI.

To install project dependencies ensure you have [Node.js](https://nodejs.org/en) and [nvm](https://github.com/nvm-sh/nvm) installed. Then run:
```
git clone https://github.com/kyco/google-analytics-viewer
cd google-analytics-viewer
nvm use
npm install
```


## Development

To run the project locally, use:
```
npm run dev
```

The app will be available at:
- http://localhost:3000

_After the app is running locally you will need to hook it up to the Google services in order to retrieve data._


## Connecting with Google Analytics APIs

The following steps can be a bit of a headache, but if you follow the instructions closely you can be done with this section within 5 minutes.

For all the steps below when navigating in Google Cloud Console __ensure you have the correct project selected__!

### Step 1: Create a service account key

_If you already have a service account JSON file then you can skip this step._

You will need to create and download a service account JSON file (which we will need later on). Click the first link below to go directly to the Cloud Console on follow the instructions there:

- [Create service account key](https://console.cloud.google.com/iam-admin/serviceaccounts?walkthrough_id=iam--create-service-account-keys&start_index=1#step_index=1)

If you are struggling to create and download a service account key file then follow this guide [here](https://cloud.google.com/iam/docs/keys-create-delete#creating).

### Step 2: Enable Google Analytics APIs

To ensure we can access data programatically we need to enable two APIs:
- [Google Analytics API](https://console.cloud.google.com/apis/api/analytics.googleapis.com) (legacy)
- [Google Analytics Data API](https://console.cloud.google.com/apis/api/analyticsdata.googleapis.com) (new)

### Step 3: Add the service account _user_ to your Google Analytics property

Copy the `client_email` field from the service account JSON file (created in "Step 1") and add the email address with the "Viewer" permission to your GA property.

In Google Analytics navigate to:
- Admin > Account Access Management > Add users

If you are struggling to add the user follow this guide [here](https://support.google.com/analytics/answer/1009702#Add).

### Step 4: Create environment variables

In the root of the project create a new file called `.env.local` and add the following variables to it (or copy the `.env.sample` file):

__`GA_UNIVERSAL_VIEW_ID`__

- This should be the __view ID__ of your UA property (_not_ your Tracking ID "UA-XXX")
- In [Google Analytics](https://analytics.google.com/analytics/web/) under your _Universal property_:
  - Admin > View Settings > View ID

If you are struggling to find the view ID follow this guide [here](https://reflectivedata.com/documentation/google-analytics-reports/finding-view-id/#:~:text=Go%20to%20Admin%20settings%20in%20Google%20Analytics&text=In%20the%20admin%20section%2C%20click,will%20find%20the%20view%20ID.).

__`GA_PROPERTY_ID`__

- This should be the __property ID__ of your GA4 property
- In [Google Analytics](https://analytics.google.com/analytics/web/) under your _GA4 property_:
  - Admin > Property details > Property ID

If you are struggling to find the property ID follow this guide [here](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id#google_analytics).

__`GA_SERVICE_ACCOUNT_CREDENTIALS`__

- Copy the contents of the service account JSON file (from "Step 1") and remove the white space so it fits on a single line, the end result should look something like the following: `{"type": "service_account", "project_id": "abc", ...}`


## Useful links

- [GA4 API Reference](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Universal Analytics API Reference](https://developers.google.com/analytics/devguides/reporting/core/v3/coreDevguide#build-a-core-reporting-api-query)
- [Dimensions & Metrics Explorer](https://ga-dev-tools.google/dimensions-metrics-explorer/) (UA and GA4)


## Support

For bugs or improvements please use the [issues tab](https://github.com/kyco/google-analytics-viewer/issues) or email [support@kyco.io](mailto:support@kyco.io).
