import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.ts',
  output: [ {
    file: `dist/vue-next-clipboard.cjs.js`,
    format: 'cjs',
  }, {
    file: `dist/vue-next-clipboard.esm.js`,
    format: 'es',
  }, {
    file: `dist/vue-next-clipboard.umd.js`,
    format: 'umd',
    name: 'vue-next-clipboard'
  }, {
    file: `dist/vue-next-clipboard.umd-prod.js`,
    format: 'umd',
    name: 'vue-next-clipboard',
    plugins: [
      uglify(),
    ],
  } ],
  plugins: [
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      tsconfigOverride: {
        declaration: false,
        declarationDir: null,
        declarationMap: false,
      },
    }),
  ],
};
