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

const Home3Screen = props => {
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
            paddingBottom: 25,
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
        <UnsplashApi.FetchGetImagesGET page={'nature'} per_page={5} query={5}>
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
                listKey={'tyaHTTHs'}
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
              <View
                style={StyleSheet.applyWidth({ flex: 1.5 }, dimensions.width)}
              >
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
                    gap: 15,
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
                      fontFamily: 'Urbanist_700Bold',
                      fontSize: 17,
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
                      color: palettes.App['Custom Color 14'],
                      fontFamily: 'Urbanist_400Regular',
                      fontSize: 12,
                      opacity: 0.54,
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                >
                  {'Alfonzo Schuessler'}
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
                    gap: 35,
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
                      { height: 26, width: 80 }
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
                      fontFamily: 'Urbanist_700Bold',
                      fontSize: 11.5,
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
              {'Popular Home Improvements in Dublin'}
            </Text>
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
                  inverted={false}
                  keyExtractor={(flashListData, index) =>
                    flashListData?.id ??
                    flashListData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(flashListData)
                  }
                  listKey={'pPEw3RqY'}
                  numColumns={1}
                  renderItem={({ item, index }) => {
                    const flashListData = item;
                    return (
                      <Touchable
                        style={StyleSheet.applyWidth(
                          { marginBottom: 10, marginTop: 10 },
                          dimensions.width
                        )}
                      ></Touchable>
                    );
                  }}
                  estimatedItemSize={100}
                  horizontal={true}
                  initialNumToRender={1}
                  onEndReachedThreshold={2}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                />
              );
            }}
          </DraftbitExampleApi.FetchDoctorsListGET>
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', gap: 20 },
              dimensions.width
            )}
          >
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
                    minHeight: null,
                    width: '70%',
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
                    flexDirection: 'column',
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
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 2, height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['worker']) ?? imageSource('')}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 15, height: '100%', width: '100%' },
                      dimensions.width
                    )}
                  />
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'stretch',
                      alignSelf: 'flex-start',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth({ gap: 9 }, dimensions.width)}
                  >
                    {/* Speciality */}
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
                    {/* Name */}
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
                    {/* Description */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.text.strong,
                          fontFamily: 'AROneSans_500Medium',
                          fontSize: 10,
                          opacity: 0.54,
                          textAlign: 'left',
                        },
                        dimensions.width
                      )}
                    >
                      {
                        'Our skilled painters use high-quality \nmaterials to ensure a flawless finish.'
                      }
                    </Text>
                  </View>
                  {/* View 3 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      },
                      dimensions.width
                    )}
                  >
                    <Circle
                      {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.CircleStyles(theme)['Circle'].style,
                          {
                            backgroundColor: theme.colors.branding.secondary,
                            padding: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <IconButton
                        size={32}
                        color={theme.colors.background.brand}
                        icon={'Ionicons/chatbox-ellipses'}
                      />
                    </Circle>

                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text 3'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text 3'].style,
                          { fontFamily: 'Inter_600SemiBold', fontSize: 18 }
                        ),
                        dimensions.width
                      )}
                    >
                      {'$ 22'}
                    </Text>
                  </View>
                </View>
              </View>
            </Surface>
            {/* Surface 3 2 2 */}
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
                    minHeight: null,
                    width: '70%',
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
                    flexDirection: 'column',
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
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 2, height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['worker']) ?? imageSource('')}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 15, height: '100%', width: '100%' },
                      dimensions.width
                    )}
                  />
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'stretch',
                      alignSelf: 'flex-start',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth({ gap: 9 }, dimensions.width)}
                  >
                    {/* Speciality */}
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
                    {/* Name */}
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
                    {/* Description */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.text.strong,
                          fontFamily: 'AROneSans_500Medium',
                          fontSize: 10,
                          opacity: 0.54,
                          textAlign: 'left',
                        },
                        dimensions.width
                      )}
                    >
                      {
                        'Our skilled painters use high-quality \nmaterials to ensure a flawless finish.'
                      }
                    </Text>
                  </View>
                  {/* View 3 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      },
                      dimensions.width
                    )}
                  >
                    <Circle
                      {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.CircleStyles(theme)['Circle'].style,
                          {
                            backgroundColor: theme.colors.branding.secondary,
                            padding: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <IconButton
                        size={32}
                        color={theme.colors.background.brand}
                        icon={'Ionicons/chatbox-ellipses'}
                      />
                    </Circle>

                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text 3'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text 3'].style,
                          { fontFamily: 'Inter_600SemiBold', fontSize: 18 }
                        ),
                        dimensions.width
                      )}
                    >
                      {'$ 22'}
                    </Text>
                  </View>
                </View>
              </View>
            </Surface>
          </View>
        </View>
        {/* Popular Services 2 */}
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
              {'Popular Home Improvements in Dublin'}
            </Text>
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
                  inverted={false}
                  keyExtractor={(flashListData, index) =>
                    flashListData?.id ??
                    flashListData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(flashListData)
                  }
                  listKey={'XzIfoR6U'}
                  numColumns={1}
                  renderItem={({ item, index }) => {
                    const flashListData = item;
                    return (
                      <Touchable
                        style={StyleSheet.applyWidth(
                          { marginBottom: 10, marginTop: 10 },
                          dimensions.width
                        )}
                      ></Touchable>
                    );
                  }}
                  estimatedItemSize={100}
                  horizontal={true}
                  initialNumToRender={1}
                  onEndReachedThreshold={2}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                />
              );
            }}
          </DraftbitExampleApi.FetchDoctorsListGET>
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', gap: 20 },
              dimensions.width
            )}
          >
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
                    minHeight: null,
                    width: '70%',
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
                    flexDirection: 'column',
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
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 2, height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['worker']) ?? imageSource('')}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 15, height: '100%', width: '100%' },
                      dimensions.width
                    )}
                  />
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'stretch',
                      alignSelf: 'flex-start',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth({ gap: 9 }, dimensions.width)}
                  >
                    {/* Speciality */}
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
                    {/* Name */}
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
                    {/* Description */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.text.strong,
                          fontFamily: 'AROneSans_500Medium',
                          fontSize: 10,
                          opacity: 0.54,
                          textAlign: 'left',
                        },
                        dimensions.width
                      )}
                    >
                      {
                        'Our skilled painters use high-quality \nmaterials to ensure a flawless finish.'
                      }
                    </Text>
                  </View>
                  {/* View 3 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      },
                      dimensions.width
                    )}
                  >
                    <Circle
                      {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.CircleStyles(theme)['Circle'].style,
                          {
                            backgroundColor: theme.colors.branding.secondary,
                            padding: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <IconButton
                        size={32}
                        color={theme.colors.background.brand}
                        icon={'Ionicons/chatbox-ellipses'}
                      />
                    </Circle>

                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text 3'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text 3'].style,
                          { fontFamily: 'Inter_600SemiBold', fontSize: 18 }
                        ),
                        dimensions.width
                      )}
                    >
                      {'$ 22'}
                    </Text>
                  </View>
                </View>
              </View>
            </Surface>
            {/* Surface 3 2 2 */}
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
                    minHeight: null,
                    width: '70%',
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
                    flexDirection: 'column',
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
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 2, height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['worker']) ?? imageSource('')}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 15, height: '100%', width: '100%' },
                      dimensions.width
                    )}
                  />
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'stretch',
                      alignSelf: 'flex-start',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth({ gap: 9 }, dimensions.width)}
                  >
                    {/* Speciality */}
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
                    {/* Name */}
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
                    {/* Description */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.text.strong,
                          fontFamily: 'AROneSans_500Medium',
                          fontSize: 10,
                          opacity: 0.54,
                          textAlign: 'left',
                        },
                        dimensions.width
                      )}
                    >
                      {
                        'Our skilled painters use high-quality \nmaterials to ensure a flawless finish.'
                      }
                    </Text>
                  </View>
                  {/* View 3 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      },
                      dimensions.width
                    )}
                  >
                    <Circle
                      {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.CircleStyles(theme)['Circle'].style,
                          {
                            backgroundColor: theme.colors.branding.secondary,
                            padding: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <IconButton
                        size={32}
                        color={theme.colors.background.brand}
                        icon={'Ionicons/chatbox-ellipses'}
                      />
                    </Circle>

                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text 3'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text 3'].style,
                          { fontFamily: 'Inter_600SemiBold', fontSize: 18 }
                        ),
                        dimensions.width
                      )}
                    >
                      {'$ 22'}
                    </Text>
                  </View>
                </View>
              </View>
            </Surface>
          </View>
        </View>
        {/* Popular Services 3 */}
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
              {'Popular Home Improvements in Dublin'}
            </Text>
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
                  inverted={false}
                  keyExtractor={(flashListData, index) =>
                    flashListData?.id ??
                    flashListData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(flashListData)
                  }
                  listKey={'S1qvhdc5'}
                  numColumns={1}
                  renderItem={({ item, index }) => {
                    const flashListData = item;
                    return (
                      <Touchable
                        style={StyleSheet.applyWidth(
                          { marginBottom: 10, marginTop: 10 },
                          dimensions.width
                        )}
                      ></Touchable>
                    );
                  }}
                  estimatedItemSize={100}
                  horizontal={true}
                  initialNumToRender={1}
                  onEndReachedThreshold={2}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                />
              );
            }}
          </DraftbitExampleApi.FetchDoctorsListGET>
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', gap: 20 },
              dimensions.width
            )}
          >
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
                    minHeight: null,
                    width: '70%',
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
                    flexDirection: 'column',
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
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 2, height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['worker']) ?? imageSource('')}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 15, height: '100%', width: '100%' },
                      dimensions.width
                    )}
                  />
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'stretch',
                      alignSelf: 'flex-start',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth({ gap: 9 }, dimensions.width)}
                  >
                    {/* Speciality */}
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
                    {/* Name */}
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
                    {/* Description */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.text.strong,
                          fontFamily: 'AROneSans_500Medium',
                          fontSize: 10,
                          opacity: 0.54,
                          textAlign: 'left',
                        },
                        dimensions.width
                      )}
                    >
                      {
                        'Our skilled painters use high-quality \nmaterials to ensure a flawless finish.'
                      }
                    </Text>
                  </View>
                  {/* View 3 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      },
                      dimensions.width
                    )}
                  >
                    <Circle
                      {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.CircleStyles(theme)['Circle'].style,
                          {
                            backgroundColor: theme.colors.branding.secondary,
                            padding: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <IconButton
                        size={32}
                        color={theme.colors.background.brand}
                        icon={'Ionicons/chatbox-ellipses'}
                      />
                    </Circle>

                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text 3'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text 3'].style,
                          { fontFamily: 'Inter_600SemiBold', fontSize: 18 }
                        ),
                        dimensions.width
                      )}
                    >
                      {'$ 22'}
                    </Text>
                  </View>
                </View>
              </View>
            </Surface>
            {/* Surface 3 2 2 */}
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
                    minHeight: null,
                    width: '70%',
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
                    flexDirection: 'column',
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
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 2, height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['worker']) ?? imageSource('')}
                    style={StyleSheet.applyWidth(
                      { borderRadius: 15, height: '100%', width: '100%' },
                      dimensions.width
                    )}
                  />
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'stretch',
                      alignSelf: 'flex-start',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth({ gap: 9 }, dimensions.width)}
                  >
                    {/* Speciality */}
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
                    {/* Name */}
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
                    {/* Description */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'flex-start',
                          color: theme.colors.text.strong,
                          fontFamily: 'AROneSans_500Medium',
                          fontSize: 10,
                          opacity: 0.54,
                          textAlign: 'left',
                        },
                        dimensions.width
                      )}
                    >
                      {
                        'Our skilled painters use high-quality \nmaterials to ensure a flawless finish.'
                      }
                    </Text>
                  </View>
                  {/* View 3 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      },
                      dimensions.width
                    )}
                  >
                    <Circle
                      {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.CircleStyles(theme)['Circle'].style,
                          {
                            backgroundColor: theme.colors.branding.secondary,
                            padding: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      <IconButton
                        size={32}
                        color={theme.colors.background.brand}
                        icon={'Ionicons/chatbox-ellipses'}
                      />
                    </Circle>

                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text 3'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text 3'].style,
                          { fontFamily: 'Inter_600SemiBold', fontSize: 18 }
                        ),
                        dimensions.width
                      )}
                    >
                      {'$ 22'}
                    </Text>
                  </View>
                </View>
              </View>
            </Surface>
          </View>
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
            height: 70,
            justifyContent: 'space-between',
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

export default withTheme(Home3Screen);
