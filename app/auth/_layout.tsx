import { Stack } from 'expo-router';
import React from 'react';
import { colors } from '../../theme/tokens';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg.base },
        headerTintColor: colors.text.primary,
        contentStyle: { backgroundColor: colors.bg.base },
        headerShadowVisible: false,
        headerShown: false,
      }}
    />
  );
}
