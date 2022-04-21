import typescript from '@rollup/plugin-typescript'
export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: './lib/min-vue.cjs.js'
    },
    {
      format: 'es',
      file: './lib/min-vue.esm.js'
    },
  ],
  plugins: [
    typescript()
  ]
}