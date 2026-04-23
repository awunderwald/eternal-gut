import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, radius, spacing, typography } from '../theme/tokens';

const INCLUIDO = [
  { titulo: 'Neuro RM avanzado', meta: '12 lecciones · 4 h' },
  { titulo: 'RM de próstata PI-RADS 2.1', meta: '8 lecciones · 2.5 h' },
  { titulo: 'Resonancia de Cuerpo', meta: '10 lecciones · 3 h' },
];

export default function PremiumScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
      <ScreenHeader eyebrow="Premium · Solarem" title="Conviértete en experto RM" subtitle="Cursos 2025-2026 · protocolos paso a paso · quizzes" />

      <Card style={styles.price}>
        <Text style={styles.priceLabel}>Plan mensual</Text>
        <Text style={styles.priceValue}>$9.990 CLP</Text>
        <Text style={styles.priceMeta}>Prueba 7 días · cancelas cuando quieras</Text>
      </Card>

      <Text style={styles.sectionTitle}>CURSOS INCLUIDOS</Text>
      <View style={styles.list}>
        {INCLUIDO.map((c) => (
          <Card key={c.titulo}>
            <View style={styles.row}>
              <View style={styles.iconWrap}>
                <Text style={styles.iconText}>▶</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{c.titulo}</Text>
                <Text style={styles.meta}>{c.meta}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.cta}>
        <Button title="Empezar prueba de 7 días" onPress={() => router.back()} />
        <Button title="Ya tengo cuenta" variant="ghost" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg.base },
  price: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  priceLabel: {
    color: colors.text.primary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    letterSpacing: 1.2,
  },
  priceValue: {
    color: colors.text.primary,
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    marginTop: spacing.sm,
  },
  priceMeta: { color: colors.text.primary, fontSize: typography.size.sm, opacity: 0.9, marginTop: spacing.xs },
  sectionTitle: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: 1.2,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  list: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.bg.raised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { color: colors.brand.primarySoft, fontSize: 14 },
  title: { color: colors.text.primary, fontSize: typography.size.md, fontWeight: typography.weight.semibold },
  meta: { color: colors.text.muted, fontSize: typography.size.xs, marginTop: 2 },
  cta: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, gap: spacing.sm },
});
