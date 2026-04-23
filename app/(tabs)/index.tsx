import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CALCULATORS } from '../../lib/calculators';
import { colors, spacing, typography } from '../../theme/tokens';

export default function HomeScreen() {
  const favoritas = CALCULATORS.slice(0, 4);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
      <ScreenHeader
        eyebrow="Turno de mañana · Santiago"
        title="Hola, Tecnólogo."
        subtitle="Calculadoras en 10 segundos. Guías al alcance."
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Calculadoras pápadas</Text>
        <Link href="/(tabs)/calculators" style={styles.sectionLink}>
          Ver todas
        </Link>
      </View>

      <View style={styles.grid}>
        {favoritas.map((c) => (
          <Link key={c.id} href={{ pathname: '/calculators/[id]', params: { id: c.id } }} asChild>
            <Card style={styles.gridItem} padded>
              <Text style={styles.gridTitle}>{c.titulo}</Text>
              <Text style={styles.gridSubtitle}>{c.descripcion}</Text>
            </Card>
          </Link>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Asistente</Text>
      </View>
      <Link href="/asistente" asChild>
        <Card style={styles.guidePlaceholder} onPress={() => {}}>
          <Text style={styles.guideTitle}>¿Qué examen pedir?</Text>
          <Text style={styles.guideSubtitle}>Lookup síntomas → estudios según protocolo.</Text>
        </Card>
      </Link>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Guías técnicas</Text>
      </View>
      <Card style={styles.guidePlaceholder} padded>
        <Text style={styles.guideTitle}>Tórax PA</Text>
        <Text style={styles.guideSubtitle}>180 cm · bucky vertical · mAs 4 · kVp 120</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg.base },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sectionLabel: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sectionLink: {
    color: colors.brand.primarySoft,
    fontSize: typography.size.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  gridItem: {
    flexBasis: '47%',
    flexGrow: 1,
    minHeight: 100,
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  gridTitle: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  gridSubtitle: {
    color: colors.text.muted,
    fontSize: typography.size.xs,
    lineHeight: 16,
  },
  guidePlaceholder: {
    marginHorizontal: spacing.lg,
  },
  guideTitle: {
    color: colors.text.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
  },
  guideSubtitle: {
    color: colors.text.muted,
    fontSize: typography.size.sm,
    marginTop: spacing.xs,
  },
});
