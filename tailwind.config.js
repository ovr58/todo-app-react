/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const darkMode = ['class', '[data-mode="dark"]'];
export const theme = {
  extend: {
    colors: {
      light: '#f8f9fa',
      dark: '#343a40',
      component: '#e9ecef',
      componentDark: '#212529',
      primary: '#3490dc',
      secondary: '#ffed4a',
      danger: '#e3342f',
    }
  },
};
export const plugins = [];

