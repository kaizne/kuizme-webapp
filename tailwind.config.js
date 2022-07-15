module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
          fontFamily: {
              'Poppins': ['Poppins'],
              'Montserrat': ['Montserrat'],
              'universal': ['universal'],
              'Roboto': ['Roboto']
          },
          animation: {
              fadeIn: 'fadeIn 1s',
              fadeOut: 'fadeOut 1s',
              fade: 'fade 3s infinite',
          },
          keyframes: {
              fadeIn: {
                  '0%': { opacity: '0%' },
                  '100%': { opacity: '100%' },
              },
              fadeOut: {
                '0%': { opacity: '100%' },
                '100%': { opacity: '0%', display: 'none'},
              },
              fade: {
                '0%': { opacity: '100%' },
                '50%': { opacity: '0%', display: 'none'},
                '100%': { opacity: '100%' },
              },
          }
      },
    },
    plugins: [require('tailwind-scrollbar-hide')],
  }