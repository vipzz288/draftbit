import React from 'react';
import { Button, ScreenContainer, Surface, withTheme } from '@draftbit/ui';
import * as Linking from 'expo-linking';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const BlankScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { paddingLeft: 20, paddingRight: 20 },
        dimensions.width
      )}
    >
      <Surface
        {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
        elevation={3}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.SurfaceStyles(theme)['Surface'].style,
            {
              backgroundColor: theme.colors.background.brand,
              borderRadius: 20,
              flexDirection: 'row',
              height: 105,
              marginTop: 20,
              minHeight: null,
              width: '100%',
            }
          ),
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderRadius: 12,
              flexDirection: 'row',
              gap: 12,
              height: '100%',
              justifyContent: 'flex-start',
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 16,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View style={StyleSheet.applyWidth({ flex: 1.5 }, dimensions.width)}>
            <Image
              resizeMode={'cover'}
              source={imageSource(Images['painter']) ?? imageSource('')}
              style={StyleSheet.applyWidth(
                { borderRadius: 15, height: 80, width: 80 },
                dimensions.width
              )}
            />
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                flex: 2.2,
                justifyContent: 'flex-start',
              },
              dimensions.width
            )}
          >
            {/* Name */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: theme.colors.text.strong,
                  fontFamily: 'AROneSans_600SemiBold',
                  fontSize: 16,
                  opacity: 1,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'House Painter'}
            </Text>
            {/* Speciality */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: theme.colors.text.strong,
                  fontFamily: 'AROneSans_500Medium',
                  fontSize: 12,
                  opacity: 0.54,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Emelina John'}
            </Text>
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'flex-start',
                alignItems: 'flex-end',
                alignSelf: 'flex-start',
                flex: 2.35,
                justifyContent: 'flex-start',
              },
              dimensions.width
            )}
          >
            <Image
              {...GlobalStyles.ImageStyles(theme)['Image 3'].props}
              resizeMode={'contain'}
              source={imageSource(Images['frame65'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ImageStyles(theme)['Image 3'].style,
                  { height: 50 }
                ),
                dimensions.width
              )}
            />
            {/* Price */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'baseline',
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_700Bold',
                  fontSize: 10,
                  opacity: 1,
                },
                dimensions.width
              )}
            >
              {'24 Nov 2024, 12:00 AM'}
            </Text>
          </View>
        </View>
      </Surface>
      {/* Surface 2 */}
      <Surface
        {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
        elevation={3}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.SurfaceStyles(theme)['Surface'].style,
            {
              backgroundColor: theme.colors.background.brand,
              borderRadius: 20,
              flexDirection: 'row',
              height: 105,
              marginTop: 50,
              minHeight: null,
              width: '100%',
            }
          ),
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderRadius: 12,
              flexDirection: 'row',
              gap: 12,
              height: '100%',
              justifyContent: 'flex-start',
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 16,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View style={StyleSheet.applyWidth({ flex: 1.5 }, dimensions.width)}>
            <Image
              resizeMode={'cover'}
              source={imageSource(Images['painter']) ?? imageSource('')}
              style={StyleSheet.applyWidth(
                { borderRadius: 15, height: 80, width: 80 },
                dimensions.width
              )}
            />
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                flex: 2.2,
                justifyContent: 'flex-start',
              },
              dimensions.width
            )}
          >
            {/* Name */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: theme.colors.text.strong,
                  fontFamily: 'AROneSans_600SemiBold',
                  fontSize: 16,
                  opacity: 1,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'House Painter'}
            </Text>
            {/* Speciality */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: theme.colors.text.strong,
                  fontFamily: 'AROneSans_500Medium',
                  fontSize: 12,
                  opacity: 0.54,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Emelina John'}
            </Text>
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'flex-start',
                alignItems: 'flex-end',
                alignSelf: 'flex-start',
                flex: 2.35,
                justifyContent: 'flex-start',
              },
              dimensions.width
            )}
          >
            <Image
              {...GlobalStyles.ImageStyles(theme)['Image 3'].props}
              resizeMode={'contain'}
              source={imageSource(Images['frame65(2)'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ImageStyles(theme)['Image 3'].style,
                  { height: 50 }
                ),
                dimensions.width
              )}
            />
            {/* Price */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'baseline',
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_700Bold',
                  fontSize: 10,
                  opacity: 1,
                },
                dimensions.width
              )}
            >
              {'24 Nov 2024, 12:00 AM'}
            </Text>
          </View>
        </View>
      </Surface>
      {/* Surface 3 */}
      <Surface
        {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
        elevation={3}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.SurfaceStyles(theme)['Surface'].style,
            {
              backgroundColor: theme.colors.background.brand,
              borderRadius: 20,
              flexDirection: 'row',
              height: 105,
              marginTop: 50,
              minHeight: null,
              width: '100%',
            }
          ),
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderRadius: 12,
              flexDirection: 'row',
              gap: 12,
              height: '100%',
              justifyContent: 'flex-start',
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 16,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View style={StyleSheet.applyWidth({ flex: 1.5 }, dimensions.width)}>
            <Image
              resizeMode={'cover'}
              source={imageSource(Images['painter']) ?? imageSource('')}
              style={StyleSheet.applyWidth(
                { borderRadius: 15, height: 80, width: 80 },
                dimensions.width
              )}
            />
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                flex: 2.2,
                justifyContent: 'flex-start',
              },
              dimensions.width
            )}
          >
            {/* Name */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: theme.colors.text.strong,
                  fontFamily: 'AROneSans_600SemiBold',
                  fontSize: 16,
                  opacity: 1,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'House Painter'}
            </Text>
            {/* Speciality */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: theme.colors.text.strong,
                  fontFamily: 'AROneSans_500Medium',
                  fontSize: 12,
                  opacity: 0.54,
                  textAlign: 'left',
                },
                dimensions.width
              )}
            >
              {'Emelina John'}
            </Text>
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'flex-start',
                alignItems: 'flex-end',
                alignSelf: 'flex-start',
                flex: 2.35,
                justifyContent: 'flex-start',
              },
              dimensions.width
            )}
          >
            <Image
              {...GlobalStyles.ImageStyles(theme)['Image 3'].props}
              resizeMode={'contain'}
              source={imageSource(Images['frame65(1)'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ImageStyles(theme)['Image 3'].style,
                  { height: 50 }
                ),
                dimensions.width
              )}
            />
            {/* Price */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'baseline',
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_700Bold',
                  fontSize: 10,
                  opacity: 1,
                },
                dimensions.width
              )}
            >
              {'24 Nov 2024, 12:00 AM'}
            </Text>
          </View>
        </View>
      </Surface>
      {/* Surface 3 2 */}
      <Surface
        {...GlobalStyles.SurfaceStyles(theme)['Surface'].props}
        elevation={3}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.SurfaceStyles(theme)['Surface'].style,
            {
              backgroundColor: theme.colors.background.brand,
              borderRadius: 20,
              height: 300,
              marginTop: 50,
              minHeight: null,
              width: '70%',
            }
          ),
          dimensions.width
        )}
      >
        <Button
          accessible={true}
          iconPosition={'left'}
          onPress={() => {
            try {
              Linking.openURL('draftbit://LinkDeliveredSuccessScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          title={'Get Started'}
          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.ButtonStyles(theme)['Button'].style,
            dimensions.width
          )}
        />
      </Surface>
    </ScreenContainer>
  );
};

export default withTheme(BlankScreen);
