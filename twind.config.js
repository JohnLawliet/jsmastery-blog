import { setup, strict, voidSheet } from 'twind'
import * as colors from 'twind/colors' // Tailwind V2 colors

setup({
  theme: {
    extend: {
      gray: colors.trueGray,
      colors: { hotpink: '#FF00FF' },
      rotate: { 5: '5deg' },
    },
  },
})

// Advanced
setup({
  preflight: false, // do not include base style reset (default: use tailwind preflight)
  mode: strict, // throw errors for invalid rules: "strict", "warn" or "silent"- default is warn
  hash: true, // hash all generated class names (default: false)
  theme: {}, // define custom theme values (default: tailwind theme)
  darkMode: 'class', // use a different dark mode strategy (default: 'media')
  sheet: voidSheet, // use custom sheet (default: cssomSheet in a browser or no-op)
})