import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect } from 'react';
import { Linking, Text, View } from 'react-native';
import Button from '../components/Button';
import { atoms as a } from '../theme/atoms';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return null;
  }

  if (permission.status === 'denied') {
    return (
      <View style={[a.flex_1, a.p_lg, a.gap_sm]}>
        <Text style={[a.text_center]}>
          Pro použití kamery prosím povolte přístup v nastavení.
        </Text>
        <Button onPress={Linking.openSettings} title="Otevřít nastavení" />
      </View>
    );
  }

  return (
    <View style={[a.flex_1]}>
      <CameraView style={[a.flex_1, a.w_full]} facing={'front'}></CameraView>
    </View>
  );
}
