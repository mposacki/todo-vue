module.exports = {
  // presets: ["@vue/cli-plugin-babel/preset"]
  presets: [
    '@vue/app',
  ],
  env: {
    test: {
      presets: ['@babel/env'],
      plugins: [
        '@babel/transform-runtime',
      ],
    },
  },
};
