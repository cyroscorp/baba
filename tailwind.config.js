const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    groups: ['sidebar'],
    extend: {
      transitionProperty: {
        height: 'height'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        'nav-bg': '#db4c3f',
        'sidebar-bg': '#f7f7f7',
        'main-color': colors.gray[600],
        'white-ish': 'rgba(0, 0, 0, 0.2)'
      },
      animation: {
        fade: 'fade 500ms ease-in-out'
      },
      keyframes: {
        fade: {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      }
    }
  },
  plugins: [
    forms,
    plugin(({ addVariant, theme }) => {
      const groups = theme('groups') || [];
      groups.forEach((group) => {
        addVariant(
          `group-${group}-hover`,
          () => `:merge(.group-${group}):hover &`
        );
      });
    }),
    ({ addVariant }) => {
      addVariant('children', '& > *');
    }
  ]
};
