import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D6A4F',
        'primary-dark': '#21503b',
        'primary-light': '#F0F7F4',
        ink: '#111111',
        ink2: '#444444',
        muted: '#999999',
        border: '#EBEBEB',
      },
      maxWidth: {
        content: '1200px',
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
