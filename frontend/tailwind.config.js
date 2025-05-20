/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      primary: '#4F46E5', // Indigo 600
      secondary: '#22D3EE', // Cyan 400
      background: '#F9FAFB', // Gray 50
      card: '#FFFFFF', // Card backgrounds
      textPrimary: '#111827', // Gray 900
      textSecondary: '#6B7280', // Gray 500
      success: '#10B981', // Green 500
      error: '#EF4444', // Red 500
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
  },
};
export const plugins = [];
