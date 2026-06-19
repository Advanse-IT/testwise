import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      // shadcn CSS variable tokens
      colors: {
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary:     { DEFAULT:'hsl(var(--primary))',      foreground:'hsl(var(--primary-foreground))' },
        secondary:   { DEFAULT:'hsl(var(--secondary))',    foreground:'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT:'hsl(var(--destructive))',  foreground:'hsl(var(--destructive-foreground))' },
        muted:       { DEFAULT:'hsl(var(--muted))',        foreground:'hsl(var(--muted-foreground))' },
        accent:      { DEFAULT:'hsl(var(--accent))',       foreground:'hsl(var(--accent-foreground))' },
        popover:     { DEFAULT:'hsl(var(--popover))',      foreground:'hsl(var(--popover-foreground))' },
        card:        { DEFAULT:'hsl(var(--card))',         foreground:'hsl(var(--card-foreground))' },
        // Brand palette
        brand: {
          teal:       '#22D3C3',
          'teal-dim': 'rgba(34,211,195,0.1)',
          amber:      '#F59E0B',
          'amber-dim':'rgba(245,158,11,0.1)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':     ['clamp(44px,6vw,80px)',  { lineHeight:'1.04', letterSpacing:'-0.04em', fontWeight:'700' }],
        'title-xl': ['clamp(32px,4vw,52px)',  { lineHeight:'1.08', letterSpacing:'-0.03em', fontWeight:'700' }],
        'title-lg': ['clamp(24px,3vw,38px)',  { lineHeight:'1.12', letterSpacing:'-0.025em',fontWeight:'600' }],
        'title-md': ['clamp(20px,2.2vw,26px)',{ lineHeight:'1.2',  letterSpacing:'-0.02em', fontWeight:'600' }],
        'body-xl':  ['18px', { lineHeight:'1.8',  fontWeight:'400' }],
        'body-lg':  ['16px', { lineHeight:'1.75', fontWeight:'400' }],
        'body-md':  ['15px', { lineHeight:'1.7',  fontWeight:'400' }],
        'eyebrow':  ['11px', { lineHeight:'1',    fontWeight:'600', letterSpacing:'0.12em' }],
      },
      boxShadow: {
        'glow':       '0 0 28px rgba(34,211,195,0.18)',
        'glow-lg':    '0 0 56px rgba(34,211,195,0.12)',
        'card-hover': '0 8px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(34,211,195,0.18)',
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float-a':    'float-a 6s ease-in-out infinite',
        'float-b':    'float-b 8s ease-in-out infinite',
        'beam':       'beam 2.8s ease-in-out infinite',
        'gradient':   'gradient 4s ease infinite',
        'accordion-down':   'accordion-down 0.2s ease-out',
        'accordion-up':     'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'pulse-slow':  { '0%,100%':{opacity:'0.5',transform:'scale(1)'},'50%':{opacity:'1',transform:'scale(1.06)'} },
        'float-a':     { '0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-12px)'} },
        'float-b':     { '0%,100%':{transform:'translateY(0)'},'33%':{transform:'translateY(-8px)'},'66%':{transform:'translateY(-4px)'} },
        'beam':        { '0%':{left:'-20%'},'100%':{left:'120%'} },
        'gradient':    { '0%,100%':{backgroundPosition:'0% center'},'50%':{backgroundPosition:'100% center'} },
        'accordion-down': { from:{height:'0'},to:{height:'var(--radix-accordion-content-height)'} },
        'accordion-up':   { from:{height:'var(--radix-accordion-content-height)'},to:{height:'0'} },
      },
    },
  },
  plugins: [animate],
}
