import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { glob } from 'glob';

import liveReload from 'vite-plugin-live-reload';

function moveOutputPlugin() {
  return {
    name: 'move-output',
    enforce: 'post', //post 在其他function執行完畢後執行
    apply: 'build', //npm run build
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith('pages/')) {
          //檔案名稱若為'pages/' 開頭，使用 .slice 將 'pages/' 刪除，取得新的檔案名稱。
          //將新檔名指定給 bundle 物件的 fileName 屬性，以調整檔案輸出的結果
          const newFileName = fileName.slice('pages/'.length);
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
}

export default defineConfig({
  //Github Repo Name
  base: '/week8_tailwind/',
  plugins: [
    //指定檔案儲存後，自動重新整理
    liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './pages/**/*.html']),
    ViteEjsPlugin(),
    moveOutputPlugin(),
  ],
  server: {
    //啟動 server 時，預設開啟的頁面
    open: 'pages/index.html',
  },
  build: {
    //使用 rollup 模組打包
    rollupOptions: {
      //input 指定應用程式的入口檔案(所有 pages 資料夾底下的 .html)
      input: Object.fromEntries(
        glob
          .sync('pages/**/*.html')
          .map((file) => [
            path.relative('pages', file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
    },
    outDir: 'dist', //構建完成後，檔案會被輸出到 dist 資料夾
  },
});
