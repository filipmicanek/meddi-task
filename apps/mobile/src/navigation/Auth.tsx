import { createContext, useEffect, useMemo, useReducer } from 'react';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import SignIn from '../screens/SignIn';
import Tabs from './Tabs';
import Register from '../screens/Register';
import {
  getLastLoggedIn,
  getUser,
  invalidateLastLoggedIn,
  LoginUserForm,
  registerUser,
  RegisterUserForm,
  setLastLoggedIn,
  User,
  validateCredentials,
} from '../utils/storage';
import { colors } from '../theme/colors';
import { Alert } from 'react-native';

type AuthState = {
  isSignout: boolean;
  user: null | User;
};

type AuthAction =
  | { type: 'RESTORE_USER'; user: User }
  | { type: 'SIGN_IN'; user: User }
  | { type: 'UPDATE_USER'; user: User }
  | { type: 'SIGN_OUT' };

type AuthReducer = (state: AuthState, action: AuthAction) => AuthState;

type AuthContext = {
  user: User | null;
  signIn: (data: LoginUserForm) => void;
  updateUser: (data: User) => void;
  signOut: () => void;
  signUp: (data: RegisterUserForm) => void;
};

export type RootStackParamList = {
  Register: undefined;
  SignIn: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export const AuthContext = createContext<AuthContext>({} as AuthContext);

export default function Auth() {
  const authReducer: AuthReducer = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_USER':
        return {
          ...prevState,
          user: action.user,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          user: action.user,
        };
      case 'UPDATE_USER':
        return {
          ...prevState,
          user: action.user,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          user: null,
        };
    }
  };

  const [state, dispatch] = useReducer(authReducer, {
    isSignout: false,
    user: null,
  });

  useEffect(() => {
    const bootstrap = () => {
      const latestId = getLastLoggedIn();
      if (!latestId) return;
      const latestUser = getUser(latestId);
      if (!latestUser) return;
      dispatch({ type: 'RESTORE_USER', user: latestUser });
    };

    bootstrap();
  }, []);

  const authContext: AuthContext = useMemo(
    () => ({
      user: state.user,
      signIn: (data: LoginUserForm) => {
        if (!validateCredentials(data)) {
          Alert.alert('Chyba!', 'Neplatné přihlašovací údaje');
          return;
        }
        const user = getUser(data.email);
        if (!user) return;

        setLastLoggedIn(data.email);
        dispatch({ type: 'SIGN_IN', user });
      },
      signOut: () => {
        invalidateLastLoggedIn();
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: (data: RegisterUserForm) => {
        const user = registerUser(data);
        if (!user) {
          Alert.alert('Chyba!', 'Uživatel již existuje');
          return;
        }
        dispatch({ type: 'SIGN_IN', user });
      },
      updateUser: (data: User) => {
        dispatch({ type: 'UPDATE_USER', user: data });
      },
    }),
    [state.user],
  );

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
          {state.user == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  title: '',
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  title: '',
                }}
              />
            </>
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Tabs}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
