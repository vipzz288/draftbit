import React from 'react';
import { ScreenContainer, Surface, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const WelcomeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await waitUtil({ milliseconds: 5000 });
        const tokenResult = await getPushTokenUtil({
          permissionErrorMessage:
            'Sorry, we need notifications permissions to make this work.',
          deviceErrorMessage:
            'Must use physical device for Push Notifications.',
          showAlertOnPermissionError: true,
          showAlertOnDeviceError: true,
        });

        console.log(Constants['isInitialLaunch']);
        if (Constants['isInitialLaunch'] === true) {
          navigation.navigate('PhoneLoginScreen');
        } else {
          navigation.navigate('SignInScreen');
        }
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-around',
            opacity: 1,
            width: '100%',
            zIndex: 1,
          },
          dimensions.width
        )}
      >
        {/* Surface 2 */}
        <Surface
          {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
          elevation={3}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.SurfaceStyles(theme)['Surface'].style,
              {
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
              }
            ),
            dimensions.width
          )}
        >
          <Image
            {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
            resizeMode={'contain'}
            source={imageSource(Images['layer1(2)'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image 2'].style,
                { height: 115, width: 120 }
              ),
              dimensions.width
            )}
          />
        </Surface>
        {/* Image 2 */}
        <Image
          resizeMode={'cover'}
          {...GlobalStyles.ImageStyles(theme)['Image 3'].props}
          source={imageSource(Images['animation1732283642961'])}
          style={StyleSheet.applyWidth(
            GlobalStyles.ImageStyles(theme)['Image 3'].style,
            dimensions.width
          )}
        />
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
            opacity: 1,
            position: 'absolute',
            right: 0,
            top: 0,
            width: null,
          }),
          dimensions.width
        )}
      />
    </ScreenContainer>
  );
};

export default withTheme(WelcomeScreen);
