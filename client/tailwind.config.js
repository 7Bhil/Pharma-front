/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',
          hover: '#047857',
          light: '#ecfdf5',
          subtle: '#d1fae5',
          dark: '#064e3b',
        },
        secondary: {
          DEFAULT: '#0284c7',
          light: '#e0f2fe',
        },
        accent: {
          DEFAULT: '#10b981',
          amber: '#f59e0b',
        },
        error: '#ef4444',
        'bg-page': '#f8fafc',
        'bg-subtle': '#f1f5f9',
        'bg-card': '#ffffff',
        'text-main': '#0f172a',
        'text-muted': '#64748b',
        'text-subtle': '#94a3b8',
        'border-main': '#e2e8f0',
        'border-subtle': '#f1f5f9',
        'border-focus': '#10b981',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '1.5rem',
      },
    },
  },
  plugins: [],
}
