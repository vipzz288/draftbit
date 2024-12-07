import React from 'react';
import {
  Button,
  Icon,
  KeyboardAvoidingView,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Spacer,
  Surface,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const CreatePasswordScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const isValidPassword = password => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return !passwordRegex.test(password);
  };

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, flexDirection: 'column', justifyContent: 'space-between' },
          dimensions.width
        )}
      >
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          {/* Header */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingTop: 20,
              },
              dimensions.width
            )}
          >
            {/* Back */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: 48,
                  justifyContent: 'center',
                  width: 48,
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate('EnterOTPScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Icon
                  size={24}
                  color={palettes.App['Custom Color 2']}
                  name={'Entypo/chevron-thin-left'}
                />
              </Touchable>
            </View>
            {/* Blank */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  height: 48,
                  justifyContent: 'center',
                  width: 48,
                },
                dimensions.width
              )}
            />
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                justifyContent: 'space-evenly',
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
              },
              dimensions.width
            )}
          >
            {/* Heading */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  fontFamily: 'NunitoSans_700Bold',
                  fontSize: 30,
                  marginBottom: 10,
                },
                dimensions.width
              )}
            >
              {'Create New Password'}
            </Text>
            {/* sub heading */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 16'],
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  opacity: 0.7,
                  paddingBottom: 10,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Your New Password Must Be Unique From The Previously Used'}
            </Text>
            {/* View 2 */}
            <View>
              {/* Password Input */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newPasswordInputValue => {
                  try {
                    setPassword(newPasswordInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                placeholder={'Password'}
                placeholderTextColor={theme.colors.foreground.brand}
                secureTextEntry={true}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color 5'],
                    borderRadius: 15,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    paddingBottom: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
                textContentType={'password'}
                value={password}
              />
              {/* Text 4 */}
              <>
                {!(password && isValidPassword(password)) ? null : (
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: theme.colors.background.danger,
                          textAlign: 'left',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      'Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.'
                    }
                  </Text>
                )}
              </>
              {/* Spacer 2 */}
              <Spacer bottom={8} left={8} right={8} top={8} />
              {/* Confirm Password */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newConfirmPasswordValue => {
                  try {
                    setConfirmPassword(newConfirmPasswordValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                placeholder={'Confirm Password' ?? 'Password'}
                placeholderTextColor={theme.colors.foreground.brand}
                secureTextEntry={true}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color 5'],
                    borderRadius: 15,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                    paddingBottom: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
                textContentType={'password'}
                value={confirmPassword}
              />
              <>
                {!(password !== confirmPassword) ? null : (
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        { color: theme.colors.background.danger }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Passwords do not match'}
                  </Text>
                )}
              </>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={'padding'}
          enabled={true}
          keyboardVerticalOffset={0}
        >
          {/* Keyboard Aware Scroll View 2 */}
          <SimpleStyleKeyboardAwareScrollView
            keyboardShouldPersistTaps={'never'}
            enableAutomaticScroll={true}
            enableOnAndroid={true}
            enableResetScrollToCoords={false}
            extraScrollHeight={100}
            showsVerticalScrollIndicator={false}
            viewIsInsideTabBar={false}
          >
            <Surface
              {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
              elevation={3}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                  {
                    borderRadius: 100,
                    marginBottom: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 50,
                    minHeight: null,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Send */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    navigation.navigate('SignInScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                disabled={/* no custom function named isValidEmail */ undefined}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor:
                      /* no custom function named isValidEmail */ undefined
                        ? palettes.Brand.Light
                        : '#26AEDF',
                    borderRadius: 100,
                    color: palettes.Brand.Surface,
                    fontFamily: 'NunitoSans_700Bold',
                    fontSize: 17,
                    height: 46,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Send Code'}
              />
            </Surface>
          </SimpleStyleKeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(CreatePasswordScreen);
