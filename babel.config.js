/* eslint-disable no-restricted-syntax */
const { compilerOptions } = require('./tsconfig.json');

function getPaths() {
  const { paths: tsconfigPaths } = compilerOptions;
  const babelPaths = {};
  for (const [key, value] of Object.entries(tsconfigPaths)) {
    babelPaths[key.substring(0, key.length - 2)] = value[0].substring(0, value[0].length - 2);
  }
  return babelPaths;
}

module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    ['module-resolver', {
      alias: getPaths(),
    }],
  ],
};
