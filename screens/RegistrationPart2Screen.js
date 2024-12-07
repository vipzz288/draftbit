import React from 'react';
import {
  Button,
  IconButton,
  Link,
  Picker,
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
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import parseBoolean from '../utils/parseBoolean';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = {
  add_city: null,
  add_country: null,
  add_state: null,
  add_street: null,
  add_zip: null,
  confirm_password: null,
  email: null,
  hcp_customer_id: null,
  last_name: null,
  name: null,
  password: null,
  phone: null,
};

const RegistrationPart2Screen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [addressValue, setAddressValue] = React.useState('');
  const [cityValue, setCityValue] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [countryValue, setCountryValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [firstNameValue, setFirstNameValue] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [lastNameValue, setLastNameValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [phoneNumberValue, setPhoneNumberValue] = React.useState('');
  const [pickerOptions, setPickerOptions] = React.useState([
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' },
  ]);
  const [pickerValue, setPickerValue] = React.useState('');
  const [streetValue, setStreetValue] = React.useState('');
  const [zIPValue, setZIPValue] = React.useState('');
  const cleanPhoneNumber = phoneNumber => {
    return phoneNumber.replace(/\D/g, '');
  };

  const formatPhoneNumber = number => {
    const cleaned = ('' + number).replace(/\D/g, '').slice(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : cleaned;
  };

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  };

  const isValidName = name => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return !nameRegex.test(name);
  };

  const isValidPassword = password => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return !passwordRegex.test(password);
  };

  const validateSignUp = (street, city, country, zip, state) => {
    if (!street || !city || !state || !country || !zip) {
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
      console.log(props.route?.params?.password ?? defaultProps.password);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      hasTopSafeArea={true}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: '10%',
            justifyContent: 'center',
            paddingTop: 30,
          },
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
      {/* Header */}
      <View style={StyleSheet.applyWidth({ height: '10%' }, dimensions.width)}>
        {/* Title */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              alignSelf: 'flex-start',
              color: palettes.App['Custom Color 11'],
              fontFamily: 'NunitoSans_700Bold',
              fontSize: 30,
              paddingBottom: 20,
              paddingLeft: 40,
              paddingTop: 20,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {'Add Your Address'}
        </Text>
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
        style={StyleSheet.applyWidth({ paddingBottom: 220 }, dimensions.width)}
      >
        {/* View 2 */}
        <View>
          {/* Register Form */}
          <View
            style={StyleSheet.applyWidth(
              { height: '75%', paddingLeft: 36, paddingRight: 36 },
              dimensions.width
            )}
          >
            {/* Address */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderColor: theme.colors.text.medium,
                  borderStyle: 'solid',
                  marginBottom: 8,
                },
                dimensions.width
              )}
            >
              {/* View 6 */}
              <View>
                {/* Street */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onChangeText={newStreetValue => {
                    try {
                      setStreetValue(newStreetValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  defaultValue={
                    props.route?.params?.add_street ?? defaultProps.add_street
                  }
                  keyboardType={'default'}
                  maxLength={50}
                  placeholder={'Street' ?? 'Password'}
                  placeholderTextColor={theme.colors.foreground.brand}
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
                  textContentType={'telephoneNumber'}
                />
                {/* Spacer 3 */}
                <Spacer left={8} right={8} bottom={8} top={8} />
              </View>
              {/* View 3 */}
              <View>
                {/* City */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onChangeText={newCityValue => {
                    try {
                      setCityValue(newCityValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  defaultValue={
                    props.route?.params?.add_city ?? defaultProps.add_city
                  }
                  keyboardType={'default'}
                  maxLength={50}
                  placeholder={'City' ?? 'Password'}
                  placeholderTextColor={theme.colors.foreground.brand}
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
                  textContentType={'telephoneNumber'}
                />
                {/* Spacer 3 */}
                <Spacer left={8} right={8} bottom={8} top={8} />
              </View>
              {/* View 5 */}
              <View>
                <Picker
                  autoDismissKeyboard={true}
                  dropDownBackgroundColor={theme.colors.background.brand}
                  dropDownBorderRadius={8}
                  dropDownBorderWidth={1}
                  dropDownTextColor={theme.colors.text.strong}
                  iconSize={24}
                  leftIconMode={'inset'}
                  mode={'native'}
                  onValueChange={newPickerValue => {
                    try {
                      setPickerValue(newPickerValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  selectedIconColor={theme.colors.text.strong}
                  selectedIconName={'Feather/check'}
                  selectedIconSize={20}
                  type={'solid'}
                  dropDownBorderColor={theme.colors.background.brand}
                  options={pickerOptions}
                  placeholder={'State'}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom Color 5'],
                      borderRadius: 15,
                      borderWidth: 0,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      paddingBottom: 12,
                      paddingRight: 16,
                      paddingTop: 12,
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                  value={pickerValue}
                />
                {/* Spacer 3 */}
                <Spacer left={8} right={8} bottom={8} top={8} />
              </View>
              {/* View 2 */}
              <View>
                {/* Unit */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onChangeText={newUnitValue => {
                    try {
                      setCountryValue(newUnitValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  defaultValue={
                    props.route?.params?.add_country ?? defaultProps.add_country
                  }
                  keyboardType={'default'}
                  maxLength={50}
                  placeholder={'Country' ?? 'Password'}
                  placeholderTextColor={theme.colors.foreground.brand}
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
                  textContentType={'telephoneNumber'}
                />
                {/* Spacer 3 */}
                <Spacer left={8} right={8} bottom={8} top={8} />
              </View>
              {/* View 4 */}
              <View>
                {/* ZIP */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onChangeText={newZIPValue => {
                    try {
                      setZIPValue(newZIPValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  defaultValue={
                    props.route?.params?.add_zip ?? defaultProps.add_zip
                  }
                  keyboardType={'numeric'}
                  maxLength={10}
                  placeholder={'ZIP postcode' ?? 'Password'}
                  placeholderTextColor={theme.colors.foreground.brand}
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
                  textContentType={'telephoneNumber'}
                />
                {/* Spacer 3 */}
                <Spacer left={8} right={8} bottom={8} top={8} />
              </View>
            </View>

            <Surface
              {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
              elevation={3}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.SurfaceStyles(theme)['Surface'].style,
                  { borderRadius: 100, minHeight: null }
                ),
                dimensions.width
              )}
            >
              {/* Sign Up Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      console.log('hello');
                      const signUpResponse = (
                        await AWSBACKENDApi.createAccountPOST(Constants, {
                          city:
                            cityValue ||
                            (props.route?.params?.add_city ??
                              defaultProps.add_city),
                          country:
                            countryValue ||
                            (props.route?.params?.add_country ??
                              defaultProps.add_country),
                          email:
                            emailValue ||
                            (props.route?.params?.email ?? defaultProps.email),
                          hcp_customer_id:
                            props.route?.params?.hcp_customer_id ??
                            defaultProps.hcp_customer_id,
                          mobile_number:
                            phoneNumberValue ||
                            (props.route?.params?.phone ?? defaultProps.phone),
                          name: firstNameValue + lastNameValue,
                          password:
                            props.route?.params?.password ??
                            defaultProps.password,
                          state: pickerValue,
                          street:
                            streetValue ||
                            (props.route?.params?.add_street ??
                              defaultProps.add_street),
                          zip:
                            zIPValue ||
                            (props.route?.params?.add_zip ??
                              defaultProps.add_zip),
                        })
                      )?.json;
                      console.log(signUpResponse);
                      if (signUpResponse?.status === 0) {
                        setGlobalVariableValue({
                          key: 'isInitialLaunch',
                          value: parseBoolean(false),
                        });
                        setOpenModal(true);
                        await waitUtil({ milliseconds: 15000 });
                        setOpenModal(false);
                        navigation.navigate('Home2Screen', {
                          name:
                            firstNameValue ||
                            ((props.route?.params?.name ?? defaultProps.name) &&
                              (lastNameValue ||
                                (props.route?.params?.last_name ??
                                  defaultProps.last_name))),
                        });
                      } else {
                        setErrorMessage(signUpResponse?.message);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                disabled={validateSignUp(
                  streetValue ||
                    (props.route?.params?.add_street ??
                      defaultProps.add_street),
                  cityValue ||
                    (props.route?.params?.add_city ?? defaultProps.add_city),
                  countryValue ||
                    (props.route?.params?.add_country ??
                      defaultProps.add_country),
                  zIPValue ||
                    (props.route?.params?.add_zip ?? defaultProps.add_zip),
                  pickerValue
                )}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['Custom Color 2'],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: validateSignUp(
                          streetValue ||
                            (props.route?.params?.add_street ??
                              defaultProps.add_street),
                          cityValue ||
                            (props.route?.params?.add_city ??
                              defaultProps.add_city),
                          countryValue ||
                            (props.route?.params?.add_country ??
                              defaultProps.add_country),
                          zIPValue ||
                            (props.route?.params?.add_zip ??
                              defaultProps.add_zip),
                          pickerValue
                        )
                          ? palettes.App['Custom #acacac']
                          : '#26AEDF',
                      },
                    ],
                    borderRadius: 100,
                    fontFamily: 'NunitoSans_700Bold',
                    fontSize: 16,
                    paddingBottom: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 16,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Create Account'}
              >
                {'Sign Up'}
              </Button>
            </Surface>
            <Spacer left={8} right={8} bottom={80} top={8} />
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'center' },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'NunitoSans_500Medium',
                    fontSize: 13,
                    marginRight: 2,
                    opacity: 0.5,
                  },
                  dimensions.width
                )}
              >
                {'Already have an account?'}
              </Text>
              <Spacer bottom={8} top={8} left={2} right={2} />
              {/* Sign In Link */}
              <Link
                accessible={true}
                onPress={() => {
                  try {
                    navigation.navigate('SignInScreen');
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
                title={'Sign in\n'}
              />
            </View>
            {/* Text 2 */}
            <>
              {!(formError !== null && '') ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    dimensions.width
                  )}
                >
                  {formError}
                  {'\n\n'}
                </Text>
              )}
            </>
          </View>
        </View>
      </SimpleStyleKeyboardAwareScrollView>
      <>
        {!openModal ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Brand['Light Inverse'],
                height: '100%',
                opacity: 1,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
        )}
      </>
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'fullScreen'}
        transparent={true}
        visible={openModal}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              borderRadius: 15,
              flex: 1,
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: theme.colors.background.brand,
                borderRadius: 20,
                height: '70%',
                justifyContent: 'center',
                width: '75%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                  width: '100%',
                },
                dimensions.width
              )}
            >
              <IconButton
                onPress={() => {
                  try {
                    setOpenModal(false);
                    navigation.navigate('Home2Screen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                size={32}
                icon={'AntDesign/closecircle'}
              />
            </View>
            <Image
              resizeMode={'cover'}
              {...GlobalStyles.ImageStyles(theme)['Image'].props}
              source={imageSource(Images['animation1733485336928'])}
              style={StyleSheet.applyWidth(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                dimensions.width
              )}
            />
            {/* Spacer 2 */}
            <Spacer bottom={8} left={8} right={8} top={8} />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { fontFamily: 'NunitoSans_700Bold', fontSize: 25 }
                ),
                dimensions.width
              )}
            >
              {'Congratulations!'}
            </Text>
            <Spacer bottom={8} left={8} right={8} top={8} />
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['Custom Color 15'],
                    fontFamily: 'NunitoSans_400Regular',
                    fontSize: 16,
                    paddingLeft: 10,
                    paddingRight: 10,
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
            >
              {
                'Your account is ready to use. You will be redirected to the Home page in a few seconds.'
              }
            </Text>
            {/* Spacer 3 */}
            <Spacer bottom={8} left={8} right={8} top={8} />
            <Image
              resizeMode={'cover'}
              {...GlobalStyles.ImageStyles(theme)['Image'].props}
              source={imageSource(Images['spinner3'])}
              style={StyleSheet.applyWidth(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                dimensions.width
              )}
            />
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(RegistrationPart2Screen);
