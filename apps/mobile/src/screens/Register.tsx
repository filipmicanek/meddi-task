import { useContext, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';

import React from 'react';
import { AuthContext } from '../navigation/Auth';
import Button from '../components/Button';
import Input from '../components/Input';
import { Controller, useForm } from 'react-hook-form';
import { RegisterUserForm, userRegisterSchema } from '../utils/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { atoms as a } from '../theme/atoms';

const Register = () => {
  const { signUp } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserForm>({
    defaultValues: {
      password: '',
      email: '',
      phoneNumber: '',
    },
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = (data: RegisterUserForm) => {
    signUp(data);
  };
  const passwordInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);

  return (
    <View style={[a.flex_1, a.p_lg]}>
      <Text style={[a.text_3xl, a.text_center, a.font_heavy]}>
        Registrace uživatele
      </Text>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="E-mail"
            iconName={'mail'}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType={'email-address'}
            autoComplete={'email'}
            textContentType={'emailAddress'}
            autoCorrect={false}
            returnKeyType="next"
            error={errors?.email?.message}
            onSubmitEditing={() => passwordInputRef?.current?.focus?.()}
            value={value}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            ref={passwordInputRef}
            placeholder="Heslo"
            textContentType="newPassword"
            autoComplete="password-new"
            autoCorrect={false}
            iconName={'key'}
            returnKeyType="next"
            secureTextEntry
            onBlur={onBlur}
            onSubmitEditing={() => phoneInputRef?.current?.focus?.()}
            onChangeText={onChange}
            error={errors?.password?.message}
            value={value}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            ref={phoneInputRef}
            placeholder="Telefon"
            iconName={'phone'}
            keyboardType={'number-pad'}
            textContentType="telephoneNumber"
            autoComplete="tel"
            autoCorrect={false}
            returnKeyType="done"
            onBlur={onBlur}
            onSubmitEditing={handleSubmit(onSubmit)}
            onChangeText={onChange}
            error={errors?.phoneNumber?.message}
            value={value}
          />
        )}
      />

      <Button title="Registrovat" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Register;
