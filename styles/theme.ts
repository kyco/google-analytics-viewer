import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

import { fontFamilies } from '@/styles/fonts'

const defaultTheme = {
  typography: {
    fontFamily: fontFamilies.sansSerif,
    h1: {
      fontSize: 30,
      fontWeight: 700,
    },
    h2: {
      fontSize: 26,
      fontWeight: 700,
    },
    h3: {
      fontSize: 22,
      fontWeight: 700,
    },
  },
}

export const theme = extendTheme({
  ...defaultTheme,
})
