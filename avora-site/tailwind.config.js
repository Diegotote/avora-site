/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        avora: {
          base: '#0C0C0C',
          surface: '#171717',
          gold: '#C8A97E',
          'gold-hover': '#B89A6F',
          'gold-bright': '#D4AF37',
          'text-primary': '#F5F5F5',
          'text-secondary': '#A8A29E',
          'text-muted': '#737373',
          'text-dark': '#0A0A0A',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        accent: ['"Cinzel"', 'serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'card': '0 4px 24px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 40px rgba(200, 169, 126, 0.1), 0 0 60px rgba(200, 169, 126, 0.05)',
        'modal': '0 24px 80px rgba(0, 0, 0, 0.8)',
        'gold': '0 0 20px rgba(200, 169, 126, 0.3)',
        'gold-strong': '0 0 40px rgba(200, 169, 126, 0.5)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "breathe": {
          "0%, 100%": { opacity: "0.5", transform: "scale(0.98)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "sweep": {
          "0%": { transform: "rotate(var(--ray-angle, 25deg)) translateX(-30%)" },
          "100%": { transform: "rotate(var(--ray-angle, 25deg)) translateX(30%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "breathe": "breathe 3s ease-in-out infinite",
        "shimmer": "shimmer 0.6s ease forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "zoom-in": "zoom-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
