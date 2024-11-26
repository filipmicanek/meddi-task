import { useContext, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { atoms as a } from '../theme/atoms';
import React from 'react';
import { AuthContext } from '../navigation/Auth';
import Button from '../components/Button';
import Input from '../components/Input';
import { Controller, useForm } from 'react-hook-form';
import { LoginUserForm, userLoginSchema } from '../utils/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
const SignIn = () => {
  const { signIn } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserForm>({
    defaultValues: { password: '', email: '' },
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (data: LoginUserForm) => {
    signIn(data);
  };

  const passwordInputRef = useRef<TextInput>(null);

  const nav = useNavigation();

  return (
    <View style={[a.flex_1, a.p_lg]}>
      <Text style={[a.text_3xl, a.text_center, a.font_heavy]}>
        Příhlášení uživatele
      </Text>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="E-mail"
            onBlur={onBlur}
            iconName={'mail'}
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
            iconName={'key'}
            textContentType="newPassword"
            autoComplete="password-new"
            autoCorrect={false}
            returnKeyType="done"
            secureTextEntry
            onBlur={onBlur}
            onSubmitEditing={handleSubmit(onSubmit)}
            onChangeText={onChange}
            error={errors?.password?.message}
            value={value}
          />
        )}
      />

      <Button title="Přihlásit se" onPress={handleSubmit(onSubmit)} />

      <Text
        onPress={() => nav.navigate('Register')}
        style={[a.text_right, a.m_sm, a.text_md, a.underline]}
      >
        Registruj se zde
      </Text>
    </View>
  );
};

export default SignIn;
