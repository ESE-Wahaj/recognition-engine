import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0D0D14',
        'ink-soft': '#2A2A3A',
        mist: '#6B6B82',
        'border-base': '#E2E2EB',
        surface: '#F7F7FA',
        gold: '#C9952A',
        'gold-light': '#F5E6C3',
        'gold-dark': '#8B6514',
        teal: '#1A6B6B',
        'teal-light': '#E0F2F1',
        rose: '#B84040',
        'rose-light': '#FDEAEA',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      backgroundImage: {
        'ink-grad': 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)',
        'gold-grad': 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
      },
    },
  },
  plugins: [],
}

export default config
