import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import LinkingConfiguration from './LinkingConfiguration';
import * as GlobalVariables from './config/GlobalVariableContext';
import BlankScreen from './screens/BlankScreen';
import CreatePasswordScreen from './screens/CreatePasswordScreen';
import EnterOTPScreen from './screens/EnterOTPScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import Home2Screen from './screens/Home2Screen';
import Home3Screen from './screens/Home3Screen';
import HomeScreen from './screens/HomeScreen';
import LinkDeliveredSuccessScreen from './screens/LinkDeliveredSuccessScreen';
import PhoneLoginScreen from './screens/PhoneLoginScreen';
import RegistrationPart2Screen from './screens/RegistrationPart2Screen';
import RegistrationScreen from './screens/RegistrationScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import SignInScreen from './screens/SignInScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import palettes from './themes/palettes';
import Breakpoints from './utils/Breakpoints';
import useWindowDimensions from './utils/useWindowDimensions';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

function DefaultDrawerIcon({ tintColor, navigation }) {
  return (
    <Touchable
      onPress={() => navigation.toggleDrawer()}
      style={[styles.headerContainer, styles.headerContainerLeft]}
    >
      <Icon
        name="EvilIcons/navicon"
        size={27}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </Touchable>
  );
}

export default function RootAppNavigator() {
  const theme = useTheme();

  const Constants = GlobalVariables.useValues();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#FFFFFF',
        },
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          cardStyle: { flex: 1 },
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        })}
      >
        <Stack.Screen
          name="PhoneLoginScreen"
          component={PhoneLoginScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Phone Login',
          })}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Registration',
          })}
        />
        <Stack.Screen
          name="BlankScreen"
          component={BlankScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Blank',
          })}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Welcome',
          })}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Sign In',
          })}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Home',
          })}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Forgot Password',
          })}
        />
        <Stack.Screen
          name="LinkDeliveredSuccessScreen"
          component={LinkDeliveredSuccessScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Link Delivered Success',
          })}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Reset Password',
          })}
        />
        <Stack.Screen
          name="Home2Screen"
          component={Home2Screen}
          options={({ navigation }) => ({
            cardOverlayEnabled: true,
            headerShown: false,
            title: 'Home 2',
          })}
        />
        <Stack.Screen
          name="RegistrationPart2Screen"
          component={RegistrationPart2Screen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Registration Part 2',
          })}
        />
        <Stack.Screen
          name="Home3Screen"
          component={Home3Screen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Home 3',
          })}
        />
        <Stack.Screen
          name="EnterOTPScreen"
          component={EnterOTPScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Enter OTP',
          })}
        />
        <Stack.Screen
          name="CreatePasswordScreen"
          component={CreatePasswordScreen}
          options={({ navigation }) => ({
            title: 'Create Password',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});
