/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Poppins', 'sans-serif']
      },
      colors: {
        'primary-txt': '#191847',
        'secondary-txt': '#0E0E38',
        'author-txt': "#1C57EE",
        'primary-bg': '#EFF0F1',
        'footer-bg': '#191847',
      },

    },
    fontSize :{
      xs:"0.625rem" ,
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      '2xl': "1.5rem",
      '3xl': "1.875rem",
      '4xl': "2.25rem",
      '5xl': "3rem",
      '6xl': "3.75rem",
      '7xl': "4.5rem",
      '8xl': "6rem",
      '9xl': "8rem",
      'custom-size': '2.50rem'
    }
  },
  plugins: [],
}

