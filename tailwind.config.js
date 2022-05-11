module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        custom: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
            blockquote: { fontStyle: 'normal' },
            code: { wordWrap: 'break-word' },
          },
        },
      },
    },
    fontFamily: {
      mono: ['ui-monospace', 'Fira Code'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
