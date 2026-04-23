import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { DISCLAIMER_CALC } from '../lib/calculators';

export interface DisclaimerProps {
  text?: string;
  compact?: boolean;
}

export function Disclaimer({ text = DISCLAIMER_CALC, compact }: DisclaimerProps) {
  return (
    <View style={[styles.base, compact && styles.compact]} accessibilityRole="alert">
      <Text style={styles.label}>AVISO</Text>
      <Text style={styles.body}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: colors.state.warning,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: 'rgba(245, 165, 36, 0.08)',
    gap: spacing.xs,
  },
  compact: { padding: spacing.sm },
  label: {
    color: colors.state.warning,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    letterSpacing: 1,
  },
  body: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 18,
  },
});
