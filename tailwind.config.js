/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // Disable preflight so Tailwind's CSS reset doesn't break existing custom CSS
  corePlugins: {
    preflight: false,
  },
}
