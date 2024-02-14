module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            // This has to be mirrored in tsconfig.json
            '^@src/(.+)': './src/\\1',
          },
        },
      ],
    ],
  };
};
