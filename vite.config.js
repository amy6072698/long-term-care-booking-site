import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 先安裝 vite-plugin-svgr，終端機指令下：npm install vite-plugin-svgr
import svgr from "vite-plugin-svgr"; //引入 vite-plugin-svgr 讓 svg 可以作為 React 元件引入其他檔案做編輯

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()], // plugins 也要引入 svgr
  base: process.env.NODE_ENV === 'production' ? '/ReactC5/' : '/',
})
