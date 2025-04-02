// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // 先安裝 vite-plugin-svgr，終端機指令下：npm install vite-plugin-svgr
// import svgr from "vite-plugin-svgr"; //引入 vite-plugin-svgr 讓 svg 可以作為 React 元件引入其他檔案做編輯

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), svgr()], // plugins 也要引入 svgr
//   base: process.env.NODE_ENV === 'production' ? '/ReactC5/' : '/',
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => ({
  plugins: [react(), svgr()],
  // •	defineConfig(({ mode }) => {...}) 允許你 在 Node.js 執行的 Vite 配置中 正確獲取當前模式（mode 參數）。
	// •	mode 會自動接收 當前 Vite 的環境模式（development、production 或 test）。
	// •	避免使用 import.meta.env.MODE，因為它只在前端應用程式內可用。
  base: mode === 'production' ? '/ReactC5/' : '/',
}));