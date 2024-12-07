import React from 'react';
import {
  Button,
  Checkbox,
  Circle,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Spacer,
  Surface,
  Swiper,
  SwiperItem,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as DraftbitExampleApi from '../apis/DraftbitExampleApi.js';
import * as ExampleDataApi from '../apis/ExampleDataApi.js';
import * as ProductsApi from '../apis/ProductsApi.js';
import * as UnsplashApi from '../apis/UnsplashApi.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { name: null };

const Home2Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [showappointment, setShowappointment] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      hasTopSafeArea={true}
      scrollable={false}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingBottom: 15,
            paddingLeft: 20,
            paddingRight: 20,
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flexDirection: 'row' },
            dimensions.width
          )}
        >
          <Circle size={50}>
            <Image
              resizeMode={'cover'}
              source={imageSource(Images['boy'])}
              style={StyleSheet.applyWidth(
                { borderRadius: 100, height: 50, width: 50 },
                dimensions.width
              )}
            />
          </Circle>

          <View
            style={StyleSheet.applyWidth({ marginLeft: 10 }, dimensions.width)}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 12'],
                  fontFamily: 'Urbanist_400Regular',
                  fontSize: 16,
                  opacity: 1,
                },
                dimensions.width
              )}
            >
              {'Good Morning'}
            </Text>

            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 11'],
                  fontFamily: 'Urbanist_700Bold',
                  fontSize: 20,
                  marginTop: 2,
                  opacity: 1,
                },
                dimensions.width
              )}
            >
              {'Andrew Ainsley'}
            </Text>
          </View>
        </View>

        <Touchable>
          <Checkbox
            onPress={newCheckboxValue => {
              const checkboxValue = newCheckboxValue;
              try {
                undefined;
              } catch (err) {
                console.error(err);
              }
            }}
            checkedIcon={'AntDesign/heart'}
            color={theme.colors.foreground.brand}
            status={checkboxValue}
            style={StyleSheet.applyWidth({ opacity: 1 }, dimensions.width)}
            uncheckedColor={theme.colors.foreground.brand}
            uncheckedIcon={'AntDesign/hearto'}
          />
        </Touchable>
      </View>

      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth({ paddingBottom: 20 }, dimensions.width)}
      >
        {/* Search Bar */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: theme.colors.border.brand,
              borderLeftWidth: 1,
              borderRadius: 12,
              borderRightWidth: 1,
              borderTopWidth: 1,
              flexDirection: 'row',
              height: 48,
              marginBottom: 20,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 10,
              paddingLeft: 20,
              paddingRight: 10,
            },
            dimensions.width
          )}
        >
          <Icon
            size={24}
            name={'EvilIcons/search'}
            style={StyleSheet.applyWidth({ opacity: 0.5 }, dimensions.width)}
          />
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newTextInputValue => {
              try {
                setTextInputValue(newTextInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            placeholder={'Search'}
            placeholderTextColor={theme.colors.text.light}
            style={StyleSheet.applyWidth(
              {
                borderRadius: 8,
                fontFamily: 'Inter_400Regular',
                paddingBottom: 8,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 8,
                width: '80%',
              },
              dimensions.width
            )}
            value={textInputValue}
            webShowOutline={false}
          />
          <IconButton
            size={32}
            color={theme.colors.foreground.brand}
            icon={'Entypo/menu'}
            style={StyleSheet.applyWidth({ opacity: 0.75 }, dimensions.width)}
          />
        </View>

        <UnsplashApi.FetchGetImagesGET page={'nature'} per_page={5} query={2}>
          {({ loading, error, data, refetchGetImages }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <Swiper
                data={fetchData?.results}
                dotActiveColor={theme.colors.branding.primary}
                dotsTouchable={true}
                keyExtractor={(swiperData, index) =>
                  swiperData?.id ??
                  swiperData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(swiperData)
                }
                listKey={'t0IkLraS'}
                loop={false}
                minDistanceForAction={0.2}
                minDistanceToCapture={5}
                renderItem={({ item, index }) => {
                  const swiperData = item;
                  return (
                    <SwiperItem
                      style={StyleSheet.applyWidth(
                        { gap: 1 },
                        dimensions.width
                      )}
                    >
                      <Touchable
                        style={StyleSheet.applyWidth(
                          { height: '100%', width: '100%' },
                          dimensions.width
                        )}
                      >
                        <Image
                          {...GlobalStyles.ImageStyles(theme)['Image'].props}
                          resizeMode={'cover'}
                          source={imageSource(swiperData?.urls?.regular)}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image'].style,
                              {
                                borderRadius: 20,
                                height: '100%',
                                width: '100%',
                              }
                            ),
                            dimensions.width
                          )}
                        />
                      </Touchable>
                    </SwiperItem>
                  );
                }}
                timeout={0}
                vertical={false}
                {...GlobalStyles.SwiperStyles(theme)['Swiper'].props}
                dotColor={palettes.Brand['Strong Inverse']}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.SwiperStyles(theme)['Swiper'].style,
                    { height: 150, paddingLeft: 20, paddingRight: 20 }
                  ),
                  dimensions.width
                )}
              />
            );
          }}
        </UnsplashApi.FetchGetImagesGET>
        {/* Upcoming Appointments */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 30, paddingLeft: 20, paddingRight: 20 },
            dimensions.width
          )}
        >
          {/* Header */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 12,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  fontFamily: 'Urbanist_700Bold',
                  fontSize: 18,
                },
                dimensions.width
              )}
            >
              {'Upcoming Appointments'}
            </Text>

            <Touchable>
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color 13'],
                    fontFamily: 'Urbanist_600SemiBold',
                    fontSize: 15,
                  },
                  dimensions.width
                )}
              >
                {'View All'}
              </Text>
            </Touchable>
          </View>

          <View
            style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          >
            <ProductsApi.FetchGetProductsGET _limit={1}>
              {({ loading, error, data, refetchGetProducts }) => {
                const fetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <SimpleStyleFlatList
                    data={fetchData}
                    inverted={false}
                    keyExtractor={(listData, index) =>
                      listData?.id ??
                      listData?.uuid ??
                      index?.toString() ??
                      JSON.stringify(listData)
                    }
                    keyboardShouldPersistTaps={'never'}
                    listKey={'kDC3ATYO'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return (
                        <>
                          <Surface
                            {...GlobalStyles.SurfaceStyles(theme)['Surface']
                              .props}
                            elevation={3}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.SurfaceStyles(theme)['Surface']
                                  .style,
                                {
                                  backgroundColor:
                                    theme.colors.background.brand,
                                  borderRadius: 12,
                                  margin: 8,
                                  minHeight: 50,
                                  padding: 20,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-start',
                                  backgroundColor: palettes.App['Custom Color'],
                                  borderRadius: 12,
                                  flexDirection: 'row',
                                  height: 104,
                                  justifyContent: 'flex-start',
                                  width: 300,
                                },
                                dimensions.width
                              )}
                            >
                              <Image
                                resizeMode={'cover'}
                                source={imageSource(`${listData?.image_url}`)}
                                style={StyleSheet.applyWidth(
                                  { borderRadius: 15, height: 80, width: 80 },
                                  dimensions.width
                                )}
                              />
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    alignSelf: 'flex-start',
                                    flex: 1,
                                    gap: 1,
                                    justifyContent: 'space-evenly',
                                    marginLeft: 15,
                                    rowGap: 10,
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
                                      fontFamily: 'Inter_300Light',
                                      opacity: 0.7,
                                      textAlign: 'left',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Emelina John'}
                                </Text>
                                {/* Speciality */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignSelf: 'flex-start',
                                      color: theme.colors.text.strong,
                                      fontFamily: 'Inter_500Medium',
                                      fontSize: 16,
                                      textAlign: 'left',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Painter'}
                                </Text>
                                <Button
                                  accessible={true}
                                  iconPosition={'left'}
                                  {...GlobalStyles.ButtonStyles(theme)['Button']
                                    .props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ButtonStyles(theme)['Button']
                                        .style,
                                      { textAlign: 'left' }
                                    ),
                                    dimensions.width
                                  )}
                                  title={'Upcoming'}
                                />
                              </View>
                              {/* View 2 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { alignItems: 'baseline', marginLeft: 15 },
                                  dimensions.width
                                )}
                              >
                                {/* Price */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignSelf: 'baseline',
                                      color: theme.colors.text.strong,
                                      fontFamily: 'Inter_800ExtraBold',
                                      marginTop: 5,
                                      opacity: 1,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'$ 22'}
                                </Text>
                              </View>
                            </View>
                          </Surface>
                          <Spacer bottom={8} left={8} right={8} top={8} />
                        </>
                      );
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={StyleSheet.applyWidth(
                      { width: '100%' },
                      dimensions.width
                    )}
                  />
                );
              }}
            </ProductsApi.FetchGetProductsGET>
          </View>
        </View>
        {/* Category */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 30, paddingLeft: 20, paddingRight: 20 },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', justifyContent: 'space-between' },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_500Medium',
                  fontSize: 18,
                },
                dimensions.width
              )}
            >
              {'Services\n'}
            </Text>

            <Touchable>
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.branding.primary,
                    fontFamily: 'Inter_500Medium',
                    fontSize: 15,
                  },
                  dimensions.width
                )}
              >
                {'View all\n'}
              </Text>
            </Touchable>
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'space-between',
                paddingTop: 0,
              },
              dimensions.width
            )}
          >
            {/* Cleaning */}
            <Touchable
              style={StyleSheet.applyWidth({ width: '22%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                <Circle
                  {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.CircleStyles(theme)['Circle'].style,
                      { backgroundColor: palettes.Orange[100], padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['icons8vacuuming48'])}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 100, height: 50, width: 50 },
                      dimensions.width
                    )}
                  />
                </Circle>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 1,
                    },
                    dimensions.width
                  )}
                >
                  {'Cleaning'}
                </Text>
              </View>
            </Touchable>
            {/* Repairing */}
            <Touchable
              style={StyleSheet.applyWidth({ width: '25%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                <Circle
                  {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.CircleStyles(theme)['Circle'].style,
                      { backgroundColor: palettes.Gray[100], padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['icons8mechanicskintype148'])}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 100, height: 50, width: 50 },
                      dimensions.width
                    )}
                  />
                </Circle>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 1,
                    },
                    dimensions.width
                  )}
                >
                  {'Repairing'}
                </Text>
              </View>
            </Touchable>
            {/* Painting */}
            <Touchable
              style={StyleSheet.applyWidth({ width: '25%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                <Circle
                  {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.CircleStyles(theme)['Circle'].style,
                      { backgroundColor: palettes.Red[100], padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['icons8painting48'])}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 100, height: 50, width: 50 },
                      dimensions.width
                    )}
                  />
                </Circle>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 1,
                    },
                    dimensions.width
                  )}
                >
                  {'Painting'}
                </Text>
              </View>
            </Touchable>
            {/* Laundary */}
            <Touchable
              style={StyleSheet.applyWidth({ width: '25%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                <Circle
                  {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.CircleStyles(theme)['Circle'].style,
                      { backgroundColor: palettes.Amber[100], padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['icons8laundry48'])}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 100, height: 50, width: 50 },
                      dimensions.width
                    )}
                  />
                </Circle>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 1,
                    },
                    dimensions.width
                  )}
                >
                  {'Laundary'}
                </Text>
              </View>
            </Touchable>
            {/* Electrician */}
            <Touchable
              style={StyleSheet.applyWidth({ width: '22%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                <Circle
                  {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.CircleStyles(theme)['Circle'].style,
                      { backgroundColor: palettes.Yellow[100], padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['icons8switchboard48'])}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 100, height: 50, width: 50 },
                      dimensions.width
                    )}
                  />
                </Circle>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 1,
                    },
                    dimensions.width
                  )}
                >
                  {'Electrician'}
                </Text>
              </View>
            </Touchable>
            {/* Plumbing */}
            <Touchable
              style={StyleSheet.applyWidth({ width: '25%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                <Circle
                  {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.CircleStyles(theme)['Circle'].style,
                      { backgroundColor: palettes.Lime[100], padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['icons8plumbing48'])}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 100, height: 50, width: 50 },
                      dimensions.width
                    )}
                  />
                </Circle>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 1,
                    },
                    dimensions.width
                  )}
                >
                  {'Plumbing'}
                </Text>
              </View>
            </Touchable>
            {/* Shifting */}
            <Touchable
              style={StyleSheet.applyWidth({ width: '25%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                <Circle
                  {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.CircleStyles(theme)['Circle'].style,
                      { backgroundColor: palettes.Green[100], padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['icons8luggage48'])}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 100, height: 50, width: 50 },
                      dimensions.width
                    )}
                  />
                </Circle>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 1,
                    },
                    dimensions.width
                  )}
                >
                  {'Shifting'}
                </Text>
              </View>
            </Touchable>
            {/* More */}
            <Touchable
              style={StyleSheet.applyWidth({ width: '25%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                <Circle
                  {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.CircleStyles(theme)['Circle'].style,
                      { backgroundColor: palettes.Slate[200], padding: 10 }
                    ),
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(Images['dotsthreecirclefill'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { height: 50, width: 50 }
                      ),
                      dimensions.width
                    )}
                  />
                </Circle>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 1,
                    },
                    dimensions.width
                  )}
                >
                  {'More'}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
        {/* Popular Services */}
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, marginTop: 30, paddingLeft: 20, paddingRight: 20 },
            dimensions.width
          )}
        >
          {/* Header */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 12,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  fontFamily: 'Urbanist_700Bold',
                  fontSize: 18,
                },
                dimensions.width
              )}
            >
              {'Most Popular Services'}
            </Text>

            <Touchable>
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.branding.primary,
                    fontFamily: 'Inter_500Medium',
                    fontSize: 15,
                  },
                  dimensions.width
                )}
              >
                {'View All'}
              </Text>
            </Touchable>
          </View>
          {/* Categories */}
          <View>
            <ExampleDataApi.FetchFoodCategoriesGET>
              {({ loading, error, data, refetchFoodCategories }) => {
                const fetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <SimpleStyleFlashList
                    data={fetchData}
                    estimatedItemSize={50}
                    inverted={false}
                    keyExtractor={(flashListData, index) =>
                      flashListData?.id ??
                      flashListData?.uuid ??
                      index?.toString() ??
                      JSON.stringify(flashListData)
                    }
                    listKey={'hY8nOz6Y'}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const flashListData = item;
                      return (
                        <Pressable>
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                borderColor: theme.colors.text.light,
                                borderRadius: [
                                  { minWidth: Breakpoints.Tablet, value: 24 },
                                  { minWidth: Breakpoints.Mobile, value: 20 },
                                  { minWidth: Breakpoints.Laptop, value: 28 },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 32,
                                  },
                                ],
                                borderWidth: 1,
                                flexDirection: 'row',
                                height: [
                                  { minWidth: Breakpoints.Tablet, value: 50 },
                                  { minWidth: Breakpoints.Laptop, value: 56 },
                                  { minWidth: Breakpoints.Mobile, value: 40 },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 70,
                                  },
                                ],
                                justifyContent: 'center',
                                marginBottom: {
                                  minWidth: Breakpoints.BigScreen,
                                  value: 30,
                                },
                                marginLeft: [
                                  { minWidth: Breakpoints.Mobile, value: 10 },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 25,
                                  },
                                  { minWidth: Breakpoints.Laptop, value: 20 },
                                ],
                                marginTop: 5,
                                paddingLeft: [
                                  { minWidth: Breakpoints.Tablet, value: 16 },
                                  { minWidth: Breakpoints.Mobile, value: 12 },
                                  { minWidth: Breakpoints.Laptop, value: 20 },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 25,
                                  },
                                ],
                                paddingRight: [
                                  { minWidth: Breakpoints.Tablet, value: 16 },
                                  { minWidth: Breakpoints.Mobile, value: 12 },
                                  { minWidth: Breakpoints.Laptop, value: 20 },
                                  {
                                    minWidth: Breakpoints.BigScreen,
                                    value: 25,
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Image
                              resizeMode={'cover'}
                              {...GlobalStyles.ImageStyles(theme)['Image']
                                .props}
                              source={imageSource(`${flashListData?.url}`)}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ImageStyles(theme)['Image']
                                    .style,
                                  {
                                    height: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 32,
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: 40,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: 44,
                                      },
                                      {
                                        minWidth: Breakpoints.BigScreen,
                                        value: 48,
                                      },
                                    ],
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 32,
                                      },
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: 40,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: 44,
                                      },
                                      {
                                        minWidth: Breakpoints.BigScreen,
                                        value: 48,
                                      },
                                    ],
                                  }
                                ),
                                dimensions.width
                              )}
                            />
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)['Text'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text'].style,
                                  {
                                    fontFamily: 'Inter_500Medium',
                                    fontSize: [
                                      {
                                        minWidth: Breakpoints.Tablet,
                                        value: 17,
                                      },
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: 19,
                                      },
                                      {
                                        minWidth: Breakpoints.Desktop,
                                        value: 21,
                                      },
                                      {
                                        minWidth: Breakpoints.BigScreen,
                                        value: 23,
                                      },
                                    ],
                                    marginLeft: 4,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {flashListData?.name}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    }}
                    showsVerticalScrollIndicator={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                );
              }}
            </ExampleDataApi.FetchFoodCategoriesGET>
          </View>
          {/* Services */}
          <DraftbitExampleApi.FetchDoctorsListGET count={6}>
            {({ loading, error, data, refetchDoctorsList }) => {
              const servicesData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <SimpleStyleFlashList
                  data={servicesData}
                  estimatedItemSize={50}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(flashListData, index) =>
                    flashListData?.id ??
                    flashListData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(flashListData)
                  }
                  listKey={'2M2pToTR'}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const flashListData = item;
                    return (
                      <Touchable
                        style={StyleSheet.applyWidth(
                          { marginBottom: 10, marginTop: 10 },
                          dimensions.width
                        )}
                      >
                        <Surface
                          {...GlobalStyles.SurfaceStyles(theme)['Surface']
                            .props}
                          elevation={3}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.SurfaceStyles(theme)['Surface']
                                .style,
                              { borderRadius: 12, minHeight: null }
                            ),
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: palettes.App['Custom Color'],
                                borderRadius: 12,
                                flexDirection: 'row',
                                height: 115,
                                padding: 12,
                                paddingLeft: 12,
                              },
                              dimensions.width
                            )}
                          >
                            <Image
                              resizeMode={'cover'}
                              source={imageSource(`${flashListData?.avatar}`)}
                              style={StyleSheet.applyWidth(
                                { borderRadius: 15, height: 80, width: 80 },
                                dimensions.width
                              )}
                            />
                            <View
                              style={StyleSheet.applyWidth(
                                { flex: 1, marginLeft: 15 },
                                dimensions.width
                              )}
                            >
                              {/* Name */}
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.text.strong,
                                    fontFamily: 'Inter_300Light',
                                    opacity: 0.7,
                                  },
                                  dimensions.width
                                )}
                              >
                                {flashListData?.full_name}
                              </Text>
                              {/* Name 2 */}
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.text.strong,
                                    fontFamily: 'Inter_500Medium',
                                    fontSize: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                {'Painter'}
                              </Text>
                              {/* Speciality */}
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.text.strong,
                                    fontFamily: 'Inter_800ExtraBold',
                                    marginTop: 5,
                                    opacity: 1,
                                  },
                                  dimensions.width
                                )}
                              >
                                {'$ 22'}
                              </Text>

                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginTop: 12,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  color={palettes.App['Custom Color_5']}
                                  name={'FontAwesome/star'}
                                  size={20}
                                />
                                {/* Rating */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors.text.strong,
                                      fontFamily: 'Inter_300Light',
                                      fontSize: 12,
                                      marginLeft: 5,
                                      opacity: 0.7,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'4.9'}
                                </Text>
                                {/* Reviews count */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors.text.strong,
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 12,
                                      opacity: 0.7,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'  •  150 Reviews'}
                                </Text>
                              </View>
                            </View>
                            {/* View 2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-start',
                                  alignSelf: 'baseline',
                                  justifyContent: 'flex-start',
                                  paddingRight: 10,
                                  paddingTop: 10,
                                },
                                dimensions.width
                              )}
                            >
                              <Checkbox
                                onPress={newCheckboxValue => {
                                  try {
                                    undefined;
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                checkedIcon={
                                  'MaterialCommunityIcons/bookmark-minus'
                                }
                                color={palettes.App['Custom Color 2']}
                                status={checkboxValue}
                                uncheckedColor={palettes.App['Custom Color 2']}
                                uncheckedIcon={'Feather/bookmark'}
                              />
                            </View>
                          </View>
                        </Surface>
                      </Touchable>
                    );
                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                />
              );
            }}
          </DraftbitExampleApi.FetchDoctorsListGET>
        </View>
      </SimpleStyleScrollView>

      <Touchable
        onPress={() => {
          try {
            Linking.openURL('tel:+123456789');
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <Image
          resizeMode={'cover'}
          {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
          source={imageSource(Images['animation1733131591435'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ImageStyles(theme)['Image 2'].style,
              { bottom: 7, position: 'absolute', right: 0 }
            ),
            dimensions.width
          )}
        />
      </Touchable>
      {/* Bottom Tab */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes.App['Custom #ffffff'],
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            flexDirection: 'row',
            height: 80,
            justifyContent: 'space-between',
            paddingBottom: 20,
            paddingLeft: 30,
            paddingRight: 30,
          },
          dimensions.width
        )}
      >
        {/* Home */}
        <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
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
            <Icon
              size={24}
              color={palettes.App['Custom Color 2']}
              name={'Entypo/home'}
            />
          </View>
        </Touchable>
        {/* History Transaction */}
        <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
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
            <Icon
              size={24}
              color={theme.colors.text.medium}
              name={'Ionicons/document-text-outline'}
            />
          </View>
        </Touchable>
        {/* Calendar */}
        <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
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
            <Icon
              size={24}
              color={theme.colors.text.medium}
              name={'AntDesign/calendar'}
            />
          </View>
        </Touchable>
        {/* Messages */}
        <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
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
            <Icon
              size={24}
              color={theme.colors.text.medium}
              name={'Ionicons/chatbox-outline'}
            />
          </View>
        </Touchable>
        {/* Profile */}
        <Touchable activeOpacity={0.8} disabledOpacity={0.8}>
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
            <Icon
              size={24}
              color={theme.colors.text.medium}
              name={'AntDesign/user'}
            />
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Home2Screen);
