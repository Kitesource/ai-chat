import path from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { pluginExposeRenderer } from './vite.base.config'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config
export default defineConfig(env => {
  const forgeEnv = env as ConfigEnv<'renderer'>
  const { root, mode, forgeConfigSelf } = forgeEnv
  console.log('root', root, mode)
  const name = forgeConfigSelf.name ?? ''

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [vue(), pluginExposeRenderer(name)],
    resolve: {
      alias: {
        '@renderer': path.resolve(__dirname, './src/renderer'),
        '@main': path.resolve(__dirname, './src/main'),
        '@': path.resolve(__dirname, './src'),
      },
      preserveSymlinks: true,
    },
    clearScreen: false,
  } as UserConfig
})
