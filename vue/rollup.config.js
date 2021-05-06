/*
 * @Author: 杨宏旋
 * @Date: 2021-05-06 18:21:44
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-06 18:38:27
 * @Description:
 */
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: './lib/vue.cjs.js',
      format: 'cjs',
      name: 'vue.cjs.js',
    },
    {
      file: './lib/vue.es.js',
      format: 'es',
      name: 'vue.es.js',
    },
    {
      file: './lib/vue.umd.js',
      format: 'umd',
      name: 'vue.umd.js',
    },
    {
      file: './lib/vue.amd.js',
      format: 'amd',
      name: 'vue.amd.js',
    },
    {
      file: './lib/vue.system.js',
      format: 'system',
      name: 'vue.system.js',
    },
    {
      file: './lib/vue.iife.js',
      format: 'iife',
      name: 'vue.iife.js',
    },
  ],
  plugins: [babel(), terser({ compress: { drop_console: true } })],
}
