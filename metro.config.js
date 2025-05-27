// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...(config.resolver.alias || {}),
  'react-native-maps': path.resolve(__dirname, 'web/emptyModule.js'),
  'react-native/Libraries/Utilities/codegenNativeCommands': path.resolve(__dirname, 'web/emptyModule.js'),
};

module.exports = config;
