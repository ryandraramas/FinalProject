module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      ['module:react-native-dotenv', {
        'envName': 'APP_ENV',
        'moduleName': '@env',
        'path': '.env',
      }],
      // ['expo-image-picker', {
      //   'photosPermission': 'The app accesses your photos to let you share them with your friends.'
      // }]
    ],
  };
};
