/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Custom breakpoints for all devices
      'xs': '320px',    // Smartwatch/very small phones
      'sm': '480px',    // Mobile phones
      'md': '768px',    // Tablets
      'lg': '1024px',   // Laptops
      'xl': '1280px',   // Desktops
      '2xl': '1536px',  // Large desktops
      '3xl': '1920px',  // TVs/Large displays
      '4xl': '2560px',  // Ultra-wide displays
    },
    extend: {
      // Custom spacing for better mobile-first design
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Custom font sizes for different devices
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      // Custom container sizes
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xs: '0.5rem',
          sm: '1rem',
          md: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
          '3xl': '4rem',
        },
      },
      // Custom max-widths for different devices
      maxWidth: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'full': '100%',
        'screen-xs': '320px',
        'screen-sm': '480px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
        'screen-3xl': '1920px',
      },
    },
  },
  plugins: [],
}