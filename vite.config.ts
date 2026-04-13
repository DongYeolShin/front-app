import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server : {
    open : true,  /* 실행하면 자동으로 브라우저 열여서 실행  */
    port : 3000  /* 사용 포트  */
  }
})
