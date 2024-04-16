import { Roboto, Roboto_Mono } from 'next/font/google'

export const sansSerifFont = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})
export const monospaceFont = Roboto_Mono({
  subsets: ['latin'],
})

export const fontFamilies = {
  sansSerif: sansSerifFont.style.fontFamily,
  monospace: monospaceFont.style.fontFamily,
}
