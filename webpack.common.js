const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

exports.serverConfig = {
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  entry: {
    server: './src/server/index.js',
    functions: './src/functions/index.js'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist/lambda'),
    library: 'handler',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    'aws-sdk': 'commonjs aws-sdk'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/images', to: '../static/images' },
      { from: 'src/fonts', to: '../static/fonts' }
    ]),
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react'],
          plugins: [
            "transform-class-properties",
            ["inline-json-import", {}],
            ["styled-components", { ssr: true }]
          ]
        }
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
};

exports.browserConfig = {
  target: 'web',
  entry: './src/browser/index.js',
  output: {
    filename: 'browser-bundle.js',
    path: path.resolve(__dirname, 'dist/static/assets')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react'],
          plugins: [
            "transform-class-properties",
            ["inline-json-import", {}],
            "styled-components"
          ]
        }
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
}
