import {defineConfig} from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

dotenv.config()

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
	],
	define: {
		__VALUE__: `"${process.env.VALUE}"`
	},
	optimizeDeps: {
		exclude: ['js-big-decimal']
	}
})
