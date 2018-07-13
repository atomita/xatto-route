import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: {
    file: `dist/${pkg.name}.js`,
    format: 'umd',
    name: pkg.name,
    sourcemap: true,
  },
  plugins: [typescript({
    exclude: [
      '*.d.ts',
      '**/*.d.ts',
      '*.test.ts',
      '**/*.test.ts',
      '*.test.tsx',
      '**/*.test.tsx'
    ]
  })],
}
