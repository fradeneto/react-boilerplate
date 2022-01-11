# React Boilerplate

## Initialize a Project
```
mkdir react-from-scratch
```
```
cd react-from-stratch
```
```
npm init -y
```

## Primary Setup
```
mkdir src
```
```
touch src/index.html
```

#### src/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React From Scratch</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## React

### Install React
```
npm install react react-dom
```

### Create Index File
```
touch src/index.tsx
```

### src/index.tsx
```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render( 
  <div>This is a new react app</div>, 
  document.getElementById('root')
);
```

## TypeScript

### Install Typescript
```
npm install -D typescript @types/react @types/react-dom
```

### Configure TypeScript
```
touch tsconfig.json
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": [
      "DOM",
      "ESNext"
    ],
    "jsx": "react-jsx",
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true ,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "baseUrl": ".",
    "paths": {
      "@src/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "dist"]
}
```

## Babel

### Instal Babel
```
npm install -D \
  @babel/core \
  @babel/cli \
  @babel/preset-env \
  @babel/preset-typescript \
  @babel/preset-react \
  @babel/runtime \
  @babel/plugin-transform-runtime \
  @babel/plugin-transform-modules-commonjs \
  babel-plugin-module-resolver
```

### Configure Babel
```
touch babel.config.js
```

#### babel.config.js
```js
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
```

## Webpack

### Install Webpack
```
npm install -D \
  webpack \
  webpack-cli \
  webpack-dev-server \
  style-loader \
  css-loader \
  sass \
  sass-loader \
  babel-loader \
  html-webpack-plugin \
  clean-webpack-plugin
```
### Configure webpack
```
touch webpack.config.js
```

#### webpack.config.js
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, './src'),
    port: 3001,
    hot: 'only',
    compress: true,
    open: true,
  },
};
```

## CSS/SASS Modules
### Configure Modules Declaration
```
touch src/@types/declaration.d.ts
```
#### src/@types/declaration.d.ts
```ts
declare module '*.module.scss'
declare module '*.module.sass'
declare module '*.module.css'
```
## Add Script
#### package.json
```json
"scripts": {
  "start": "webpack serve --config webpack.config.js --env env=development",
  "build": "webpack --config webpack.config.js --env env=production"
},
```

## Prettier

### Install Prettier
```
npm install -D \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier
```
```
touch .prettierrc.js
```

#### .prettierrc.js
```js
module.exports = {
  semi: true,
  trailingComma: 'all',
  jsxSingleQuote: false,
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
};
```

## ESLint
### Install Eslint
```
npm install -D \
  eslint@^8.6.0 \
  eslint-config-airbnb@latest \
  eslint-config-prettier \
  eslint-plugin-import@^2.25.3 \
  eslint-plugin-jsx-a11y@^6.5.1 \
  eslint-plugin-prettier \
  eslint-plugin-react@^7.28.0 \
  eslint-plugin-react-hooks@^4.3.0 \
  @typescript-eslint/parser@latest \
  @typescript-eslint/eslint-plugin@latest
```
```
touch .eslintrc.js
```

#### .eslintrc.json
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["plugin:react/recommended", "airbnb"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 13,
    "sourceType": "module"
  },
  "plugins": [
      "react", 
      "@typescript-eslint"
    ],
  "rules": {
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".ts"] }],
    "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
}
```
#### .eslintrc.js
```js
module.exports = {

    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended', //should be at the last
    ],
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-var-requires': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
```

### Script for Linter and Prettier
```json
"scripts": {
    "start": "webpack serve --config webpack/webpack.config.js --env env=dev",
    "build": "webpack --config webpack/webpack.config.js --env env=prod",
    "lint": "eslint --fix \"./src/**/*.{js,jsx,ts,tsx,json}\"",
    "format": "prettier --write \"./src/**/*.{js,jsx,ts,tsx,json,css,scss,md}\""
},
```

## TailwindCSS

### Install Tailwind
```
npm install -D tailwindcss postcss autoprefixer postcss-loader
```
```
npx tailwindcss init -p
```
#### postcss.config.js
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
#### tailwind.config.js
```js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### main.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### webpack.config.js
```js
...
{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
},
...
```