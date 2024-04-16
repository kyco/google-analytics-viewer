import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'

import { theme } from '@/styles/theme'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  )
}

export default ThemeProvider
