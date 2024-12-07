import React from 'react';
import {
  Button,
  Icon,
  KeyboardAvoidingView,
  Link,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
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

const defaultProps = { email: null };

const EnterOTPScreen = props => {
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
                    navigation.navigate('ForgotPasswordScreen');
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
              {'Verify Account'}
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
                'Code has been send to abc@xyz.com\nEnter The Code To Verify Your Account.'
              }
            </Text>
            {/* OTP */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 40,
                },
                dimensions.width
              )}
            >
              {/* OTP Input */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newOTPInputValue => {
                  try {
                    setTextInputValue(newOTPInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                editable={true}
                keyboardType={'numeric'}
                placeholder={''}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['BG Gray'],
                    borderBottomWidth: 1,
                    borderColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: theme.colors.border.brand,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: textInputValue
                          ? '#26AEDF'
                          : palettes.Brand.Background,
                      },
                    ],
                    borderLeftWidth: 1,
                    borderRadius: 16,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    fontFamily: 'NunitoSans_600SemiBold',
                    fontSize: 31,
                    height: 72,
                    paddingBottom: 8,
                    paddingTop: 8,
                    textAlign: 'center',
                    width: '23%',
                  },
                  dimensions.width
                )}
                value={textInputValue}
              />
              {/* OTP Input 2 */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newOTPInput2Value => {
                  try {
                    setTextInputValue(newOTPInput2Value);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                editable={true}
                keyboardType={'numeric'}
                placeholder={''}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['BG Gray'],
                    borderBottomWidth: 1,
                    borderColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: theme.colors.border.brand,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: textInputValue
                          ? '#26AEDF'
                          : palettes.Brand.Background,
                      },
                    ],
                    borderLeftWidth: 1,
                    borderRadius: 16,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    fontFamily: 'NunitoSans_600SemiBold',
                    fontSize: 31,
                    height: 72,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                    textAlign: 'center',
                    width: '23%',
                  },
                  dimensions.width
                )}
                value={textInputValue}
              />
              {/* OTP Input 3 */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newOTPInput3Value => {
                  try {
                    setTextInputValue(newOTPInput3Value);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                editable={true}
                keyboardType={'numeric'}
                placeholder={''}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['BG Gray'],
                    borderBottomWidth: 1,
                    borderColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: theme.colors.border.brand,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: textInputValue
                          ? '#26AEDF'
                          : palettes.Brand.Background,
                      },
                    ],
                    borderLeftWidth: 1,
                    borderRadius: 16,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    fontFamily: 'NunitoSans_600SemiBold',
                    fontSize: 31,
                    height: 72,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                    textAlign: 'center',
                    width: '23%',
                  },
                  dimensions.width
                )}
                value={textInputValue}
              />
              {/* OTP Input 4 */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newOTPInput4Value => {
                  try {
                    setTextInputValue(newOTPInput4Value);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                editable={true}
                keyboardType={'numeric'}
                placeholder={''}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['BG Gray'],
                    borderBottomWidth: 1,
                    borderColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: theme.colors.border.brand,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: textInputValue
                          ? '#26AEDF'
                          : palettes.Brand.Background,
                      },
                    ],
                    borderLeftWidth: 1,
                    borderRadius: 16,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    fontFamily: 'NunitoSans_600SemiBold',
                    fontSize: 31,
                    height: 72,
                    paddingBottom: 8,
                    paddingTop: 8,
                    textAlign: 'center',
                    width: '23%',
                  },
                  dimensions.width
                )}
                value={textInputValue}
              />
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
            style={StyleSheet.applyWidth(
              { justifyContent: 'center' },
              dimensions.width
            )}
            viewIsInsideTabBar={false}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignSelf: 'center', flexDirection: 'row', marginTop: 50 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text 3'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text 3'].style,
                    {
                      color: palettes.App['Custom Color 9'],
                      fontFamily: 'NunitoSans_500Medium',
                      fontSize: 13,
                    }
                  ),
                  dimensions.width
                )}
              >
                {"Didn't Receive Code? "}
              </Text>
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
                      fontSize: 13,
                    }
                  ),
                  dimensions.width
                )}
                title={'Resend\n'}
              />
            </View>

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
                    navigation.navigate('CreatePasswordScreen');
                  } catch (err) {
                    console.error(err);
                  }
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
                title={'Verify'}
              />
            </Surface>
          </SimpleStyleKeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(EnterOTPScreen);
