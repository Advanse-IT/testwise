/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base:    '#0C1220',
        surface: '#131E30',
        raised:  '#1A2740',
        border:  'rgba(255,255,255,0.07)',
        'border-bright': 'rgba(34,211,195,0.25)',
        teal:    '#22D3C3',
        'teal-dim':  'rgba(34,211,195,0.10)',
        'teal-glow': 'rgba(34,211,195,0.06)',
        amber:   '#F59E0B',
        'amber-dim': 'rgba(245,158,11,0.10)',
        snow:    '#EEF2F7',
        mist:    'rgba(238,242,247,0.62)',
        fog:     'rgba(238,242,247,0.32)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Consistent type scale — use these classes everywhere, no ad-hoc text-[Xpx]
      fontSize: {
        // Display / hero
        'hero':    ['clamp(44px,6vw,80px)',  { lineHeight:'1.04', letterSpacing:'-0.04em', fontWeight:'700' }],
        // Section headings
        'h1':      ['clamp(32px,4vw,52px)',  { lineHeight:'1.08', letterSpacing:'-0.03em', fontWeight:'700' }],
        'h2':      ['clamp(24px,3vw,38px)',  { lineHeight:'1.12', letterSpacing:'-0.025em',fontWeight:'600' }],
        'h3':      ['clamp(19px,2vw,26px)',  { lineHeight:'1.2',  letterSpacing:'-0.02em', fontWeight:'600' }],
        'h4':      ['18px',                  { lineHeight:'1.3',  letterSpacing:'-0.01em', fontWeight:'600' }],
        // Body copy
        'body-xl': ['18px', { lineHeight:'1.8',  fontWeight:'400' }],
        'body-lg': ['16px', { lineHeight:'1.75', fontWeight:'400' }],
        'body-md': ['15px', { lineHeight:'1.7',  fontWeight:'400' }],
        // UI elements
        'ui-lg':   ['15px', { lineHeight:'1',    fontWeight:'500' }],
        'ui-md':   ['14px', { lineHeight:'1',    fontWeight:'500' }],
        'ui-sm':   ['13px', { lineHeight:'1',    fontWeight:'500' }],
        // Labels / caps
        'label':   ['11px', { lineHeight:'1',    fontWeight:'600', letterSpacing:'0.12em' }],
        'label-sm':['10px', { lineHeight:'1',    fontWeight:'600', letterSpacing:'0.12em' }],
      },
      boxShadow: {
        'glow':      '0 0 28px rgba(34,211,195,0.18)',
        'glow-lg':   '0 0 56px rgba(34,211,195,0.12)',
        'card':      '0 2px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
        'card-hover':'0 8px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(34,211,195,0.18)',
      },
      backgroundImage: {
        'radial-hero':   'radial-gradient(ellipse 85% 65% at 50% -5%, rgba(34,211,195,0.11) 0%, transparent 62%)',
        'radial-side':   'radial-gradient(ellipse 45% 55% at 85% 40%, rgba(34,211,195,0.07) 0%, transparent 60%)',
        'gradient-teal': 'linear-gradient(135deg, #22D3C3, #16A89B)',
        'gradient-text': 'linear-gradient(135deg, #22D3C3 0%, #5EEAD4 50%, #22D3C3 100%)',
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float-a':    'float-a 6s ease-in-out infinite',
        'float-b':    'float-b 8s ease-in-out infinite',
        'beam':       'beam 2.8s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': { '0%,100%':{ opacity:'0.5', transform:'scale(1)' }, '50%':{ opacity:'1', transform:'scale(1.06)' } },
        'float-a':    { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-12px)' } },
        'float-b':    { '0%,100%':{ transform:'translateY(0)' }, '33%':{ transform:'translateY(-8px)' }, '66%':{ transform:'translateY(-4px)' } },
        'beam':       { '0%':{ left:'-20%' }, '100%':{ left:'120%' } },
      },
      spacing: { '18': '4.5rem' },
    },
  },
  plugins: [],
}
