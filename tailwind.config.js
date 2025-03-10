import daisyui from 'daisyui';
import flowbite from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [daisyui],
    darkMode: ['selector', '[data-theme="dark"]'],
    daisyui:{
      themes: ["light", "dark", ],
    },
  }
