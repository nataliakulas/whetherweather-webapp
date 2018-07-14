module.exports = {
  webpack: (config, {}) => {
    config.module.rules.push(
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    );

    return config;
  },
};
