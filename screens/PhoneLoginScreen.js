import React from 'react';
import {
  Button,
  IconButton,
  KeyboardAvoidingView,
  Link,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Spacer,
  Surface,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Modal, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AWSBACKENDApi from '../apis/AWSBACKENDApi.js';
import * as XanoApi from '../apis/XanoApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const PhoneLoginScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const cleanPhoneNumber = phoneNumber => {
    return phoneNumber.replace(/\D/g, '');
  };

  const formatPhoneNumber = number => {
    const cleaned = ('' + number).replace(/\D/g, '').slice(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : cleaned;
  };

  const isValidPhoneNumber = phoneNumber => {
    const phoneRegex = /^[0-9()\s-]+$/;

    return !(phoneNumber.length === 14 && phoneRegex.test(phoneNumber));
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        setOpenModal(true);
        await waitUtil({ milliseconds: 15000 });
        setOpenModal(false);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasBottomSafeArea={false}
      hasSafeArea={true}
      hasTopSafeArea={false}
      scrollable={true}
      style={StyleSheet.applyWidth(
        { height: '100%', width: '100%' },
        dimensions.width
      )}
    >
      {/* Main View */}
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
        <View
          style={StyleSheet.applyWidth(
            { paddingLeft: 20, paddingRight: 20, width: '100%' },
            dimensions.width
          )}
        >
          <Image
            {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
            resizeMode={'contain'}
            source={imageSource(Images['layer1(1)'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image 2'].style,
                {
                  height: 35,
                  left: 100,
                  position: 'absolute',
                  top: 250,
                  width: 205,
                }
              ),
              dimensions.width
            )}
          />
        </View>

        <KeyboardAvoidingView
          behavior={'padding'}
          enabled={true}
          keyboardVerticalOffset={0}
          androidBehavior={'position'}
          iosBehavior={'position'}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background.brand,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              bottom: 0,
              flex: 1,
              height: '45%',
              position: 'absolute',
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Card */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors.background.brand,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                flexGrow: 1,
              },
              dimensions.width
            )}
          >
            {/* Header */}
            <View
              style={StyleSheet.applyWidth(
                { justifyContent: 'center', paddingLeft: 20 },
                dimensions.width
              )}
            />
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  fontFamily: 'NunitoSans_700Bold',
                  fontSize: 35,
                  marginLeft: 30,
                  marginTop: 35,
                  opacity: 0.8,
                },
                dimensions.width
              )}
            >
              {"Let's get you in!\n"}
            </Text>
            {/* Phone number */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newPhoneNumberValue => {
                try {
                  const functionOutput = formatPhoneNumber(newPhoneNumberValue);
                  setTextInputValue(functionOutput);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              keyboardType={'numeric'}
              placeholder={'Phone Number'}
              placeholderTextColor={theme.colors.foreground.brand}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom Color 5'],
                  borderBottomWidth: 1,
                  borderColor: theme.colors.background.brand,
                  borderLeftWidth: 1,
                  borderRadius: 15,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_400Regular',
                  fontSize: 15,
                  height: 48,
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: 35,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingRight: 8,
                  paddingTop: 8,
                },
                dimensions.width
              )}
              textContentType={'telephoneNumber'}
              value={textInputValue}
            />
            {/* Error msg */}
            <>
              {!errorMessage ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color_4'],
                      fontFamily: 'Inter_200ExtraLight',
                      marginLeft: 30,
                      marginTop: 8,
                    },
                    dimensions.width
                  )}
                >
                  {errorMessage}
                </Text>
              )}
            </>
            <Surface
              {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
              elevation={3}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                  {
                    borderRadius: 100,
                    height: 52,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 52,
                    minHeight: 0,
                  }
                ),
                dimensions.width
              )}
            >
              {/* Continue enabled */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      const plainPhoneNumber = cleanPhoneNumber(textInputValue);
                      const response = (
                        await AWSBACKENDApi.getUserByPhoneGET(Constants, {
                          mobile_number: plainPhoneNumber,
                        })
                      )?.json;
                      if (response?.data?.[0]) {
                        if (response?.data?.[0]?.mobile_number) {
                          navigation.navigate('RegistrationScreen', {
                            phone: response?.data?.[0]?.mobile_number,
                            name: response?.data?.[0]?.first_name,
                            last_name: response?.data?.[0]?.last_name,
                            email: response?.data?.[0]?.email,
                            add_street:
                              response?.data?.[0]?.addresses?.[0]?.street,
                            add_city: response?.data?.[0]?.addresses?.[0]?.city,
                            add_zip: response?.data?.[0]?.addresses?.[0]?.zip,
                            add_state:
                              response?.data?.[0]?.addresses?.[0]?.state,
                            hcp_customer_id: response?.data?.[0]?.id,
                            add_country:
                              response?.data?.[0]?.addresses?.[0]?.country,
                          });
                        } else {
                          setErrorMessage(
                            response?.message ===
                              'Something went wrong. Try again later'
                          );
                        }
                      } else {
                        navigation.navigate('RegistrationScreen', {
                          phone: plainPhoneNumber,
                          name: null,
                          last_name: null,
                          email: null,
                          add_street: null,
                          add_city: null,
                          add_zip: null,
                        });
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                disabled={textInputValue?.length !== 14}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['Custom Color 2'],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          textInputValue?.length !== 14
                            ? palettes.Brand.Light
                            : '#26AEDF',
                      },
                    ],
                    borderRadius: 100,
                    color: palettes.App['Custom Color'],
                    fontFamily: 'NunitoSans_700Bold',
                    fontSize: 16,
                    height: 52,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Sign in'}
              />
            </Surface>
          </View>
        </KeyboardAvoidingView>
      </View>
      <Image
        {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
        resizeMode={'repeat'}
        source={imageSource(Images['screenshotfrom20241203174828'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image 2'].style, {
            bottom: 0,
            height: null,
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
            width: null,
            zIndex: -51,
          }),
          dimensions.width
        )}
      />
    </ScreenContainer>
  );
};

export default withTheme(PhoneLoginScreen);
