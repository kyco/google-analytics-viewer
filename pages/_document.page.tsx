import type {} from '@mui/material/themeCssVarsAugmentation'

import { getInitColorSchemeScript } from '@mui/material/styles'
import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en" data-color-scheme="light">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        {getInitColorSchemeScript()}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
