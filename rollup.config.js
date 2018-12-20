import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

const banner = `/*
${pkg.name} v${pkg.version}
https://github.com/atomita/${pkg.name}
Released under the MIT License.
*/`;

export default {
  input: 'src/index.ts',
  output: {
    file: `dist/${pkg.name}.js`,
    format: 'umd',
    name: pkg.name,
    sourcemap: true,
    banner,
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
