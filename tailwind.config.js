/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base:    '#0A0B0F',
        surface: '#111318',
        raised:  '#181C24',
        border:  'rgba(226,232,240,0.08)',
        teal:    '#1C8C78',
        'teal-bright': '#22A693',
        'teal-dim':    'rgba(28,140,120,0.12)',
        'teal-glow':   'rgba(28,140,120,0.06)',
        amber:   '#D97706',
        'amber-dim': 'rgba(217,119,6,0.1)',
        snow:    '#E2E8F0',
        mist:    'rgba(226,232,240,0.55)',
        fog:     'rgba(226,232,240,0.3)',
        ink:     'rgba(226,232,240,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(52px,6vw,88px)', { lineHeight: '1.02', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-lg': ['clamp(36px,4.5vw,60px)', { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md': ['clamp(26px,3vw,40px)',   { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-sm': ['clamp(20px,2vw,26px)',   { lineHeight: '1.2',  letterSpacing: '-0.02em',  fontWeight: '600' }],
        'body-lg':    ['17px', { lineHeight: '1.75', fontWeight: '400' }],
        'body-md':    ['15px', { lineHeight: '1.7',  fontWeight: '400' }],
        'body-sm':    ['13px', { lineHeight: '1.65', fontWeight: '400' }],
        'label':      ['11px', { lineHeight: '1',    fontWeight: '600', letterSpacing: '0.1em' }],
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-lg': '0 4px 24px rgba(0,0,0,0.4)',
        'glow':    '0 0 40px rgba(28,140,120,0.15)',
        'glow-lg': '0 0 80px rgba(28,140,120,0.12)',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.8s ease-in-out infinite',
        'beam':      'beam 3.5s ease-in-out infinite',
        'fade-up':   'fade-up 0.6s ease both',
      },
      keyframes: {
        'pulse-dot': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.3', transform: 'scale(1.3)' },
        },
        beam: {
          '0%':   { left: '-15%' },
          '100%': { left: '115%' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid':           'linear-gradient(rgba(28,140,120,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(28,140,120,0.04) 1px,transparent 1px)',
        'gradient-brand': 'linear-gradient(135deg,#1C8C78,#22A693)',
        'gradient-hero':  'radial-gradient(ellipse 70% 60% at 50% 0%,rgba(28,140,120,0.09) 0%,transparent 65%)',
        'gradient-card':  'linear-gradient(160deg,rgba(28,140,120,0.06) 0%,transparent 60%)',
      },
      backgroundSize: { grid: '52px 52px' },
    },
  },
  plugins: [],
}
