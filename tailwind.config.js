/** @type {import('tailwindcss').Config} */
module.exports = {
  // 使用 class 策略：在 <html> 上有 dark 类时激活暗色样式
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

