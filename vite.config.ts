import * as vite from 'vite';
import * as path from 'path';

import react from '@vitejs/plugin-react';

import * as html from 'vite-plugin-html';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';

export default vite.defineConfig({
  plugins: [
    react(),
    html.createHtmlPlugin({
      minify: true,
      entry: 'src/main.tsx',
      template: 'public/index.html',
      inject: {
        data: {
          title: 'Оценка стоимости квартир',
        },
      },
    }),
    checker({ typescript: true }),
    eslint(),
  ],
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /@\/(.+)/,
        replacement: path.join(process.cwd(), './src/$1'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/varibles.scss"; ',
      },
    },
  },
});