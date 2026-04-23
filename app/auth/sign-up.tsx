import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { InputField } from '../../components/InputField';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useSignUpWithEmail } from '../../lib/hooks';
import { colors, spacing, typography } from '../../theme/tokens';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signUp = useSignUpWithEmail();

  async function onSubmit() {
    try {
      await signUp.mutateAsync({ email: email.trim(), password, fullName: fullName.trim() });
      router.replace('/onboarding');
    } catch {
      // rendered below
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Crear cuenta" subtitle="Solo para Tecnólogos Médicos titulados" />
        <Card style={styles.card}>
          <InputField label="Nombre completo" value={fullName} onChangeText={setFullName} />
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <InputField
            label="Contraseña (mín 8 caracteres)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {signUp.isError && (
            <Text style={styles.error}>{(signUp.error as Error).message}</Text>
          )}
          <Button title="Crear cuenta" onPress={onSubmit} loading={signUp.isPending} />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg.base },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl, gap: spacing.md },
  card: { gap: spacing.md },
  error: { color: colors.state.danger, fontSize: typography.size.sm },
});
