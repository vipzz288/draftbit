import React from 'react';
import {
  Button,
  Checkbox,
  Icon,
  Link,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Spacer,
  Surface,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AWSBACKENDApi from '../apis/AWSBACKENDApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const SignInScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [addressValue, setAddressValue] = React.useState('');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [cityValue, setCityValue] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [countryValue, setCountryValue] = React.useState('');
  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [firstNameValue, setFirstNameValue] = React.useState('');
  const [lastNameValue, setLastNameValue] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');
  const [phoneNumberValue, setPhoneNumberValue] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [streetValue, setStreetValue] = React.useState('');
  const [zIPValue, setZIPValue] = React.useState('');
  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  };

  const validateSignIn = (password, email) => {
    if (!email || !password) {
      return true;
    }
    return false;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (Constants['savedEmail']) {
        setEmailInputValue(Constants['savedEmail']);
        setPasswordInputValue(Constants['savedPassword']);
      } else {
        setEmailInputValue('');
        setPasswordInputValue('');
      }
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { borderColor: theme.colors.background.brand },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', justifyContent: 'center', paddingTop: 100 },
          dimensions.width
        )}
      >
        <Image
          resizeMode={'cover'}
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          source={imageSource(Images['images(1)'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              height: 59,
              width: 62,
            }),
            dimensions.width
          )}
        />
      </View>
      <Spacer bottom={8} left={8} right={8} top={8} />
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', paddingTop: 30 },
          dimensions.width
        )}
      >
        {/* Title */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.App['Custom Color 10'],
              fontFamily: 'NunitoSans_700Bold',
              fontSize: 28,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {'Login to Your Account'}
        </Text>
        <Spacer left={8} right={8} bottom={16} top={16} />
      </View>

      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        viewIsInsideTabBar={false}
        enableOnAndroid={true}
        extraScrollHeight={100}
        keyboardOpeningTime={0}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'center', paddingBottom: 250 },
          dimensions.width
        )}
      >
        {/* Login Form */}
        <View
          style={StyleSheet.applyWidth(
            { paddingLeft: 36, paddingRight: 36 },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: [
                  {
                    minWidth: Breakpoints.Mobile,
                    value: palettes.App['Custom Color 5'],
                  },
                  {
                    minWidth: Breakpoints.Mobile,
                    value: emailInputValue ? '#EFF7FF' : '#FAFAFA',
                  },
                ],
                borderColor: emailInputValue
                  ? '#26AEDF'
                  : palettes.Brand.Background,
                borderRadius: 15,
                borderWidth: [
                  { minWidth: Breakpoints.Mobile, value: 1 },
                  {
                    minWidth: Breakpoints.Mobile,
                    value: emailInputValue ? 1 : 0,
                  },
                ],
                flexDirection: 'row',
                justifyContent: 'center',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App['Custom Color 5'],
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: emailInputValue ? '#EFF7FF' : '#FAFAFA',
                    },
                  ],
                  paddingLeft: 10,
                },
                dimensions.width
              )}
            >
              <Icon
                size={24}
                color={emailInputValue ? '#26AEDF' : palettes.Brand.Strong}
                name={'Ionicons/mail'}
              />
            </View>
            {/* Email Input */}
            <TextInput
              autoCapitalize={'none'}
              changeTextDelay={500}
              allowFontScaling={true}
              autoCorrect={true}
              autoFocus={false}
              defaultValue={Constants['savedEmail'] || emailInputValue}
              keyboardType={'email-address'}
              placeholder={'Email'}
              placeholderTextColor={theme.colors.foreground.brand}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App['Custom Color 5'],
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: emailInputValue ? '#EFF7FF' : '#FAFAFA',
                    },
                  ],
                  borderBottomRightRadius: 15,
                  borderColor: theme.colors.background.brand,
                  borderTopRightRadius: 15,
                  color: palettes.App['Custom Color 2'],
                  flex: 1,
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 16,
                },
                dimensions.width
              )}
              textContentType={'emailAddress'}
              webShowOutline={false}
            />
          </View>
          <>
            {!(emailInputValue && isValidEmail(emailInputValue)) ? null : (
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
                {'Invalid email address\n'}
              </Text>
            )}
          </>
          <Spacer left={8} right={8} bottom={12} top={12} />
          {/* View 3 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: [
                  {
                    minWidth: Breakpoints.Mobile,
                    value: palettes.App['Custom Color 5'],
                  },
                  {
                    minWidth: Breakpoints.Mobile,
                    value: passwordInputValue ? '#EFF7FF' : '#FAFAFA',
                  },
                ],
                borderColor: passwordInputValue ? '#26AEDF' : '#FAFAFA',
                borderRadius: 15,
                borderWidth: [
                  { minWidth: Breakpoints.Mobile, value: 1 },
                  {
                    minWidth: Breakpoints.Mobile,
                    value: passwordInputValue ? 1 : 0,
                  },
                ],
                flexDirection: 'row',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: passwordInputValue ? '#EFF7FF' : '#FAFAFA',
                  borderBottomLeftRadius: 15,
                  borderTopLeftRadius: 15,
                  paddingLeft: 10,
                },
                dimensions.width
              )}
            >
              <Icon
                size={24}
                color={passwordInputValue ? '#26AEDF' : palettes.Brand.Strong}
                name={'FontAwesome/lock'}
              />
            </View>
            {/* Password Input */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              defaultValue={Constants['savedPassword'] || passwordInputValue}
              placeholder={'Password'}
              placeholderTextColor={theme.colors.foreground.brand}
              secureTextEntry={true}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App['Custom Color 5'],
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: passwordInputValue ? '#EFF7FF' : '#FAFAFA',
                    },
                  ],
                  borderBottomRightRadius: 15,
                  borderColor: theme.colors.background.brand,
                  borderTopRightRadius: 15,
                  color: theme.colors.text.strong,
                  flex: 1,
                  fontFamily: 'Inter_500Medium',
                  fontSize: 14,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 16,
                },
                dimensions.width
              )}
              webShowOutline={false}
            />
          </View>
          <Spacer left={8} right={8} bottom={12} top={12} />
          {/* Error Message */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.background.danger,
                fontFamily: 'Inter_600SemiBold',
                fontSize: 12,
                marginBottom: 8,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {errorMessage}
          </Text>
          {/* View 4 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 12,
              },
              dimensions.width
            )}
          >
            <Checkbox
              onCheck={() => {
                try {
                  setGlobalVariableValue({
                    key: 'rememberMe',
                    value: true,
                  });
                  setGlobalVariableValue({
                    key: 'savedEmail',
                    value: emailInputValue,
                  });
                  setGlobalVariableValue({
                    key: 'savedPassword',
                    value: passwordInputValue,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              onUncheck={() => {
                try {
                  setGlobalVariableValue({
                    key: 'rememberMe',
                    value: false,
                  });
                  setGlobalVariableValue({
                    key: 'savedEmail',
                    value: '',
                  });
                  setGlobalVariableValue({
                    key: 'savedPassword',
                    value: '',
                  });
                  setEmailInputValue('');
                  setPasswordInputValue('');
                } catch (err) {
                  console.error(err);
                }
              }}
              checkedIcon={'Ionicons/checkbox'}
              color={palettes.App['Custom Color 2']}
              status={checkboxValue}
              style={StyleSheet.applyWidth(
                { height: 23, width: 23 },
                dimensions.width
              )}
              uncheckedColor={palettes.App['Custom Color 2']}
              uncheckedIcon={'MaterialCommunityIcons/checkbox-blank-outline'}
            />
            <Spacer bottom={8} left={8} top={8} right={4} />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { fontFamily: 'NunitoSans_500Medium', fontSize: 12 }
                ),
                dimensions.width
              )}
            >
              {'Remember me'}
            </Text>
          </View>

          <Surface
            {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
            elevation={3}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                { borderRadius: 100, marginTop: 30, minHeight: null }
              ),
              dimensions.width
            )}
          >
            {/* Sign In Button */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    const loginResponse = (
                      await AWSBACKENDApi.loginPOST(Constants, {
                        password:
                          passwordInputValue || Constants['savedPassword'],
                        username: emailInputValue || Constants['savedEmail'],
                      })
                    )?.json;
                    if (Constants['rememberMe']) {
                      setGlobalVariableValue({
                        key: 'savedEmail',
                        value: emailInputValue,
                      });
                      setGlobalVariableValue({
                        key: 'savedPassword',
                        value: passwordInputValue,
                      });
                    } else {
                      setGlobalVariableValue({
                        key: 'savedPassword',
                        value: '',
                      });
                      setGlobalVariableValue({
                        key: 'savedEmail',
                        value: '',
                      });
                    }

                    if (loginResponse?.status === 0) {
                      setGlobalVariableValue({
                        key: 'AUTH_HEADER',
                        value: loginResponse?.data?.token,
                      });
                      navigation.navigate('Home2Screen');
                    } else {
                      const error = loginResponse?.message;
                      setErrorMessage(error);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              disabled={validateSignIn(passwordInputValue, emailInputValue)}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App['Custom Color 2'],
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: validateSignIn(passwordInputValue, emailInputValue)
                        ? palettes.Brand.Light
                        : '#26AEDF',
                    },
                  ],
                  borderRadius: 100,
                  fontFamily: 'NunitoSans_700Bold',
                  fontSize: 16,
                  paddingBottom: 16,
                  paddingTop: 16,
                  textAlign: 'center',
                },
                dimensions.width
              )}
              title={'Sign in'}
            >
              {'Sign Up'}
            </Button>
          </Surface>
          <Spacer left={8} right={8} bottom={16} top={16} />
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginBottom: 12,
              },
              dimensions.width
            )}
          >
            <Link
              accessible={true}
              onPress={() => {
                try {
                  navigation.navigate('ForgotPasswordScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              selectable={false}
              {...GlobalStyles.LinkStyles(theme)['Link'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.LinkStyles(theme)['Link'].style,
                  {
                    color: palettes.App['Custom Color 2'],
                    fontFamily: 'NunitoSans_500Medium',
                    fontSize: 16,
                  }
                ),
                dimensions.width
              )}
              title={'Forgot Password?'}
            />
            <Spacer bottom={8} left={8} right={8} top={8} />
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row' },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color 9'],
                    fontFamily: 'NunitoSans_500Medium',
                    opacity: 1,
                  },
                  dimensions.width
                )}
              >
                {"Don't have an account?"}
              </Text>
              <Spacer bottom={8} top={8} left={2} right={2} />
              {/* Sign Up Link */}
              <Link
                accessible={true}
                onPress={() => {
                  try {
                    navigation.navigate('RegistrationScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color 2'],
                    fontFamily: 'NunitoSans_700Bold',
                    fontSize: 13,
                  },
                  dimensions.width
                )}
                title={'Sign up'}
              />
            </View>
          </View>
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(SignInScreen);
