import React from 'react';
import {
  Button,
  Icon,
  KeyboardAvoidingView,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Surface,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AWSBACKENDApi from '../apis/AWSBACKENDApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const ForgotPasswordScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [addressValue, setAddressValue] = React.useState('');
  const [cityValue, setCityValue] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [countryValue, setCountryValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [firstNameValue, setFirstNameValue] = React.useState('');
  const [lastNameValue, setLastNameValue] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumberValue, setPhoneNumberValue] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [streetValue, setStreetValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [zIPValue, setZIPValue] = React.useState('');
  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
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
                    navigation.navigate('SignInScreen');
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

          <SimpleStyleKeyboardAwareScrollView
            enableAutomaticScroll={false}
            enableOnAndroid={false}
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={true}
            viewIsInsideTabBar={false}
          >
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
                {'Forgot Password?'}
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
                {
                  "Don't Worry! It Occurs. Please Enter The Email Address Linked With Your Account"
                }
              </Text>
              {/* Email */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newEmailValue => {
                  try {
                    setTextInputValue(newEmailValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                editable={true}
                placeholder={'Email'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color 5'],
                    borderColor: theme.colors.text.strong,
                    borderRadius: 15,
                    color: palettes.App['Custom Color 17'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    height: 48,
                    marginTop: 20,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={textInputValue}
              />
              <>
                {!(textInputValue && isValidEmail(textInputValue)) ? null : (
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: theme.colors.background.danger,
                          paddingTop: 10,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Please enter valid email address\n'}
                  </Text>
                )}
              </>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { color: theme.colors.background.danger, paddingTop: 10 }
                  ),
                  dimensions.width
                )}
              >
                {errorMessage}
              </Text>
            </View>
          </SimpleStyleKeyboardAwareScrollView>
        </View>

        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={0}
          enabled={true}
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
                const handler = async () => {
                  try {
                    const forgotPasswordResponse = (
                      await AWSBACKENDApi.forgotPasswordPOST(Constants, {
                        email: textInputValue,
                      })
                    )?.json;
                    if (forgotPasswordResponse?.status === 0) {
                      navigation.navigate('EnterOTPScreen', {
                        email: textInputValue,
                      });
                    } else {
                      setErrorMessage(forgotPasswordResponse?.errorMessage);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              disabled={isValidEmail(textInputValue)}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: isValidEmail(textInputValue)
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
        </KeyboardAvoidingView>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(ForgotPasswordScreen);
