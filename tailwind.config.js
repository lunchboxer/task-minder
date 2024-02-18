/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['JetBrains Mono', 'Helvetica', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes').cmyk,
          '--rounded-btn': 0,
          '--rounded-box': 0,
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes').synthwave,
          accent: '#cba6f7',
          secondary: '#fab387',
          primary: '#94e2d5',
          neutral: '#45475a',
          'base-100': '#1e1e2e',
          'base-200': '#181825',
          'base-300': '#11111b',
          'base-content': '#cdd6f4',
          info: '#74c7ec',
          success: '#a6e3a1',
          warning: '#fab387',
          error: '#f38ba8',
          '--rounded-btn': 0,
          '--rounded-box': 0,
          '--border-btn': '1px',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
