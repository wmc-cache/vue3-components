import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import styleImport from 'vite-plugin-style-import';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

function resolve(dir: string) {
  return path.join(__dirname, dir);
}
// https://vitejs.dev/config/
// https://github.com/vitejs/vite/issues/1930 .env
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `vant/es/${name}/style`
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@common': resolve('./src/common'),
      '@components': resolve('./src/components'),
      '@store': resolve('./src/store'),
      '@views': resolve('./src/views')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 80
    //https:true
  }
});
