import React from 'react';
import { Link, ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const HomeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.Lime[100] },
        dimensions.width
      )}
    >
      <View>
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              fontFamily: 'ADLaMDisplay_400Regular',
              fontSize: 24,
              paddingLeft: 20,
              paddingTop: 50,
            }),
            dimensions.width
          )}
        >
          {'Welcome,'}
        </Text>
        {/* Text 2 */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              fontSize: 16,
              paddingLeft: 20,
              paddingTop: 10,
            }),
            dimensions.width
          )}
        >
          {Constants['name']}
        </Text>
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
          {...GlobalStyles.LinkStyles(theme)['Link'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'].style, {
              margin: 20,
              padding: 20,
            }),
            dimensions.width
          )}
          title={'Go back'}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
