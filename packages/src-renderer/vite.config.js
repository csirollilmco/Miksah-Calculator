import { defineConfig } from 'vite'
import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@src': resolve(__dirname, 'src')
    }
  },
  plugins: [
		svelte({
			/* plugin options */
		})
	]
})
