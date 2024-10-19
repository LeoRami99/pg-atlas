/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        pgAtlasTheme: {
          "primary": "#3AAA3E", // Verde
          "secondary": "#E3EDC7", // Crema claro
          "accent": "#057489", // Azul oscuro
          "neutral": "#22211F", // Negro oscuro
          "base-100": "#ffffff", // Blanco como base
          "info": "#5EB4D0", // Azul claro
          "success": "#3AAA3E", // Verde (reutilizado para éxito)
          "warning": "#C4A15F", // Un tono más cálido, basado en la paleta
          "error": "#939392", // Gris (ajustado como error)
        },
      },
    ],
  }
  ,
  plugins: [
    require('daisyui'),
  ],
}