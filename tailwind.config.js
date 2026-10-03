/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E5EFF',
          'primary-hover': '#1848CC',
          secondary: '#00B894',
          accent: '#FFB020',
          danger: '#C0392B',
        },
        neutral: {
          900: '#0F172A',
          700: '#334155',
          400: '#56647A',
          100: '#F1F5F9',
          0: '#FFFFFF',
        },
        border: '#E2E8F0',
        cat: {
          mieszkanie: '#1E5EFF',
          seniorzy: '#00B894',
          dostepnosc: '#8E44AD',
          cyfrowe: '#FFB020',
          ekologia: '#27AE60',
          integracja: '#E67E22',
          inne: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        btn: '8px',
        card: '12px',
        modal: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15,23,42,0.06)',
        md: '0 4px 12px rgba(15,23,42,0.10)',
        lg: '0 16px 40px rgba(15,23,42,0.18)',
      },
      maxWidth: { container: '1200px' },
    },
  },
  plugins: [],
};