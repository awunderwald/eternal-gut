import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

export interface InputFieldProps extends TextInputProps {
  label: string;
  suffix?: string;
  error?: string;
}

export function InputField({ label, suffix, error, style, ...rest }: InputFieldProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, !!error && styles.inputError]}>
        <TextInput
          {...rest}
          placeholderTextColor={colors.text.muted}
          style={[styles.input, style]}
        />
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.xs },
  label: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg.muted,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    paddingVertical: spacing.md,
  },
  suffix: {
    color: colors.text.muted,
    fontSize: typography.size.sm,
    marginLeft: spacing.sm,
  },
  inputError: { borderColor: colors.state.danger },
  errorText: { color: colors.state.danger, fontSize: typography.size.xs },
});
