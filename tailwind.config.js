/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        white: "var(--white)",
        g: { 50: "var(--g-50)", 200: "var(--g-200)", 400: "var(--g-400)", 600: "var(--g-600)", 900: "var(--g-900)" },
        urgent: "var(--urgent)",
        // Alias heredados que aún usa el panel interno; apuntan a la paleta monocroma.
        navy: "var(--black)", ink: "var(--black)", ivory: "var(--g-50)", paper: "var(--white)", brass: "var(--g-600)", slate: "var(--g-600)", emergency: "var(--urgent)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
