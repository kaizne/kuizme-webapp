module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
          fontFamily: {
              'Poppins': ['Poppins'],
              'Montserrat': ['Montserrat']
          },
          animation: {
              fadeIn: 'fadeIn 0.75s',
              fadeOut: 'fadeOut 0.75s',
          },
          keyframes: {
              fadeIn: {
                  '0%': { opacity: '0%' },
                  '100%': { opacity: '100%' },
              },
              fadeOut: {
                '0%': { opacity: '100%' },
                '100%': { opacity: '0%', display: 'none'},
            }
          }
      },
    },
    plugins: [require('tailwind-scrollbar-hide')],
  }