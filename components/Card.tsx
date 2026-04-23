import React from 'react';
import { Pressable, StyleSheet, View, ViewProps } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme/tokens';

export interface CardProps extends ViewProps {
  onPress?: () => void;
  padded?: boolean;
  emphasis?: 'surface' | 'raised';
}

export function Card({
  children,
  onPress,
  padded = true,
  emphasis = 'surface',
  style,
  ...rest
}: CardProps) {
  const bg = emphasis === 'raised' ? colors.bg.raised : colors.bg.surface;
  const content = (
    <View
      {...rest}
      style={[
        styles.base,
        { backgroundColor: bg, padding: padded ? spacing.lg : 0 },
        shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
  if (!onPress) return content;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
});
