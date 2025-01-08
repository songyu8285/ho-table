import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: process.env.BUILD_LIB ? {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HoTable',
      formats: ['es', 'umd'],
      fileName: (format) => `ho-table.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  } : undefined,
});
