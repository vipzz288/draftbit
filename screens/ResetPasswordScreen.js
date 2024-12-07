import React from 'react';
import {
  Button,
  Icon,
  ScreenContainer,
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

const ResetPasswordScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [addressValue, setAddressValue] = React.useState('');
  const [cityValue, setCityValue] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState('');
  const [countryValue, setCountryValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [firstNameValue, setFirstNameValue] = React.useState('');
  const [lastNameValue, setLastNameValue] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumberValue, setPhoneNumberValue] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [streetValue, setStreetValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [zIPValue, setZIPValue] = React.useState('');
  const isValidPassword = password => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return !passwordRegex.test(password);
  };

  const validatePassword = (password, confirmPassword) => {
    if (
      !password ||
      password !== confirmPassword ||
      isValidPassword(password)
    ) {
      return true;
    }
    return false;
  };

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
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
            <Icon size={24} name={'AntDesign/arrowleft'} />
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
            paddingTop: 20,
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
              fontFamily: 'Poppins_700Bold',
              fontSize: 35,
              marginBottom: 10,
            },
            dimensions.width
          )}
        >
          {'Reset your\nPassword'}
        </Text>
        {/* sub heading */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: theme.colors.text.medium,
              fontFamily: 'Poppins_400Regular',
              fontSize: 15,
              opacity: 0.7,
              paddingBottom: 10,
              textAlign: 'left',
            },
            dimensions.width
          )}
        >
          {'Please enter your new password'}
        </Text>
        {/* Password */}
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={true}
          changeTextDelay={500}
          onChangeText={newPasswordValue => {
            try {
              setTextInputValue(newPasswordValue);
            } catch (err) {
              console.error(err);
            }
          }}
          webShowOutline={true}
          editable={true}
          placeholder={'Password'}
          placeholderTextColor={theme.colors.text.light}
          secureTextEntry={true}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 5'],
              borderColor: theme.colors.border.brand,
              borderRadius: 15,
              fontFamily: 'Poppins_400Regular',
              fontSize: 15,
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
        {/* Confirm Password */}
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={true}
          changeTextDelay={500}
          onChangeText={newConfirmPasswordValue => {
            try {
              setConfirmPasswordValue(newConfirmPasswordValue);
            } catch (err) {
              console.error(err);
            }
          }}
          webShowOutline={true}
          editable={true}
          placeholder={'Confirm Password'}
          placeholderTextColor={theme.colors.text.light}
          secureTextEntry={true}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 5'],
              borderRadius: 15,
              fontFamily: 'Poppins_400Regular',
              fontSize: 15,
              height: 48,
              marginTop: 20,
              paddingBottom: 8,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 8,
            },
            dimensions.width
          )}
          value={confirmPasswordValue}
        />
        <>
          {!(textInputValue && isValidPassword(textInputValue)) ? null : (
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
                'Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.'
              }
            </Text>
          )}
        </>
        <Surface
          {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
          elevation={3}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.SurfaceStyles(theme)['Surface'].style,
              { borderRadius: 100, marginTop: 50, minHeight: null }
            ),
            dimensions.width
          )}
        >
          {/* Reset Password */}
          <Button
            accessible={true}
            iconPosition={'left'}
            disabled={validatePassword(textInputValue, confirmPasswordValue)}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom Color 2'],
                borderRadius: 24,
                color: theme.colors.background.brand,
                fontFamily: 'Poppins_500Medium',
                fontSize: 17,
                textAlign: 'center',
              },
              dimensions.width
            )}
            title={'Reset Password'}
          />
        </Surface>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(ResetPasswordScreen);
