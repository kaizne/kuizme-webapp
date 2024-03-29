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
              fadeIn: 'fadeIn 0.5s',
              fadeOut: 'fadeOut 0.5s',
              fade: 'fade 3s infinite',
          },
          keyframes: {
              fadeIn: {
                  '0%': { opacity: '0%' },
                  '100%': { opacity: '100%' },
              },
              fadeOut: {
                '0%': { opacity: '100%' },
                '100%': { opacity: '0%'},
              },
              fade: {
                '0%': { opacity: '100%' },
                '50%': { opacity: '0%', display: 'none'},
                '100%': { opacity: '100%' },
              },
          },
          height: {
            "5v": "5vh",
            "7.5v": "7.5vh",
            "10v": "10vh",
            "12.5v": "12.5vh",
            "15v": "15vh",
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
          }
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }

        '3xl': '1792px'
        // => @media (min-width: 1792px) { ... }
      },
    },
    plugins: [require('tailwind-scrollbar-hide')],
  }