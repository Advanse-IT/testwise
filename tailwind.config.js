/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base:         '#0D1B2E',
        surface:      '#152236',
        raised:       '#1C2E45',
        'raised-2':   '#243550',
        border:       'rgba(255,255,255,0.08)',
        'border-teal':'rgba(34,186,178,0.3)',
        teal:         '#22BAB2',
        'teal-bright':'#2DD4C8',
        'teal-dim':   'rgba(34,186,178,0.1)',
        'teal-glow':  'rgba(34,186,178,0.05)',
        amber:        '#F59E0B',
        'amber-dim':  'rgba(245,158,11,0.1)',
        snow:         '#F0F4F8',
        mist:         'rgba(240,244,248,0.6)',
        fog:          'rgba(240,244,248,0.35)',
        ink:          'rgba(240,244,248,0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(48px,6vw,84px)', { lineHeight:'1.02', letterSpacing:'-0.04em', fontWeight:'700' }],
        'display-lg': ['clamp(34px,4.5vw,56px)', { lineHeight:'1.06', letterSpacing:'-0.03em', fontWeight:'700' }],
        'display-md': ['clamp(24px,3vw,38px)',   { lineHeight:'1.12', letterSpacing:'-0.025em', fontWeight:'600' }],
        'display-sm': ['clamp(18px,2vw,24px)',   { lineHeight:'1.2',  letterSpacing:'-0.02em',  fontWeight:'600' }],
        'body-lg':    ['17px', { lineHeight:'1.75', fontWeight:'400' }],
        'body-md':    ['15px', { lineHeight:'1.7',  fontWeight:'400' }],
        'body-sm':    ['13px', { lineHeight:'1.65', fontWeight:'400' }],
      },
      boxShadow: {
        'card':    '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
        'card-lg': '0 8px 32px rgba(0,0,0,0.35)',
        'glow':    '0 0 40px rgba(34,186,178,0.18)',
        'input':   '0 0 0 2px rgba(34,186,178,0.4)',
      },
      backgroundImage: {
        'grid':           'linear-gradient(rgba(34,186,178,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(34,186,178,0.05) 1px,transparent 1px)',
        'gradient-brand': 'linear-gradient(135deg,#22BAB2,#2DD4C8)',
        'gradient-hero':  'radial-gradient(ellipse 75% 65% at 50% -10%,rgba(34,186,178,0.12) 0%,transparent 65%)',
        'gradient-card':  'linear-gradient(160deg,rgba(34,186,178,0.07) 0%,transparent 55%)',
        'gradient-cta':   'radial-gradient(ellipse 60% 80% at 50% 50%,rgba(34,186,178,0.08) 0%,transparent 70%)',
      },
      backgroundSize: { grid: '48px 48px' },
      animation: {
        'pulse-dot':   'pulse-dot 2.4s ease-in-out infinite',
        'beam':        'beam 3s ease-in-out infinite',
        'float':       'float 5s ease-in-out infinite',
        'type-cursor': 'blink 1s step-end infinite',
        'scan':        'scan 4s linear infinite',
        'orbit':       'orbit 12s linear infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%,100%': { opacity:'1', transform:'scale(1)' },
          '50%':     { opacity:'0.3', transform:'scale(1.4)' },
        },
        beam: { '0%':{ left:'-15%' }, '100%':{ left:'115%' } },
        float: {
          '0%,100%': { transform:'translateY(0px)' },
          '50%':     { transform:'translateY(-10px)' },
        },
        blink: { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0' } },
        scan: {
          '0%':   { transform:'translateY(-100%)' },
          '100%': { transform:'translateY(400%)' },
        },
        orbit: { from:{ transform:'rotate(0deg)' }, to:{ transform:'rotate(360deg)' } },
      },
    },
  },
  plugins: [],
}
