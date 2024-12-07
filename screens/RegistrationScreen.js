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
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  add_city: null,
  add_country: null,
  add_state: null,
  add_street: null,
  add_zip: null,
  email: null,
  hcp_customer_id: null,
  last_name: null,
  name: null,
  phone: null,
};

const RegistrationScreen = props => {
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

  const validateSignUp = (
    password,
    confirmPassword,
    phone,
    email,
    first_name,
    last_name
  ) => {
    if (
      !email ||
      !first_name ||
      !last_name ||
      !phone ||
      !password ||
      phone.length !== 10 ||
      password !== confirmPassword ||
      isValidEmail(email) ||
      isValidPassword(password) ||
      isValidName(first_name) ||
      isValidName(last_name)
    ) {
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
      return;
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
              marginTop: 40,
              width: 62,
            }),
            dimensions.width
          )}
        />
        <Spacer left={8} right={8} bottom={24} top={16} />
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
          {'Create your Account'}
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
            {/* Error Message */}
            <>
              {!errorMessage ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.background.danger,
                      fontSize: 12,
                      marginBottom: 16,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {errorMessage}
                </Text>
              )}
            </>
            {/* First Name */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newFirstNameValue => {
                try {
                  setFirstNameValue(newFirstNameValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              defaultValue={props.route?.params?.name ?? defaultProps.name}
              keyboardType={'email-address'}
              maxLength={50}
              placeholder={'First Name' ?? 'Email'}
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
              textContentType={'none'}
            />
            {/* Text 6 */}
            <>
              {!(firstNameValue && isValidName(firstNameValue)) ? null : (
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
                  {
                    'Name can only contain alphabets and spaces. Special characters and numbers are not allowed'
                  }
                </Text>
              )}
            </>
            <Spacer left={8} right={8} bottom={8} top={8} />
            {/* Last Name */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newLastNameValue => {
                try {
                  setLastNameValue(newLastNameValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              defaultValue={
                props.route?.params?.last_name ?? defaultProps.last_name
              }
              keyboardType={'email-address'}
              maxLength={50}
              placeholder={'Last Name' ?? 'Email'}
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
              textContentType={'none'}
            />
            {/* Text 7 */}
            <>
              {!(lastNameValue && isValidName(lastNameValue)) ? null : (
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
                  {
                    'Name can only contain alphabets and spaces. Special characters and numbers are not allowed'
                  }
                </Text>
              )}
            </>
            {/* Spacer 4 */}
            <Spacer left={8} right={8} bottom={8} top={8} />
            {/* Email Input */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newEmailInputValue => {
                try {
                  setEmailValue(newEmailInputValue);
                  console.log(emailValue, newEmailInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              defaultValue={props.route?.params?.email ?? defaultProps.email}
              keyboardType={'email-address'}
              placeholder={'Email'}
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
              textContentType={'emailAddress'}
            />
            {/* Text 3 */}
            <>
              {!(isValidEmail(emailValue) && emailValue) ? null : (
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
                  {'Invalid email address'}
                </Text>
              )}
            </>
            <Spacer bottom={8} left={8} right={8} top={8} />
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
            <Spacer left={8} right={8} bottom={8} top={8} />
            {/* Phone Number */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newPhoneNumberValue => {
                try {
                  setPhoneNumberValue(newPhoneNumberValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              defaultValue={props.route?.params?.phone ?? defaultProps.phone}
              keyboardType={'numeric'}
              maxLength={10}
              placeholder={'Phone Number' ?? 'Password'}
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
              textContentType={'password'}
            />
            {/* Spacer 3 2 */}
            <Spacer left={8} right={8} bottom={8} top={8} />
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
                  try {
                    navigation.navigate('RegistrationPart2Screen', {
                      phone:
                        phoneNumberValue ||
                        (props.route?.params?.phone ?? defaultProps.phone),
                      name:
                        firstNameValue ||
                        (props.route?.params?.name ?? defaultProps.name),
                      last_name:
                        lastNameValue ||
                        (props.route?.params?.last_name ??
                          defaultProps.last_name),
                      email:
                        emailValue ||
                        (props.route?.params?.email ?? defaultProps.email),
                      add_street:
                        props.route?.params?.add_street ??
                        defaultProps.add_street,
                      add_city:
                        props.route?.params?.add_city ?? defaultProps.add_city,
                      add_zip:
                        props.route?.params?.add_zip ?? defaultProps.add_zip,
                      add_state:
                        props.route?.params?.add_state ??
                        defaultProps.add_state,
                      hcp_customer_id:
                        props.route?.params?.hcp_customer_id ??
                        defaultProps.hcp_customer_id,
                      add_country:
                        props.route?.params?.add_country ??
                        defaultProps.add_country,
                      password: password,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                disabled={validateSignUp(
                  password,
                  confirmPassword,
                  phoneNumberValue ||
                    (props.route?.params?.phone ?? defaultProps.phone),
                  emailValue ||
                    (props.route?.params?.email ?? defaultProps.email),
                  firstNameValue ||
                    (props.route?.params?.name ?? defaultProps.name),
                  lastNameValue ||
                    (props.route?.params?.last_name ?? defaultProps.last_name)
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
                          password,
                          confirmPassword,
                          phoneNumberValue ||
                            (props.route?.params?.phone ?? defaultProps.phone),
                          emailValue ||
                            (props.route?.params?.email ?? defaultProps.email),
                          firstNameValue ||
                            (props.route?.params?.name ?? defaultProps.name),
                          lastNameValue ||
                            (props.route?.params?.last_name ??
                              defaultProps.last_name)
                        )
                          ? palettes.App['Custom #acacac']
                          : '#26AEDF',
                      },
                    ],
                    borderRadius: 100,
                    fontFamily: 'NunitoSans_700Bold',
                    fontSize: 16,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Next'}
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
                backgroundColor: palettes.Blue[100],
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
                    navigation.navigate('SignInScreen');
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
                  { fontFamily: 'ADLaMDisplay_400Regular', fontSize: 24 }
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
                  { paddingLeft: 10, paddingRight: 10, textAlign: 'center' }
                ),
                dimensions.width
              )}
            >
              {
                'Thank you for registering! Please check your email inbox for a verification link. Click on the link to verify your email address and activate your account.\n\nIf you don’t see the email, please check your spam or junk folder. If you still can’t find it, you can request a new verification link.\n'
              }
            </Text>
            {/* Spacer 3 */}
            <Spacer bottom={8} left={8} right={8} top={8} />
            <Image
              resizeMode={'cover'}
              {...GlobalStyles.ImageStyles(theme)['Image'].props}
              source={imageSource(Images['loadinggifloading'])}
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

export default withTheme(RegistrationScreen);
