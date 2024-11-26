import React, { useCallback, useContext, useRef } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '../hooks/useHeader';
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { AuthContext } from '../navigation/Auth';
import { updateUser, User } from '../utils/storage';
import useCityFetcher from '../hooks/useCityFetcher';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../navigation/Tabs';
import { atoms as a } from '../theme/atoms';
import { colors as c } from '../theme/colors';
import { borderRadius } from '../theme/tokens';

const DEFAULT_IMAGE = Image.resolveAssetSource(
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../../assets/custom/LightCloud.png'),
).uri;

const formatter = new Intl.DateTimeFormat('cs-CZ', {
  timeStyle: 'short',
});

const Weather = (
  props: NativeStackScreenProps<RootTabParamList, 'Weather'>,
) => {
  const defaultCityName = props.route?.params?.name;

  const { fetchCity, cityName, data, isLoading } =
    useCityFetcher(defaultCityName);
  const auth = useContext(AuthContext);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const showBottomSheet = useCallback(() => {
    bottomSheetRef?.current?.expand();
  }, []);

  const showInitialBottomSheet = useCallback(() => {
    if (defaultCityName) return;
    showBottomSheet();
  }, [defaultCityName]);

  const hideBottomSheet = useCallback(() => {
    bottomSheetRef?.current?.close();
  }, []);

  useFocusEffect(showInitialBottomSheet);

  useHeader({
    headerRight: () => (
      <TouchableOpacity onPress={showBottomSheet} style={[a.m_sm]}>
        <MaterialCommunityIcons name={'city-variant-outline'} size={24} />
      </TouchableOpacity>
    ),
  });

  const handleCityName = async (name: string) => {
    hideBottomSheet();
    if (!name.length) return;
    const data = await fetchCity(name);
    if (data) {
      const currentCities = auth.user?.cities ?? [];
      const newCities: User['cities'] = [
        ...currentCities,
        { name, address: { postCode: data.sys.country } },
      ];
      const updatedUser = updateUser({
        email: auth.user?.email ?? '',
        cities: newCities,
      });
      auth.updateUser(updatedUser);
    }
  };

  return (
    <View
      style={[
        a.flex_1,
        {
          backgroundColor: c.primary,
          borderTopLeftRadius: borderRadius.md,
          borderTopRightRadius: borderRadius.md,
        },
      ]}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={true}
        animateOnMount
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        snapPoints={['25%']}
      >
        <BottomSheetView style={[a.flex_1, a.align_center, a.gap_xs]}>
          <View
            style={[
              a.flex_row,
              a.gap_sm,
              a.p_lg,
              {
                borderBottomWidth: 1,
                borderBottomColor: c.secondary,
              },
            ]}
          >
            <MaterialIcons name={'search'} size={20} color="black" />
            <BottomSheetTextInput
              placeholder={'Zadejte název města'}
              onEndEditing={(e) => {
                handleCityName(e.nativeEvent.text);
              }}
              style={[a.flex_1, a.text_sm]}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>

      {isLoading ? (
        <ActivityIndicator style={[a.p_lg]} />
      ) : (
        <View style={[a.flex_1, a.align_center, a.gap_xs]}>
          <Image
            style={{ height: 90, width: 90 }}
            source={{ uri: DEFAULT_IMAGE }}
          />
          {!!cityName.length && (
            <View style={[a.flex_row, a.align_center, a.gap_xs]}>
              <MaterialIcons name={'location-pin'} color={c.icon} size={24} />
              <Text style={{ color: c.icon }}>{cityName}</Text>
            </View>
          )}
          {data && !!cityName.length && (
            <View style={[a.flex_1, a.align_center, a.gap_xs]}>
              <View style={[a.gap_sm, a.m_sm]}>
                <View
                  style={{
                    width: 260,
                    height: 1,
                    backgroundColor: c.background,
                  }}
                />
                <View style={[a.flex_row, a.justify_between]}>
                  <Feather name="thermometer" size={24} color="white" />
                  <Text style={{ color: c.icon }}>{data.main.temp} °C</Text>
                </View>

                <View style={[a.flex_row, a.justify_between]}>
                  <Feather name="sunrise" size={24} color="white" />
                  <Text style={{ color: c.icon }}>
                    {formatter.format(new Date(data.sys.sunrise * 1000))}
                  </Text>
                </View>
                <View style={[a.flex_row, a.justify_between]}>
                  <Feather name="sunset" size={24} color="white" />
                  <Text style={{ color: c.icon }}>
                    {formatter.format(new Date(data.sys.sunset * 1000))}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Weather;
