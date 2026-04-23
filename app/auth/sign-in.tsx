import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { InputField } from '../../components/InputField';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useSignInWithEmail } from '../../lib/hooks';
import { colors, spacing, typography } from '../../theme/tokens';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignInWithEmail();

  async function onSubmit() {
    try {
      await signIn.mutateAsync({ email: email.trim(), password });
      router.replace('/(tabs)');
    } catch {
      // error rendered below
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader eyebrow="Tecnolog One" title="Iniciar sesión" subtitle="Con tu cuenta PI·WU" />
        <Card style={styles.card}>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="tu@correo.cl"
          />
          <InputField
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
          />
          {signIn.isError && (
            <Text style={styles.error}>{(signIn.error as Error).message}</Text>
          )}
          <Button title="Entrar" onPress={onSubmit} loading={signIn.isPending} />
          <Link href="/auth/sign-up" style={styles.link}>
            Crear cuenta nueva
          </Link>
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
  link: {
    textAlign: 'center',
    color: colors.brand.primarySoft,
    fontSize: typography.size.sm,
    marginTop: spacing.sm,
  },
});
