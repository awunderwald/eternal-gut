import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme/tokens';

export interface ScreenHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function ScreenHeader({ eyebrow, title, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.wrap}>
      {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.brand.primarySoft,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    fontFamily: typography.family.sans,
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 22,
  },
});
