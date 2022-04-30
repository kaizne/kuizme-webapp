module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
          fontFamily: {
              'Poppins': ['Poppins']
          },
          animation: {
              fadeIn: 'fadeIn 1.5s',
              fadeOut: 'fadeOut 1.5',
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