/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        accent: 'var(--accent)',
        highlight: 'var(--highlight)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'sans-serif'],
        body:    ['var(--font-body)',    'DM Sans',    'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    'Space Mono', 'monospace'],
      },
      fontSize: {
        hero:    'var(--text-hero)',
        section: 'var(--text-section)',
        card:    'var(--text-card)',
        label:   'var(--text-label)',
      },
      letterSpacing: {
        display: 'var(--ls-display)',
        label:   'var(--ls-label)',
        button:  'var(--ls-button)',
      },
      lineHeight: {
        display: 'var(--lh-display)',
      },
      keyframes: {
        riseIn: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        slideIn: {
          '0%':   { transform: 'translateX(400px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',      opacity: '1' },
        },
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to':   { transform: 'translateX(-50%)' },
        },
        fabEntrance: {
          'from': { opacity: '0', transform: 'translateY(20px) scale(0.9)' },
          'to':   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'rise-in':     'riseIn 600ms cubic-bezier(.2,.7,.2,1) both',
        'float-slow':  'floatSlow 6s ease-in-out infinite',
        'slide-in':    'slideIn 0.3s ease-out',
        'marquee':     'marquee 35s linear infinite',
        'fab-entrance':'fabEntrance 800ms cubic-bezier(.2,.7,.2,1) 1.2s both',
      },
    },
  },
  plugins: [],
}
