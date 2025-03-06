module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Add React Native Reanimated support
      "react-native-reanimated/plugin",
    ],
  };
};
