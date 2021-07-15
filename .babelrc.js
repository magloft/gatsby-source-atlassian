module.exports = {
  presets: [['babel-preset-gatsby-package']],
  plugins: [
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['babel-plugin-module-resolver', { alias: { '~': './src' } }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
}
