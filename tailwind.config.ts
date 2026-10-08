import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)",
        ink: "var(--ink)",
        ivory: "var(--ivory)",
        paper: "var(--paper)",
        brass: "var(--brass)",
        emergency: "var(--emergency)"
      },
      fontFamily: { display: ["var(--font-display)", "Georgia", "serif"], body: ["var(--font-body)", "sans-serif"] }
    }
  },
  plugins: []
} satisfies Config;
