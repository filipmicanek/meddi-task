import { DependencyList, useLayoutEffect } from 'react';
import { type ParamListBase, useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export function useHeader(
  options: NativeStackNavigationOptions,
  deps: DependencyList = [],
) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  useLayoutEffect(() => {
    if (typeof navigation.setOptions === 'function')
      navigation.setOptions(options);
  }, [navigation, options, deps]);
}
