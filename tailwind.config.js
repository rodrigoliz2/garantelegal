/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)", ink: "var(--ink)", ivory: "var(--ivory)", paper: "var(--paper)", brass: "var(--brass)", slate: "var(--slate)", emergency: "var(--emergency)"
      },
      fontFamily: { display: ["var(--font-display)", "Georgia", "serif"], body: ["var(--font-body)", "sans-serif"] }
    }
  },
  plugins: []
};
