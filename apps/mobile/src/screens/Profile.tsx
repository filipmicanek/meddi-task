import React, { useContext, useRef } from 'react';
import { AuthContext } from '../navigation/Auth';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { useHeader } from '../hooks/useHeader';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { updateUser, UpdateUserForm, userUpdateSchema } from '../utils/storage';
import Input from '../components/Input';
import { atoms as a } from '../theme/atoms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

const Profile = () => {
  const { signOut } = React.useContext(AuthContext);

  useHeader({
    headerRight: () => (
      <TouchableOpacity onPress={signOut} style={{ marginRight: 8 }}>
        <MaterialIcons name={'logout'} size={24} />
      </TouchableOpacity>
    ),
  });

  const phoneInputRef = useRef<TextInput>(null);

  const { user } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: { email: user?.email, phoneNumber: user?.phoneNumber }, // Set initial values
  });

  const onSubmit = (data: UpdateUserForm) => {
    updateUser(data);
    Alert.alert('Profil upraven!');
  };

  const nav = useNavigation();

  return (
    <View style={[a.flex_1, a.p_lg]}>
      <Text style={[a.text_3xl, a.text_center, a.font_heavy]}>
        Profil uživatele
      </Text>
      <Controller
        name="email"
        control={control}
        render={({ field: { value } }) => (
          <Input
            style={{ borderWidth: 0 }}
            placeholder="E-mail"
            iconName={'mail'}
            readOnly={true}
            value={value}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            style={{ borderWidth: 0 }}
            ref={phoneInputRef}
            placeholder="Telefon"
            iconName={'phone'}
            keyboardType={'number-pad'}
            textContentType="telephoneNumber"
            autoComplete="tel"
            autoCorrect={false}
            returnKeyType="done"
            onBlur={handleSubmit(onSubmit)}
            onChangeText={onChange}
            error={errors?.phoneNumber?.message}
            value={value}
          />
        )}
      />
      <FlatList
        data={user?.cities}
        style={[a.flex_1]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => nav.navigate('Weather', { name: item.name })}
            style={[
              a.flex_row,
              a.justify_between,
              a.p_lg,
              a.my_xs,
              a.p_lg,
              a.rounded_md,
              {
                backgroundColor: colors.secondary,
              },
            ]}
          >
            <View style={[a.flex_row, a.gap_sm]}>
              <MaterialCommunityIcons name={'google-maps'} size={16} />
              <Text>{item.name}</Text>
            </View>
            <Text>{item.address.postCode}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Profile;
