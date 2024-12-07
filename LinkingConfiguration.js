/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

function renderLinkingPrefix() {
  try {
    return Linking.createURL('/');
  } catch (e) {
    return 'draftbit://';
  }
}

const prefix = renderLinkingPrefix();

const linking = {
  enabled: Platform.OS === 'web' ? false : true,
  prefixes: [prefix],
  config: {
    screens: {
      LinkDeliveredSuccessScreen: {
        screens: {
          LinkDeliveredSuccessScreen: {
            path: 'LinkDeliveredSuccessScreen',
          },
        },
      },

      ResetPasswordScreen: {
        screens: {
          ResetPasswordScreen: {
            path: 'ResetPasswordScreen',
          },
        },
      },

      SignInScreen: {
        screens: {
          SignInScreen: {
            path: 'SignInScreen',
          },
        },
      },
    },
  },
};

export default linking;
