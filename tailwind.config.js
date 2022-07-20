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
          },
          height: {
            "5v": "5vh",
            "7v": "7vh",
            "10v": "10vh",
            "20v": "20vh",
            "25v": "25vh",
            "30v": "30vh",
            "40v": "40vh",
            "50v": "50vh",
            "55v": "55vh",
            "60v": "60vh",
            "70v": "70vh",
            "80v": "80vh",
            "90v": "90vh",
            "100v": "100vh",
          },
      },
    },
    plugins: [require('tailwind-scrollbar-hide')],
  }