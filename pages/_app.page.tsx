import type { AppProps } from 'next/app'
import Head from 'next/head'

import '@/styles/global.css'

import { ThemeProvider } from '@/components'
import { initChartJS } from '@/lib/Chartjs'

initChartJS()

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
